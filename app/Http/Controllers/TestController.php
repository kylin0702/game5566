<?php

namespace App\Http\Controllers;

use Ichynul\Configx\Configx;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Allinpay\AllinpayService\Allinpay;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use App\Device;
use App\DeviceProduct;
use App\WechatAd;
use App\UserDriver;
use App\User;
use App\Product;
class TestController extends Controller
{



    public function login(Request $request)
    {
        $code = $request->code;
        if($code)
        {
            $app = app('wechat.mini_program');
            $data = $app->auth->session($code);
            $weappOpenid = $data['openid'];
            $weixinSessionKey = $data['session_key'];
        }
        $user=User::UpdateOrCreate(['openid'=>$weappOpenid],[
            'openid' => $weappOpenid,
            //'api_token' =>$weixinSessionKey,
        ]);
        Redis::set($weixinSessionKey,$user->id);
        $driver=UserDriver::where("openid", $weappOpenid)->first();
        if($driver){
            $data["driver_status"]=$driver->status;
        }
        else{
            $data["driver_status"]="un_apply";
        }
        $data["is_driver"]=$user->is_driver;

        $response=json_encode(["code"=>0,"data"=>$data],320);
        return $response;
    }


    public function product_list(Request $request){
        $position=$request->position;
        if($position=="inner"){
            $cell_no=$request->cell_no;
            $data=Product::where("position",$position)->where("cell_no",$cell_no)->where("up",1)->orderBy("id","desc")->get();
        }else if($position=="outer"){
            $data=Product::where("position",$position)->where("up",1)->orderBy("id","desc")->get();
        }
        else{
            $data=[];
        }
        $response=json_encode(["code"=>0,"data"=>$data],320);
        return  $response;
    }
     //扫码返回接口
      public function index($device_no,Request $request)
      {
          $data=Device::where("device_no",$device_no)->first();
          $openid=$request->openid;
          if($data){
              $driver=UserDriver::find($data->driver_id);
              $data["driver_pocket"]=$driver->pocket;
              //字符串转数组
              $data["blePasswd"]=explode(",", $data["blePasswd"]);
              $bkey_temp=[];
              foreach($data["blePasswd"] as $v){
                   array_push($bkey_temp,intval($v));
              }
              $data["blePasswd"]=$bkey_temp;
              //没有传入openid，获取设备绑定司机的openid,兼容旧版本
              if($openid!=$driver->openid||empty($openid)){
                $data["is_driver"]=0;
              }
              $response=json_encode(["code"=>0,"data"=>$data],320);

          }
          else{
              $response=json_encode(["code"=>30003,"data"=>"设备不存在"],320);
          }
          return $response;
      }

}
