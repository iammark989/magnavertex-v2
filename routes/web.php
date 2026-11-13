<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\BusinessSolutionController as AdminBusinessSolutionController;
use App\Http\Controllers\Admin\BusinessSolutionImageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Web\BusinessSolutionController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\ServiceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/business-solutions/{slug}', [BusinessSolutionController::class, 'show'])
    ->name('business-solutions.show');

Route::get('/services/{slug}', [ServiceController::class, 'show'])
    ->name('services.show');

/*
|--------------------------------------------------------------------------
| Admin Authentication Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest')->group(function () {
        Route::get('/login', [LoginController::class, 'create'])
            ->name('login');

        Route::post('/login', [LoginController::class, 'store'])
            ->name('login.store');
    });

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::post('/logout', [LoginController::class, 'destroy'])
            ->name('logout');

        Route::resource('services', AdminServiceController::class)
            ->except(['show'])
            ->names('services');

        Route::resource('business-solutions', AdminBusinessSolutionController::class)
            ->except(['show'])
            ->names('business-solutions');
            
        Route::post(
            'business-solutions/{businessSolution}/images',
            [BusinessSolutionImageController::class, 'store']
        )->name('business-solutions.images.store');

        Route::put(
            'business-solutions/{businessSolution}/images/{image}',
            [BusinessSolutionImageController::class, 'update']
        )->name('business-solutions.images.update');

        Route::delete(
            'business-solutions/{businessSolution}/images/{image}',
            [BusinessSolutionImageController::class, 'destroy']
        )->name('business-solutions.images.destroy');
        
        Route::middleware('not-super-admin')->group(function () {
            Route::get('/account', [AccountController::class, 'edit'])
                ->name('account.edit');

            Route::put('/account/password', [AccountController::class, 'updatePassword'])
                ->name('account.password.update');
        });
    });

    Route::middleware('super-admin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::get('/users/create', [UserController::class, 'create'])
            ->name('users.create');

        Route::post('/users', [UserController::class, 'store'])
            ->name('users.store');
            
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])
            ->name('users.edit');

        Route::put('/users/{user}', [UserController::class, 'update'])
            ->name('users.update'); 
            
            
        Route::get('/roles', [RoleController::class, 'index'])
            ->name('roles.index');

        Route::get('/roles/create', [RoleController::class, 'create'])
            ->name('roles.create');

        Route::post('/roles', [RoleController::class, 'store'])
            ->name('roles.store');    

        Route::get('/roles/{role}/edit', [RoleController::class, 'edit'])
            ->name('roles.edit');

        Route::put('/roles/{role}', [RoleController::class, 'update'])
            ->name('roles.update');   

        Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->name('roles.destroy');   
    });

});