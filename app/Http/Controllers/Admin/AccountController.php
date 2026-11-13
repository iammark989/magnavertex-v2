<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display the authenticated user's account details.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('role');

        return Inertia::render('admin/account/Edit', [
            'user' => [
                'name' => $user->name,
                'first_name' => $user->first_name,
                'middle_name' => $user->middle_name,
                'last_name' => $user->last_name,
                'suffix' => $user->suffix,
                'username' => $user->username,
                'email' => $user->email,
                'mobile' => $user->mobile,
                'image' => $user->image,
                'role' => $user->role?->name,
            ],
        ]);
    }

    /**
     * Update the authenticated user's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => [
                'required',
                'string',
                Password::min(8),
                'confirmed',
                'different:current_password',
            ],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return back()->with('success', 'Your password has been updated successfully.');
    }
}