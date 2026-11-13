<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();

            // Visitor Information
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();

            // Inquiry Information
            $table->string('project_type');
            $table->string('subject');
            $table->text('message');

            // Admin Management
            $table->string('status')->default('new')->index();
            $table->timestamp('read_at')->nullable();
            $table->text('admin_notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};