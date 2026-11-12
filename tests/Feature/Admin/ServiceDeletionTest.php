<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceDeletionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(\Database\Seeders\RoleSeeder::class);

        $adminRole = Role::where('slug', 'admin')->firstOrFail();

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'is_active' => true,
        ]);

        $this->actingAs($admin);
    }

    public function test_active_service_cannot_be_deleted(): void
    {
        $service = Service::factory()->create([
            'is_active' => true,
        ]);

        $response = $this->delete(
            route('admin.services.destroy', $service)
        );

        $response->assertRedirect(route('admin.services.index'));

        $response->assertSessionHas(
            'error',
            'Please deactivate this service before deleting it. If you only want to hide it from the website, keep it and set it to inactive.'
        );

        $this->assertDatabaseHas('services', [
            'id' => $service->id,
        ]);
    }

    public function test_inactive_service_can_be_deleted(): void
    {
        $service = Service::factory()->create([
            'is_active' => false,
        ]);

        $response = $this->delete(
            route('admin.services.destroy', $service)
        );

        $response->assertRedirect(route('admin.services.index'));

        $response->assertSessionHas(
            'success',
            'Service permanently deleted successfully.'
        );

        $this->assertDatabaseMissing('services', [
            'id' => $service->id,
        ]);
    }


    public function test_active_service_remains_active_after_deletion_is_rejected(): void
    {
        $service = Service::factory()->create([
            'is_active' => true,
        ]);

        $this->delete(route('admin.services.destroy', $service));

        $this->assertDatabaseHas('services', [
            'id' => $service->id,
            'is_active' => true,
        ]);
    }

}