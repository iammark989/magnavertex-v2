<?php

use App\Http\Controllers\Web\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ServiceController::class, 'index'])
    ->name('home');