<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
       protected $fillable = [
        'name',
        'category',
        'icon',
        'description',
        'features',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
    ];

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }
}