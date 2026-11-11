<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'description' => 'Full access to all system features and settings.',
            ],
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Manages website content, users, and inquiries.',
            ],
            [
                'name' => 'Editor',
                'slug' => 'editor',
                'description' => 'Manages website content and related information.',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['slug' => $role['slug']],
                $role
            );
        }
    }
}