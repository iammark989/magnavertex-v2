<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Application Development',
                'short_description' => 'Custom web applications built to streamline operations, improve customer experiences, and support business growth.',
                'icon' => 'globe',
                'sort_order' => 1,
            ],
            [
                'title' => 'Business Systems',
                'short_description' => 'Tailored digital systems that help businesses manage processes, information, and day-to-day operations more efficiently.',
                'icon' => 'building-2',
                'sort_order' => 2,
            ],
            [
                'title' => 'CMS & Content Platforms',
                'short_description' => 'Flexible content management solutions that make it easier to manage, organize, and publish business content online.',
                'icon' => 'file-text',
                'sort_order' => 3,
            ],
            [
                'title' => 'Cloud & Digital Solutions',
                'short_description' => 'Scalable digital solutions designed to help businesses modernize their infrastructure and expand their online presence.',
                'icon' => 'cloud',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => Str::slug($service['title'])],
                [
                    ...$service,
                    'is_featured' => true,
                    'is_active' => true,
                ]
            );
        }
    }
}