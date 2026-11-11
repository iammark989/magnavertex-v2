<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class LoginController extends Controller
{
    /**
     * Display the admin login page.
     */
    public function create(): Response
    {
        return Inertia::render('admin/auth/Login');
    }

    /**
     * Authenticate an admin user.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ]);

        $login = $credentials['login'];

        $throttleKey = Str::lower($login).'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            throw ValidationException::withMessages([
                'login' => 'Too many login attempts. Please try again in '
                    .RateLimiter::availableIn($throttleKey).' seconds.',
            ]);
        }

        $field = filter_var($login, FILTER_VALIDATE_EMAIL)
            ? 'email'
            : 'username';

        $user = \App\Models\User::query()
            ->where($field, $login)
            ->first();

        if (
            !$user ||
            !$user->is_active ||
            !$user->role ||
            !Auth::attempt([
                $field => $login,
                'password' => $credentials['password'],
            ], $request->boolean('remember'))
        ) {
            RateLimiter::hit($throttleKey, 60);

            throw ValidationException::withMessages([
                'login' => 'The provided credentials are incorrect or your account is inactive.',
            ]);
        }

        RateLimiter::clear($throttleKey);

        $request->session()->regenerate();

        return redirect()->intended('/admin/dashboard');
    }

    /**
     * Log out the authenticated user.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}