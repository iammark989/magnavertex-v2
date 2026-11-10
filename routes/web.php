<?php

use App\Http\Controllers\Web\BusinessSolutionController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\ServiceController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/business-solutions/{slug}', [BusinessSolutionController::class, 'show'])->name('business-solutions.show');

Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');