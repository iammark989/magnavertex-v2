<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
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

        return Inertia::render('web/Home', [
            'services' => $services,
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail([
                'id',
                'title',
                'slug',
                'short_description',
                'description',
                'icon',
                'sort_order',
                'is_featured',
            ]);

        return Inertia::render('web/Service', [
            'service' => $service,
        ]);
    }

}