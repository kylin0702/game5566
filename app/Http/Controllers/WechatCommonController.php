<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;

class WechatCommonController extends Controller
{
    public function decrypt(Request $request){
        $app = app('wechat.mini_program');
        $encryptedData=$request->encryptedData;
        $iv=$request->iv;
        $session=$request->api_token;
        $decryptedData = $app->encryptor->decryptData($session, $iv, $encryptedData);
        $body=json_encode(["code"=>10000,"response"=>$decryptedData],320);
        return response($body,  200);
    }
      
}
