<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PortfolioController;



Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/leads', [LeadController::class, 'store']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/portfolio', [PortfolioController::class, 'index']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/categories', [PostController::class, 'categories']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/chat', [ChatController::class, 'chat']);

Route::middleware('auth:sanctum')->group(function () {
    // har logged-in user ke liye (admin, team, client)
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/client/projects', [ProjectController::class, 'myProjects']);

    // sirf admin + team — role check ke sath
    Route::middleware('admin')->group(function () {
        Route::get('/admin/leads', [LeadController::class, 'index']);
        Route::patch('/admin/leads/{id}/status', [LeadController::class, 'updateStatus']);
        Route::post('/admin/leads/{id}/convert', [LeadController::class, 'convertToClient']);

        Route::get('/admin/analytics', [\App\Http\Controllers\Api\AnalyticsController::class, 'index']);

        Route::get('/admin/posts', [PostController::class, 'adminIndex']);
        Route::post('/admin/posts', [PostController::class, 'store']);
        Route::put('/admin/posts/{id}', [PostController::class, 'update']);
        Route::delete('/admin/posts/{id}', [PostController::class, 'destroy']);
        Route::post('/admin/posts/upload', [PostController::class, 'uploadImage']);

        Route::get('/admin/projects', [ProjectController::class, 'index']);
        Route::post('/admin/projects', [ProjectController::class, 'store']);
        Route::patch('/admin/projects/{id}', [ProjectController::class, 'update']);
        Route::get('/admin/clients', [ProjectController::class, 'clients']);

        Route::get('/admin/products', [ProductController::class, 'adminIndex']);
        Route::post('/admin/products', [ProductController::class, 'store']);
        Route::put('/admin/products/{id}', [ProductController::class, 'update']);
        Route::delete('/admin/products/{id}', [ProductController::class, 'destroy']);
        Route::post('/admin/products/upload', [ProductController::class, 'uploadImage']);

        Route::get('/admin/portfolio', [PortfolioController::class, 'adminIndex']);
        Route::post('/admin/portfolio', [PortfolioController::class, 'store']);
        Route::put('/admin/portfolio/{id}', [PortfolioController::class, 'update']);
        Route::delete('/admin/portfolio/{id}', [PortfolioController::class, 'destroy']);
        Route::post('/admin/portfolio/upload', [PortfolioController::class, 'uploadImage']);
    });
});