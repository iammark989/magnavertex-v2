<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'title' => ucwords($title),
            'slug' => str($title)->slug()->toString(),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'icon' => 'globe',
            'sort_order' => fake()->numberBetween(0, 100),
            'is_featured' => fake()->boolean(),
            'is_active' => true,
        ];
    }
}