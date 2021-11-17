<?php

use Illuminate\Routing\Router;

Admin::registerAuthRoutes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
], function (Router $router) {

    $router->get('/', 'HomeController@index');
    $router->resource('users', UsersController::class);
    $router->resource('orders', OrderController::class);
    $router->resource('order_statistics', OrderStatisticController::class);
    $router->resource('warehouses', WarehouseController::class);
    $router->resource('warehouse_drivers', WarehouseDriverController::class);
    $router->resource('warehouse_products', WarehouseProductController::class);
    $router->resource('fares', FareController::class);
    $router->resource('matchs', MatchController::class);
    $router->resource('match_users', MatchUserController::class);







});
