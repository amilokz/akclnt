<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    // ---------- PUBLIC ----------

    public function index(Request $request)
    {
        $query = Post::published()
            ->with('author:id,name')
            ->select(['id', 'title', 'slug', 'excerpt', 'cover_image', 'category', 'tags', 'published_at', 'views', 'author_id'])
            ->orderByDesc('published_at');

        if ($cat = $request->query('category')) {
            $query->where('category', $cat);
        }
        if ($q = $request->query('q')) {
            $query->where(fn ($s) => $s->where('title', 'like', "%{$q}%")
                                       ->orWhere('excerpt', 'like', "%{$q}%"));
        }

        return $query->paginate(9);
    }

    public function show($slug)
    {
        $post = Post::published()->with('author:id,name')->where('slug', $slug)->firstOrFail();
        $post->increment('views');

        $related = Post::published()
            ->where('id', '!=', $post->id)
            ->when($post->category, fn ($q) => $q->where('category', $post->category))
            ->select(['id', 'title', 'slug', 'excerpt', 'cover_image', 'category', 'published_at'])
            ->latest('published_at')->limit(3)->get();

        return response()->json([
            'post'         => $post,
            'related'      => $related,
            'reading_time' => $post->reading_time,
        ]);
    }

    public function categories()
    {
        return Post::published()
            ->selectRaw('category, COUNT(*) as total')
            ->whereNotNull('category')
            ->groupBy('category')
            ->orderByDesc('total')
            ->get();
    }

    // ---------- ADMIN ----------

    public function adminIndex()
    {
        return Post::with('author:id,name')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $this->validatePost($request);
        $data['author_id'] = $request->user()->id;

        $post = Post::create($data);

        return response()->json(['message' => 'Post created', 'post' => $post], 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($this->validatePost($request, $post->id));

        return response()->json(['message' => 'Post updated', 'post' => $post]);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        if ($post->cover_image && str_starts_with($post->cover_image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $post->cover_image));
        }
        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:4096']);
        $path = $request->file('image')->store('blog', 'public');

        return response()->json(['url' => '/storage/' . $path]);
    }

    private function validatePost(Request $request, $ignoreId = null): array
    {
        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255',
            'excerpt'          => 'nullable|string|max:500',
            'body'             => 'required|string',
            'cover_image'      => 'nullable|string|max:255',
            'category'         => 'nullable|string|max:60',
            'tags'             => 'nullable|array',
            'tags.*'           => 'string|max:40',
            'is_published'     => 'boolean',
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:300',
        ]);

        if (blank($data['slug'] ?? null)) {
            $data['slug'] = Post::uniqueSlug($data['title'], $ignoreId);
        }

        return $data;
    }
}