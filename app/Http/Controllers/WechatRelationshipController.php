<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Relationship;
class WechatRelationshipController extends Controller
{
    public function add(Request $request){
        $openid=$request->openid;
        $friend_openid=$request->friend_openid;
        if(!empty($openid)&&!empty($friend_openid)){
            //该api请求是由被邀请者发起，交换openid和friend_openid位置
            $friend=Relationship::UpdateOrCreate(['openid'=>$friend_openid,"friend_openid"=>$openid],[
                'openid' => $friend_openid,
                'friend_openid' =>$openid,
            ]);
            $data="邀请成功!";
            $body=json_encode(["code"=>10000,"response"=>$data],320);
        }else{
            $data="参数错误!";
            $body=json_encode(["code"=>30001,"response"=>$data],320);
        }
        
     
        return response($body,  200);  
    }
    public function list(Request $request){
        $openid=$request->openid;
        $friends=Relationship::where("openid",$openid)->get();
        $data=[];
        foreach($friends as $friend){
            $user=User::where("openid",$friend->friend_openid)->first();
            if(!empty($user)){
                $friend["friend_level"]=$user->level;
                $friend["friend_avatar_url"]=$user->avatarUrl;
            }
            else{
                $friend["friend_level"]=rand(100,99999);
            }
            array_push($data,$friend);
        }
        $body=json_encode(["code"=>10000,"response"=>$data],320);
        return response($body,  200);
    }
}
