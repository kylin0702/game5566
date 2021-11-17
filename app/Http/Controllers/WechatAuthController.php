<?php

namespace App\Http\Controllers;

use App\User;
use App\UserDriver;
use Ichynul\Configx\Configx;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Allinpay\AllinpayService\Allinpay;
use Illuminate\Support\Facades\Redis;
class WechatAuthController extends Controller
{

    //登陆接口,判断用户是存登陆过,无登陆过写入数据库
    protected  function login(Request $request)
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
            'api_token' =>$weixinSessionKey,
        ]);
        Redis::set($weappOpenid,$weixinSessionKey);
        $driver=UserDriver::where("openid", $weappOpenid)->first();
        if($driver){
            $data["driver_status"]=$driver->status;
            $data["pocket"]=$driver->pocket;
            $data["driver_id"]=$driver->id;
        }
        else{
            $data["driver_status"]="un_apply";
        }
        $data["is_driver"]=$user->is_driver;

        $response=json_encode(["code"=>0,"data"=>$data],320);
        return $response;
    }
      //入驻申请
      protected  function apply(Request $request)
      {
              $driver=UserDriver::where('openid',$request->openid)->first();
              if($driver){
                $response=json_encode(["code"=>3002,"data"=>"已提交过申请",],320);
              }
              else{
                $user=User::where('openid',$request->openid)->first();
                $data=UserDrive::create([
                  'user_id' => $user->id,
                  'cityid' => $request->cityid,
                  'teamid' => $request->teamid,
                  'true_name' => $request->true_name,
                  'phone' => $request->phone,
                  'car_no' => $request->car_no,
                  'id_card' => $request->id_card,
                  'openid' => $request->openid,
                ]);
                $response=json_encode(["code"=>0,"data"=>"申请提交成功"],320);
              }
              return $response;
      }
}
