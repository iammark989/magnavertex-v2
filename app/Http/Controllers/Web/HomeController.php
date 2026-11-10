<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\BusinessSolution;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'id',
                'title',
                'slug',
                'short_description',
                'icon',
                'sort_order',
                'is_featured',
            ]);

        $businessSolutions = BusinessSolution::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get([
                'id',
                'title',
                'slug',
                'category',
                'short_description',
                'technologies',
                'featured_image',
                'is_featured',
            ])
            ->map(function (BusinessSolution $solution) {
                return [
                    ...$solution->toArray(),
                    'featured_image' => $solution->featured_image
                        ? Storage::url($solution->featured_image)
                        : null,
                ];
            });

        return Inertia::render('web/Home', [
            'services' => $services,
            'businessSolutions' => $businessSolutions,
        ]);
    }
}
