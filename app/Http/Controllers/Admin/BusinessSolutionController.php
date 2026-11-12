<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessSolution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BusinessSolutionController extends Controller
{
    public function index(Request $request): Response
    {
        $solutions = BusinessSolution::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->trim()->toString();

                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->orderBy('sort_order')
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString();

            $solutions->through(function ($solution) {
                $solution->featured_image = $solution->featured_image
                    ? Storage::disk('public')->url($solution->featured_image)
                    : null;

                return $solution;
            });

        return Inertia::render('admin/business-solutions/Index', [
            'solutions' => $solutions,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/business-solutions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150', 'unique:business_solutions,title'],
            'slug' => ['required', 'string', 'max:150', 'alpha_dash', 'unique:business_solutions,slug'],
            'category' => ['required', 'string', 'max:150'],
            'short_description' => ['required', 'string', 'max:255'],
            'business_challenge' => ['required', 'string'],
            'solution_description' => ['required', 'string'],
            'ideal_for' => ['required', 'string'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['required', 'string', 'max:100'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'featured_image' => ['nullable', 'image', 'max:5120'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ]);

        unset($validated['featured_image']);

        $validated['featured_image'] = $request->hasFile('featured_image')
            ? $request->file('featured_image')->store('business-solutions', 'public')
            : null;

        BusinessSolution::create($validated);

        return redirect()
            ->route('admin.business-solutions.index')
            ->with('success', 'Business solution created successfully.');
    }

    public function edit(BusinessSolution $businessSolution): Response
    {
        $businessSolution->load([
            'capabilities',
            'images',
        ]);

        $businessSolution->featured_image = $businessSolution->featured_image
            ? Storage::disk('public')->url($businessSolution->featured_image)
            : null;

        return Inertia::render('admin/business-solutions/Edit', [
            'solution' => $businessSolution,
        ]);
    }

    public function update(
        Request $request,
        BusinessSolution $businessSolution
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:150',
                Rule::unique('business_solutions', 'title')->ignore($businessSolution->id),
            ],
            'slug' => [
                'required',
                'string',
                'max:150',
                'alpha_dash',
                Rule::unique('business_solutions', 'slug')->ignore($businessSolution->id),
            ],
            'category' => ['required', 'string', 'max:150'],
            'short_description' => ['required', 'string', 'max:255'],
            'business_challenge' => ['required', 'string'],
            'solution_description' => ['required', 'string'],
            'ideal_for' => ['required', 'string'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['required', 'string', 'max:100'],
            'demo_url' => ['nullable', 'url', 'max:255'],
            'featured_image' => ['nullable', 'image', 'max:5120'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ]);

        unset($validated['featured_image']);

        $oldImage = $businessSolution->featured_image;

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request
                ->file('featured_image')
                ->store('business-solutions', 'public');
        }

        $businessSolution->update($validated);

        if (
            $request->hasFile('featured_image') &&
            $oldImage
        ) {
            Storage::disk('public')->delete($oldImage);
        }

        return redirect()
            ->route('admin.business-solutions.index')
            ->with('success', 'Business solution updated successfully.');
    }

    public function destroy(BusinessSolution $businessSolution): RedirectResponse
    {
        if ($businessSolution->is_active) {
            return redirect()
                ->route('admin.business-solutions.index')
                ->with(
                    'error',
                    'Please deactivate this business solution before deleting it.'
                );
        }

        $imagePaths = $businessSolution->images()
            ->pluck('image')
            ->all();

        if ($businessSolution->featured_image) {
            $imagePaths[] = $businessSolution->featured_image;
        }

        $businessSolution->delete();

        Storage::disk('public')->delete($imagePaths);

        return redirect()
            ->route('admin.business-solutions.index')
            ->with('success', 'Business solution permanently deleted successfully.');
    }
}