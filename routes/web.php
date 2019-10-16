<?php

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
    return view('welcome');
});

Auth::routes(['verify' => true]);

// Route::view('dashboard', 'admin/dashboard')->middleware(['web', 'auth']);
Route::get('dashboard', 'AdminController@index')->middleware(['web', 'auth']);
// Route::get('/home', 'HomeController@index')->name('home');
