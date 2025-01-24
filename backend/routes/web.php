<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PostController;


Route::apiResource('posts', PostController::class);

// Route::prefix('/v1/admin')->group(function () {
//      Route::get('/', function () {
//         return 'Admin home Page';
//     });
//     Route::get('/users', [ItemController::class, 'index']); // GET all items
//     Route::post('/users', [ItemController::class, 'store']); // POST a new item
//     Route::get('/settings', function () {
//         return 'Admin Settings Page';
//     });
// });
