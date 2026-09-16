<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'tagline', 'description', 'image', 'category',
        'features', 'price', 'currency', 'buy_url', 'demo_url',
        'is_active', 'is_featured', 'sort_order',
    ];

    protected $casts = [
        'features'    => 'array',
        'price'       => 'decimal:2',
        'is_active'   => 'boolean',
        'is_featured' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Product $p) {
            if (blank($p->slug)) {
                $base = Str::slug($p->name) ?: 'product';
                $slug = $base;
                $i = 2;
                while (static::where('slug', $slug)->where('id', '!=', $p->id)->exists()) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }
                $p->slug = $slug;
            }
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}