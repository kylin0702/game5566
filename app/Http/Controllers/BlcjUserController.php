<?php

namespace App\Http\Controllers;

use App\BlcjUser;
use App\BlcjUserLog;
use App\BlcjUserAd;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Allinpay\AllinpayService\Allinpay;
use Symfony\Component\HttpFoundation\Response;
class BlcjUserController extends Controller
{
     
   
         protected  function addUser(Request $request)
         {
            $appid=$request->appid;
            $openid=$request->openid;
            $unionid=$request->unionid;
            $registerTime=$request->registerTime;
            $loginCount=$request->loginCount;
            $fromUnionid=empty($request->fromUnionid)?"":$request->fromUnionid;
            $isShare=$fromUnionid==""?0:1;
            $brand=empty($request->brand)?"":$request->brand;
            $model=empty($request->model)?"":$request->model;
            $pixelRatio=empty($request->pixelRatio)?"":$request->pixelRatio;
            $screenHeight=empty($request->screenHeight)?"":$request->screenHeight;
            $screenWidth=empty($request->screenWidth)?"":$request->screenWidth;
            $version=empty($request->version)?"":$request->version;
            $system=empty($request->system)?"":$request->system;
            $platform=empty($request->platform)?"":$request->platform;
            $SDKVersion=empty($request->SDKVersion)?"":$request->SDKVersion;
            $networkType=empty($request->networkType)?"":$request->networkType;
            $aid=empty($request->aid)?"":$request->aid;
            $adTag=empty($request->adTag)?"":$request->adTag;
            $traceid=empty($request->traceid)?"":$request->traceid;
            
            if($loginCount==1){
               $user=BlcjUser::Create([
                  'appid' =>  $appid,
                  'openid' =>  $openid,
                  'unionid' =>  $unionid,
                  'register_time' =>date("Y-m-d H:i:s",$registerTime/1000),
                  'register_timestamp' =>$registerTime,
                  'login_count' =>$loginCount,
                  'brand'=>$brand,
                  'model'=>$model,
                  'pixel_ratio'=>$pixelRatio,
                  'screen_height'=>$screenHeight,
                  'screen_width'=>$screenWidth,
                  'version'=>$version,
                  'system'=>$system,
                  'platform'=>$platform,
                  'sdk_version'=>$SDKVersion,
                  'network_type'=>$networkType,
                  'aid'=>$aid,
                  'ad_tag'=>$adTag,
                  'traceid'=>$traceid,
                  'is_share'=>$isShare,
                  'from_unionid'=>$fromUnionid    
               ]);
            }else{
               $user=BlcjUser::UpdateOrCreate(['openid'=>$openid],[
                  'login_count' =>$loginCount,
                  'brand'=>$brand,
                  'model'=>$model,
                  'pixel_ratio'=>$pixelRatio,
                  'screen_height'=>$screenHeight,
                  'screen_width'=>$screenWidth,
                  'version'=>$version,
                  'system'=>$system,
                  'platform'=>$platform,
                  'sdk_version'=>$SDKVersion,
                  'network_type'=>$networkType,
                  'aid'=>$aid,
                  'ad_tag'=>$adTag,
                  'traceid'=>$traceid
            ]);
            }
        
            if(!empty($user->id)){
               $body=json_encode(["code"=>10000,"msg"=>"success","interval"=>16],320);
            }else{
               $body=json_encode(["code"=>30001,"msg"=>"failed"],320);
            }
           
            return response($body,  200);
         }

         protected  function logUser(Request $request)
         {
            $appid=$request->appid;
            $openid=$request->openid;
            $unionid=$request->unionid;
            $loginTime=$request->loginTime;
            $reportTime=$request->reportTime;
            $gameTime=round(($reportTime-$loginTime)/1000);
            $playTime=empty($request->playTime)?0:$request->playTime;
            $ip=$request->ip();
            $brand=empty($request->brand)?"":$request->brand;
            $model=empty($request->model)?"":$request->model;
            $pixelRatio=empty($request->pixelRatio)?"":$request->pixelRatio;
            $screenHeight=empty($request->screenHeight)?"":$request->screenHeight;
            $screenWidth=empty($request->screenWidth)?"":$request->screenWidth;
            $version=empty($request->version)?"":$request->version;
            $system=empty($request->system)?"":$request->system;
            $platform=empty($request->platform)?"":$request->platform;
            $SDKVersion=empty($request->SDKVersion)?"":$request->SDKVersion;
            $networkType=empty($request->networkType)?"":$request->networkType;
            $aid=empty($request->aid)?"":$request->aid;
            $adTag=empty($request->adTag)?"":$request->adTag;
            $traceid=empty($request->traceid)?"":$request->traceid;
            $shareCount=empty($request->shareCount)?0:$request->shareCount;
            $user_log=BlcjUserLog::updateOrCreate(
            ['appid' =>  $appid,
            'openid' =>  $openid,
            'unionid' =>  $unionid,
            'login_time' =>$loginTime],
            [
               'appid' =>  $appid,
               'openid' =>  $openid,
               'unionid' =>  $unionid,
               'login_time' =>$loginTime,
               'report_time' =>$reportTime,
               'game_time' =>$gameTime,
               'play_time' =>$playTime,
               'ip'=>$ip,
               'brand'=>$brand,
               'model'=>$model,
                  'pixel_ratio'=>$pixelRatio,
                  'screen_height'=>$screenHeight,
                  'screen_width'=>$screenWidth,
                  'version'=>$version,
                  'system'=>$system,
                  'platform'=>$platform,
                  'sdk_version'=>$SDKVersion,
                  'network_type'=>$networkType,
                  'aid'=>$aid,
                  'ad_tag'=>$adTag,
                  'traceid'=>$traceid,
                  'share_count'=>$shareCount
            ]);
            if(!empty($user_log->id)){
               $user=BlcjUser::where("unionid",$user_log->unionid)->first();
               if(!empty($user->register_timestamp)){
                  $date1=date('Y-m-d',$user->register_timestamp/1000);
                  $date2=date('Y-m-d',$loginTime/1000);
                  if($date1==$date2){
                     $user_log->is_new=1;
                     $user_log->save();
                  }
                  $body=json_encode(["code"=>10000,"msg"=>"success"],320);
               }else{
                  $body=json_encode(["code"=>10000,"msg"=>"success"],320);
               }
            }else{
               $body=json_encode(["code"=>30001,"msg"=>"failed"],320);
            }
           
            return response($body,  200);
         }

