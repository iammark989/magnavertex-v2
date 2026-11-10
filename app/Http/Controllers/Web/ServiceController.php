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
}