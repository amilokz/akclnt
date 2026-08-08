<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/leads', [LeadController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/admin/leads', [LeadController::class, 'index']);
    Route::patch('/admin/leads/{id}/status', [LeadController::class, 'updateStatus']);
    Route::post('/admin/leads/{id}/convert', [LeadController::class, 'convertToClient']);

    Route::get('/admin/projects', [ProjectController::class, 'index']);
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::patch('/admin/projects/{id}', [ProjectController::class, 'update']);
    Route::get('/admin/clients', [ProjectController::class, 'clients']);

    Route::get('/client/projects', [ProjectController::class, 'myProjects']);
});