<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\BusinessSolution;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BusinessSolutionController extends Controller
{
    public function show(string $slug): Response
    {
        $solution = BusinessSolution::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'capabilities:id,business_solution_id,title,description,sort_order',
                'images:id,business_solution_id,image,caption,sort_order',
            ])
            ->firstOrFail();

        // Convert stored image paths into public URLs.
        $solution->setAttribute(
            'featured_image',
            $solution->featured_image
                ? Storage::disk('public')->url($solution->featured_image)
                : null
        );

        $solution->images->each(function ($image) {
            $image->setAttribute(
                'image',
                Storage::disk('public')->url($image->image)
            );
        });

        return Inertia::render('web/BusinessSolution', [
            'solution' => $solution,
        ]);
    }
}