<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware('auth:api')->get('user', function (Request $request) {
//     return $request->user();
// });
Route::any("user/login","WechatUserController@login");
Route::any("user/add","WechatUserController@addUser");
Route::any("user/log","WechatUserController@logUser");
Route::any("user/update_address","WechatUserController@updateAddress");
Route::any("user/adCount","WechatUserController@adCount");

Route::any("blcj/add","BlcjUserController@addUser");
Route::any("blcj/log","BlcjUserController@logUser");
Route::any("blcj/adCount","BlcjUserController@adCount");
Route::any("blcj/update_address","BlcjUserController@updateAddress");
Route::group(['middleware' => ['auth.api']], function () {
    Route::any("user/updateUserInfo","WechatUserController@updateUserInfo");
    Route::any("user/uploadLevel","WechatUserController@uploadLevel");
    Route::any("user/uploadWechatInteractive","WechatUserController@uploadWechatInteractive");
    Route::any("user/getWechatInteractive","WechatUserController@getWechatInteractive");
});
Route::any("relationship/add","WechatRelationshipController@add");
Route::any("relationship/list","WechatRelationshipController@list");
Route::any("common/decrypt","WechatCommonController@decrypt");
Route::any("expert/expert_add","WechatExpertController@expert_add");
Route::any("expert/expert_list","WechatExpertController@expert_list");
Route::any("expert/expert_engage","WechatExpertController@expert_engage");
Route::any("expert/expert_dismiss","WechatExpertController@expert_dismiss");
Route::any("expert/expert_is_gift","WechatExpertController@expert_is_gift");
Route::any("expert/iam_expert_list","WechatExpertController@iam_expert_list");
Route::any("expert/iam_expert_beg","WechatExpertController@iam_expert_beg");
Route::any("expert/iam_expert_resign","WechatExpertController@iam_expert_resign");
Route::any("match/info","WechatMatchController@info");
Route::any("match/sign_up","WechatMatchController@sign_up");
Route::any("match/upload_level","WechatMatchController@upload_level");
Route::any("match/rank_list","WechatMatchController@rank_list");
Route::any("match/create_match","WechatMatchController@create_match");

