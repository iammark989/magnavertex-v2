<?php

namespace Database\Seeders;

use Database\Seeders\BusinessSolutionSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ServiceSeeder::class,
            BusinessSolutionSeeder::class,
            RoleSeeder::class,
        ]);
    }
}