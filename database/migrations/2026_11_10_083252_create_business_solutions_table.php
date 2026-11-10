<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_solutions', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');

            $table->string('short_description');

            $table->text('business_challenge');
            $table->longText('solution_description');
            $table->text('ideal_for');

            $table->json('technologies')->nullable();

            $table->string('featured_image')->nullable();
            $table->string('demo_url')->nullable();

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);

            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_solutions');
    }
};