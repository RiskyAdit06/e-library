<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AuthContoller;
use App\Http\Controllers\Web\FavoriteController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\Admin\DashboardController;
use App\Http\Controllers\Web\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/login', [AuthContoller::class, 'loginPage']);
Route::get('/register', [AuthContoller::class, 'registerPage']);
Route::get('/', [HomeController::class, 'homePage']);
Route::get('/katalog', [HomeController::class, 'katalogPage']);
Route::get('/favorite', [FavoriteController::class, 'favoritePage']);
Route::get('/admin/dashboard', [DashboardController::class, 'dashboardPage']);
Route::get('/profile-user', [ProfileController::class, 'profilePage']);
