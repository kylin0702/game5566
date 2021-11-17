<?php

namespace App\Http\Controllers;

use App\Expert;
use App\User;
use Encore\Admin\Admin;
use Encore\Admin\Auth\Database\Administrator;
use Encore\Admin\Auth\Database\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WechatExpertController extends Controller
{
    //专家邀请
    public function expert_add(Request $request){
        $openid=$request->openid;
        $friend_openid=$request->friend_openid;
         //该api请求是由被邀请者发起，交换openid和friend_openid位置
        $expert=Expert::where("openid",$friend_openid)->where("friend_openid",$openid)->first();
        $iam_expert_count=Expert::where("friend_openid",$openid)->where("is_engage",1)->count();
       if(empty($expert)){
            $result=Expert::create([
                'openid' => $friend_openid,
                'friend_openid' =>$openid
            ]);
            if(!empty($result)){
                $data="邀请成功!";
                $body=json_encode(["code"=>10000,"response"=>$data],320); 
                return response($body,  200);
            }
       }else{
             //已经是被邀请人的专家
            if($expert->is_engage==1){
                $data=$expert->engaged_weapon_id;
                $body=json_encode(["code"=>10001,"response"=>$data],320);
                return response($body,  200); 
            }
             //已经是3个人的专家
            if($iam_expert_count>=3){
                $data="已经是3个好友的专家了";
                $body=json_encode(["code"=>10002,"response"=>$data],320);
                return response($body,  200); 
            }
            
       }
       
       
    }
    //我的专家列表
    public function expert_list(Request $request){
        $openid=$request->openid;
        $experts=Expert::where("openid",$openid)->get();
        $expert_count=Expert::where("openid",$openid)->where("is_engage",1)->count();
        $data=[];
        foreach($experts as $expert){
            $user=User::where("openid",$expert->friend_openid)->first();
            if(!empty($user)){
                $expert["friend_nickName"]=$user->nickName;
                $expert["friend_avatar_url"]=$user->avatarUrl;
                $expert["friend_level"]=$user->level;
            }
            array_push($data,$expert);
        }
        
        $body=json_encode(["code"=>10000,"response"=>$data,"expert_count"=>$expert_count],320);
        return response($body,  200);
    }
     //专家聘用
     public function expert_engage(Request $request){
        $openid=$request->openid;
        $friend_openid=$request->friend_openid;
        $engaged_weapon_id=$request->engaged_weapon_id;
        $expert=Expert::where("openid",$openid)->where("friend_openid",$friend_openid)->first();
        if(!empty($expert)){
            $expert->is_engage=1;
            $expert->engaged_weapon_id=$engaged_weapon_id;
            $expert->save();
            $data="邀请成功!";
            $body=json_encode(["code"=>10000,"response"=>$data],320);
        }
        else{
            $data="邀请失败";
            $body=json_encode(["code"=>30001,"response"=>$data],320);
        }
        return response($body,  200);   
    }
      
    //我是谁的专家列表
    public function iam_expert_list(Request $request){
        $openid=$request->openid;
        $friends=Expert::where("friend_openid",$openid)->where("is_engage",1)->get(["openid","friend_openid","is_beg","is_gift"]);
        $data=[];
       
        foreach($friends as $friend){
            $user=User::where("openid",$friend->openid)->first();
            if(!empty($user)){
                $iam_expert_info=[];
                $iam_expert_info["openid"]=$friend->friend_openid;
                $iam_expert_info["friend_openid"]=$friend->openid;
                $iam_expert_info["is_gift"]=$friend->is_gift;
                $iam_expert_info["is_beg"]=$friend->is_beg;
                $iam_expert_info["friend_nickName"]=$user->nickName;
                $iam_expert_info["friend_avatar_url"]=$user->avatarUrl;
                $iam_expert_info["friend_level"]=$user->level;
            }
            array_push($data,$iam_expert_info);
        }
        
        $body=json_encode(["code"=>10000,"response"=>$data],320);
        return response($body,  200);
    }
         //更改是否已发额外收益标记
         public function expert_is_gift(Request $request){
            $openid=$request->openid;
            $friend_openid=$request->friend_openid;
            $is_gift=$request->is_gift;
            $expert=Expert::where("openid",$openid)->where("friend_openid",$friend_openid)->first();
            if(!empty($expert)){
                $expert->is_gift=$is_gift;
                if($is_gift==1){
                    $expert->is_beg=0;//取消讨要奖金标记
                    $expert->last_gift_time=date("Y-m-d H:i:s");
                }
                $expert->save();
                $data="操作成功!";
                $body=json_encode(["code"=>10000,"response"=>$data],320);
            }
            else{
                $data="操作失败";
                $body=json_encode(["code"=>30001,"response"=>$data],320);
            }
            return response($body,  200);   
        }
         //辞退专家
         public function expert_dismiss(Request $request){
            $openid=$request->openid;
            $friend_openid=$request->friend_openid;
            $expert=Expert::where("openid",$openid)->where("friend_openid",$friend_openid)->first();
            if(!empty($expert)){
                $expert->delete();
                $data="操作成功!";
                $body=json_encode(["code"=>10000,"response"=>$data],320);
            }
            else{
                $data="操作失败";
                $body=json_encode(["code"=>30001,"response"=>$data],320);
            }
            return response($body,  200);   
        }
    //请求发放奖金
    public function iam_expert_beg(Request $request){
        $openid=$request->openid;
        $friend_openid=$request->friend_openid;
        //此处是朋友发送过来的讨要请求，openid和friend_openid位置需要做交换
        $iam_expert=Expert::where("friend_openid",$openid)->where("openid",$friend_openid)->first();
        if(!empty($iam_expert)){
            $iam_expert->is_beg=1;
            $result=$iam_expert->save();
            if($result==true){
                $body=json_encode(["code"=>10000,"response"=>"讨要奖金成功"],320);
            }else{
                $body=json_encode(["code"=>30001,"response"=>"讨要奖金失败"],320);
            }
        }else{
            $body=json_encode(["code"=>30002,"response"=>"数据错误"],320);
        }
        return response($body,  200);
    }
     //专家辞职
     public function iam_expert_resign(Request $request){
        $openid=$request->openid;
        $friend_openid=$request->friend_openid;
        //此处是朋友发送过来的讨要请求，openid和friend_openid位置需要做交换
        $expert=Expert::where("openid",$friend_openid)->where("friend_openid",$openid)->first();
        if(!empty($expert)){
            $expert->delete();
            $data="操作成功!";
            $body=json_encode(["code"=>10000,"response"=>$data],320);
        }
        else{
            $data="操作失败";
            $body=json_encode(["code"=>30001,"response"=>$data],320);
        }
        return response($body,  200);   
    }
}
