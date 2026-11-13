<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactInquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $inquiries = ContactInquiry::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/contact-inquiries/Index', [
            'inquiries' => $inquiries,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? '',
            ],
            'summary' => [
                'total' => ContactInquiry::count(),
                'new' => ContactInquiry::where('status', 'new')->count(),
                'in_progress' => ContactInquiry::where('status', 'in_progress')->count(),
                'closed' => ContactInquiry::where('status', 'closed')->count(),
            ],
        ]);
    }

    public function show(ContactInquiry $contactInquiry): Response
    {
        // Mark the inquiry as read when first opened.
        if (is_null($contactInquiry->read_at)) {
            $contactInquiry->update([
                'read_at' => now(),
            ]);
        }

        return Inertia::render('admin/contact-inquiries/Show', [
            'inquiry' => $contactInquiry->fresh(),
        ]);
    }

    public function update(Request $request, ContactInquiry $contactInquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => [
                'required',
                'string',
                'in:new,in_progress,responded,closed',
            ],
            'admin_notes' => [
                'nullable',
                'string',
                'max:5000',
            ],
        ]);

        $contactInquiry->update($validated);

        return back()->with(
            'success',
            'Inquiry updated successfully.'
        );
    }
}