<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // ---------- PUBLIC ----------

    public function index()
    {
        return Product::active()
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();
    }

    // ---------- ADMIN ----------

    public function adminIndex()
    {
        return Product::orderBy('sort_order')->orderByDesc('id')->get();
    }

    public function store(Request $request)
    {
        $product = Product::create($this->validated($request));
        return response()->json(['message' => 'Product created', 'product' => $product], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($this->validated($request));
        return response()->json(['message' => 'Product updated', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image && str_starts_with($product->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:4096']);
        $path = $request->file('image')->store('products', 'public');
        return response()->json(['url' => '/storage/' . $path]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'        => 'required|string|max:255',
            'slug'        => 'nullable|string|max:255',
            'tagline'     => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|string|max:255',
            'category'    => 'nullable|string|max:60',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:120',
            'price'       => 'nullable|numeric|min:0',
            'currency'    => 'nullable|string|size:3',
            'buy_url'     => 'nullable|url|max:255',
            'demo_url'    => 'nullable|url|max:255',
            'is_active'   => 'boolean',
            'is_featured' => 'boolean',
            'sort_order'  => 'nullable|integer|min:0',
        ]);
    }
}