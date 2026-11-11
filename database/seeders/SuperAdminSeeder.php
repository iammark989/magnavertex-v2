<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::where('slug', 'super-admin')->firstOrFail();

        User::updateOrCreate(
            ['email' => 'admin@magnavertex.com'],
            [
                'role_id' => $role->id,
                'name' => 'Magna Vertex Administrator',
                'username' => 'superadmin',
                'first_name' => 'Super',
                'middle_name' => null,
                'last_name' => 'Admin',
                'suffix' => null,
                'mobile' => null,
                'image' => null,
                'password' => Hash::make('passwword'),
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}