<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    // PUBLIC: portfolio page ke liye
    public function index()
    {
        return Portfolio::active()
            ->orderBy('sort_order')
            ->latest()
            ->get();
    }

    // ADMIN: sab (active + inactive)
    public function adminIndex()
    {
        return Portfolio::orderBy('sort_order')->latest()->get();
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $portfolio = Portfolio::create($data);
        return response()->json($portfolio, 201);
    }

    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->update($this->validated($request));
        return response()->json($portfolio);
    }

    public function destroy($id)
    {
        Portfolio::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:4096']);
        $path = $request->file('image')->store('portfolio', 'public');
        return response()->json(['url' => '/storage/' . $path]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'image'       => 'nullable|string',
            'video'       => 'nullable|string',
            'description' => 'nullable|string',
            'tags'        => 'nullable|array',
            'link'        => 'nullable|string|max:255',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer',
        ]);
    }
}