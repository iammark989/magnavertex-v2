<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $services = Service::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->trim()->toString();

                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%");
                });
            })
            ->orderBy('sort_order')
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/services/Index', [
            'services' => $services,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150', 'unique:services,title'],
            'slug' => ['required', 'string', 'max:150', 'alpha_dash', 'unique:services,slug'],
            'short_description' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ]);

        Service::create($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:150',
                Rule::unique('services', 'title')->ignore($service->id),
            ],
            'slug' => [
                'required',
                'string',
                'max:150',
                'alpha_dash',
                Rule::unique('services', 'slug')->ignore($service->id),
            ],
            'short_description' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_featured' => ['required', 'boolean'],
            'is_active' => ['required', 'boolean'],
        ]);

        $service->update($validated);

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        if ($service->is_active) {
            return redirect()
                ->route('admin.services.index')
                ->with('error', 'Please deactivate this service before deleting it. If you only want to hide it from the website, keep it and set it to inactive.');
        }

        $service->delete();

        return redirect()
            ->route('admin.services.index')
            ->with('success', 'Service permanently deleted successfully.');
    }
}