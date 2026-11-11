<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')
                ->nullable()
                ->after('id')
                ->constrained('roles')
                ->nullOnDelete();

            $table->string('username')
                ->nullable()
                ->unique()
                ->after('name');

            $table->string('first_name')->nullable()->after('username');
            $table->string('middle_name')->nullable()->after('first_name');
            $table->string('last_name')->nullable()->after('middle_name');
            $table->string('suffix')->nullable()->after('last_name');

            $table->string('mobile')->nullable()->after('email');
            $table->string('image')->nullable()->after('mobile');

            $table->boolean('is_active')->default(true)->after('image');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropUnique(['username']);

            $table->dropColumn([
                'role_id',
                'username',
                'first_name',
                'middle_name',
                'last_name',
                'suffix',
                'mobile',
                'image',
                'is_active',
            ]);
        });
    }
};