<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display the user listing.
     */
    public function index(Request $request): Response
    {
        $users = User::query()
            ->with('role:id,name,slug')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->string('search')->trim()->toString();

                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $request->input('search', ''),
            ],
        ]);
    }

    /**
     * Show the create user form.
     */
    public function create(): Response
    {
        $roles = Role::query()
            ->select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'suffix' => ['nullable', 'string', 'max:20'],

            'username' => [
                'required',
                'string',
                'max:50',
                'alpha_dash',
                'unique:users,username',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'mobile' => ['nullable', 'string', 'max:30'],

            'role_id' => [
                'required',
                'integer',
                Rule::exists('roles', 'id'),
            ],

            'password' => ['required', 'string', 'min:8', 'confirmed'],

            'is_active' => ['required', 'boolean'],
        ]);

        $name = implode(' ', array_filter([
            $validated['first_name'],
            $validated['middle_name'] ?? null,
            $validated['last_name'],
            $validated['suffix'] ?? null,
        ]));

        User::create([
            'name' => $name,
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'] ?? null,
            'last_name' => $validated['last_name'],
            'suffix' => $validated['suffix'] ?? null,
            'username' => $validated['username'],
            'email' => $validated['email'],
            'mobile' => $validated['mobile'] ?? null,
            'role_id' => $validated['role_id'],
            'password' => $validated['password'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User account created successfully.');
    }

    /**
     * Show the edit user form.
     */
    public function edit(User $user): Response
    {
        $roles = Role::query()
            ->select('id', 'name', 'slug')
            ->orderBy('id')
            ->get();

        return Inertia::render('admin/users/Edit', [
            'user' => $user->only([
                'id',
                'first_name',
                'middle_name',
                'last_name',
                'suffix',
                'username',
                'email',
                'mobile',
                'role_id',
                'is_active',
            ]),
            'roles' => $roles,
        ]);
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'suffix' => ['nullable', 'string', 'max:20'],

            'username' => [
                'required',
                'string',
                'max:50',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($user->id),
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],

            'mobile' => ['nullable', 'string', 'max:30'],

            'role_id' => [
                'required',
                'integer',
                Rule::exists('roles', 'id'),
            ],

            'password' => ['nullable', 'string', 'min:8', 'confirmed'],

            'is_active' => ['required', 'boolean'],
        ]);

        // Prevent the currently logged-in Super Admin
        // from demoting or deactivating their own account.
        if (
            $request->user()->is($user) &&
            (
                (int) $validated['role_id'] !== (int) $user->role_id ||
                !$validated['is_active']
            )
        ) {
            throw ValidationException::withMessages([
                'role_id' => 'You cannot change your own Super Admin role or deactivate your own account.',
            ]);
        }

        // Protect the last active Super Admin account.
        $isCurrentlyActiveSuperAdmin =
            $user->is_active &&
            $user->role?->slug === 'super-admin';

        $isBeingDemotedOrDeactivated =
            (int) $validated['role_id'] !== (int) $user->role_id ||
            !$validated['is_active'];

        if ($isCurrentlyActiveSuperAdmin && $isBeingDemotedOrDeactivated) {
            $otherActiveSuperAdmins = User::query()
                ->where('is_active', true)
                ->where('id', '!=', $user->id)
                ->whereHas('role', function ($query) {
                    $query->where('slug', 'super-admin');
                })
                ->exists();

            if (!$otherActiveSuperAdmins) {
                throw ValidationException::withMessages([
                    'role_id' => 'You cannot demote or deactivate the last active Super Admin account.',
                ]);
            }
        }

        $name = implode(' ', array_filter([
            $validated['first_name'],
            $validated['middle_name'] ?? null,
            $validated['last_name'],
            $validated['suffix'] ?? null,
        ]));

        $userData = [
            'name' => $name,
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'] ?? null,
            'last_name' => $validated['last_name'],
            'suffix' => $validated['suffix'] ?? null,
            'username' => $validated['username'],
            'email' => $validated['email'],
            'mobile' => $validated['mobile'] ?? null,
            'role_id' => $validated['role_id'],
            'is_active' => $validated['is_active'],
        ];

        // Only update the password when a new one is provided.
        if (!empty($validated['password'])) {
            $userData['password'] = $validated['password'];
        }

        $user->update($userData);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User account updated successfully.');
    }

}