         protected  function adCount(Request $request)
         {
            $appid=$request->appid;
            $openid=$request->openid;
            $unionid=$request->unionid;
            $registerTime=$request->registerTime;
            $loginTime=$request->loginTime;
            $watchCount=$request->watchCount;
            $rewardedCount=$request->rewardedCount;
            $date1=date("Y-m-d",$registerTime/1000);
            $date2=date("Y-m-d",  $loginTime/1000);
            $isNew=$date1==$date2?1:0;
            $type=$request->type;
           // return response(date("Y-m-d",$loginTime/1000), 200);
            $user=BlcjUserAd::where("appid",$appid)
            ->where("openid",$openid)
            ->where("unionid",$unionid)
            ->where("login_date",$date2)
            ->first();
            if(empty($user)){
               $user=BlcjUserAd::create(
                  [
                     'appid' =>  $appid,
                     'openid' =>  $openid,
                     'unionid' =>  $unionid,
                     'login_date' =>$date2,
                     'watch_count' =>$type=="watch"?1:0,
                     'rewarded_count' =>$type=="rewarded"?1:0,
                     'error_count' =>$type=="error"?1:0,
                     'is_new'=>$isNew
                  ]);
            }else{
               if($type=="watch"){
                  $user->watch_count=$user->watch_count+1;
                  $user->save();
               }else if($type=="rewarded"){
                  $user->rewarded_count=$user->rewarded_count+1;
                  $user->save();
               }
               else{
                  $user->error_count=$user->error_count+1;
                  $user->save();
               }
            
            }
            if(!empty($user->id)){
               $body=json_encode(["code"=>10000,"msg"=>"success"],320);
            }else{
               $body=json_encode(["code"=>30001,"msg"=>"failed"],320);
            }
           
            return response($body,  200);
         }

         protected  function ipToAddress($ip){
            $host = "https://searchip.market.alicloudapi.com";
            $path = "/aliyun/ip/search";
            $method = "GET";
            $appcode = "e689fcaa9ca84769bfd7a23ab07100c8";
            $headers = array();
            array_push($headers, "Authorization:APPCODE " . $appcode);
            //需要自行安装UUID,需要给X-Ca-Nonce的值生成随机字符串，每次请求不能相同
            $uuidStr = $this->uuid_create();
            array_push($headers, "X-Ca-Nonce:" . $uuidStr);
            $querys = "ip=$ip";
            $bodys = "";
            $url = $host . $path . "?" . $querys;

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($curl, CURLOPT_FAILONERROR, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_HEADER, true);
            if (1 == strpos("$".$host, "https://"))
            {
               curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
               curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            }
            $result=list($headers,$body)=explode("\r\n\r\n",curl_exec($curl),2);

            $result_array=json_decode($result[1]);
            $data= $result_array->data;
            $type=$data->type;
            $address= $data->address;
            $province=empty($data->province)?"":$data->province;
            $city=empty($data->city)?"":$data->city;
            $response=['type'=>$type,'address'=>$address,'province'=>$province,'city'=>$city];
            return $response;
         }

         protected  function updateAddress(Request $request){
            $data=BlcjUserLog::whereNotNull("ip")->whereNull("address")->get();
            foreach($data as $item){
               $address_info=$this->ipToAddress($item->ip);
               $item->isp=$address_info["type"];
               $item->address=$address_info["address"];
               $item->province=$address_info["province"];
               $item->city=$address_info["city"];
               $item->save();
            }
            $body=json_encode(["code"=>10000,"msg"=>"success"],320);
         }

         protected function  uuid_create()  
         {  
            $chars = md5(uniqid(mt_rand(), true));  
            $uuid = substr ( $chars, 0, 8 ) . '-'
                     . substr ( $chars, 8, 4 ) . '-' 
                     . substr ( $chars, 12, 4 ) . '-'
                     . substr ( $chars, 16, 4 ) . '-'
                     . substr ( $chars, 20, 12 );  
            return $uuid ;  
         }  
}
