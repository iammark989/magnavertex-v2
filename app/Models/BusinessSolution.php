<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessSolution extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'short_description',
        'business_challenge',
        'solution_description',
        'ideal_for',
        'technologies',
        'featured_image',
        'demo_url',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function capabilities(): HasMany
    {
        return $this->hasMany(BusinessSolutionCapability::class)
            ->orderBy('sort_order');
    }

    public function images(): HasMany
    {
        return $this->hasMany(BusinessSolutionImage::class)
            ->orderBy('sort_order');
    }
}