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

Route::prefix('admin')->group(function () {
    Route::get('/', 'AdminController@index')->middleware(['web', 'auth']);
    Route::get('/{sub}', 'AdminController@index')->middleware(['web', 'auth']);
    Route::get('/{sub}/{action}', 'AdminController@index')->middleware(['web', 'auth']);

});
