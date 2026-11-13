<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BusinessSolution;
use App\Models\BusinessSolutionImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BusinessSolutionImageController extends Controller
{
    public function store(
        Request $request,
        BusinessSolution $businessSolution
    ): RedirectResponse {
        $validated = $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['required', 'image', 'max:5120'],
            'captions' => ['nullable', 'array'],
            'captions.*' => ['nullable', 'string', 'max:255'],
        ]);

        $nextSortOrder = (int) $businessSolution->images()
            ->max('sort_order') + 1;

        foreach ($request->file('images', []) as $index => $file) {
            $path = $file->store('business-solutions/gallery', 'public');

            $businessSolution->images()->create([
                'image' => $path,
                'caption' => $validated['captions'][$index] ?? null,
                'sort_order' => $nextSortOrder++,
            ]);
        }

        return back()->with(
            'success',
            'Gallery images uploaded successfully.'
        );
    }

    public function update(
        Request $request,
        BusinessSolution $businessSolution,
        BusinessSolutionImage $image
    ): RedirectResponse {
        abort_unless(
            $image->business_solution_id === $businessSolution->id,
            404
        );

        $validated = $request->validate([
            'caption' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ]);

        $image->update($validated);

        return back()->with(
            'success',
            'Gallery image updated successfully.'
        );
    }

    public function destroy(
        BusinessSolution $businessSolution,
        BusinessSolutionImage $image
    ): RedirectResponse {
        abort_unless(
            $image->business_solution_id === $businessSolution->id,
            404
        );

        $imagePath = $image->image;

        $image->delete();

        if ($imagePath) {
            Storage::disk('public')->delete($imagePath);
        }

        return back()->with(
            'success',
            'Gallery image deleted successfully.'
        );
    }
}