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
    return redirect('http://www.hanchor.cn/');
});
Route::group(['middleware' => ['web', 'wechat.oauth']], function () {
    Route::get('/user', function () {

    });
});
