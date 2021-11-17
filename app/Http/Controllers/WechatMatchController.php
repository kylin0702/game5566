<?php

namespace App\Http\Controllers;

use App\Match;
use App\MatchUser;
use App\User;
use Illuminate\Http\Request;
class WechatMatchController extends Controller
{

    //最新一场比赛
    public function info(){
        $match=Match::orderBy("id","desc")->first();
        if(!empty($match)){
            $match["start_at"]=strtotime($match->start_at);
            $match["end_at"]=strtotime($match->end_at);
            $body=json_encode(["code"=>10000,"response"=>$match],320);
         }
         else{
            $body=json_encode(["code"=>30001,"response"=>"没有比赛信息"],320);
         }
         return response($body,  200);
    }
    //比赛报名
       protected  function sign_up(Request $request)
       {
         $match_id=$request->match_id;
         $openid=$request->openid;
         $weapon_id=$request->weapon_id;
         $weapon_level=$request->weapon_level;
         $group=$this->generate_group($match_id);
         if(!empty($match_id)&&!empty($openid)){
            $data=MatchUser::UpdateOrCreate(['match_id'=>$match_id,"openid"=>$openid],[
                'match_id' => $match_id,
                'openid' =>$openid,
                'weapon_id'=>$weapon_id,
                'weapon_level'=>$weapon_level,
                'group'=>$group
            ]);
            $body=$this->rank_data($match_id, $openid);
        }else{
            $data="参数错误!";
            $body=json_encode(["code"=>30001,"response"=>$data],320);
        }
         return response($body,  200);
       }

       //上传比赛分数
       protected  function upload_level(Request $request)
       {
         $match_id=$request->match_id;
         $openid=$request->openid;
         $weapon_id=$request->weapon_id;
         $weapon_level=$request->weapon_level;
         $match_users=MatchUser::where("openid",$openid)->get();
         if(count($match_users)>0){
            foreach($match_users as $match_user){
                $match_user->weapon_id=$weapon_id;
                $match_user->weapon_level=$weapon_level;
                $match_user->save();
            }
            $body=json_encode(["code"=>10000,"response"=>"upload success"],320);
         }else{
            $body=json_encode(["code"=>30001,"response"=>"upload failed"],320);
         }

         return response($body,  200);
       }
        //排名列表
           protected  function rank_list(Request $request)
           {
             $match_id=$request->match_id;
             $openid=$request->openid;
             $body=$this->rank_data($match_id, $openid);
             return response($body,  200);
           }
           protected function rank_data($match_id,$openid){
               //取前50名数据
             $data=[];
             $rank_part=MatchUser::where("match_id",$match_id)->orderBy("weapon_level","desc")->take(50)->get();
             for($i=0;$i<count($rank_part);$i++){
                $user=User::where("openid",$rank_part[$i]->openid)->first();
                $rank_part[$i]["nickName"]=$user->nickName;
                $rank_part[$i]["avatarUrl"]=$user->avatarUrl;
                array_push($data,$rank_part[$i]);  
             }
             //取本人数据
             $self=MatchUser::where("match_id",$match_id)->where("openid",$openid)->first();
             if(!empty($self)){
                $user=User::where("openid",$openid)->first();
                $self->nickName=$user->nickName;
                $self->avatarUrl=$user->avatarUrl;
                $body=json_encode(["code"=>10000,"response"=>$data,"self_rank"=>$self],320);
             }else{
                $body=json_encode(["code"=>10000,"response"=>$data,"self_rank"=>null],320);
             }
             return $body;
           }
        //生成组号
        protected function generate_group($match_id){
            $last_match_user=MatchUser::where("match_id",$match_id)->orderBy("group","desc")->first();
            if(empty($last_match_user)){
                return 1;
            }else{
                //最后一个报名的数据
                $last_group=$last_match_user->group;
                $last_group_count=MatchUser::where("group",$last_group)->count();
                if($last_group_count<20){
                    return $last_group;
                }else{
                    return $last_group+1;
                }
            }
        }
        //自动创建比赛
       protected  function create_match(Request $request)
       {
         $last_match=Match::orderBy("id","desc")->first();
         $last_session= $last_match->session;
         $new_match=new Match();
         $current_hour=date("H");
         $session=$last_session+1;
         $new_match->title="第".$session."届阿波罗计划";
         $new_match->session=$session;
         $new_match->status=0;
         $new_match->weapon_id="w10000";
         $new_match->weapon_level=500;
         if($current_hour==0){
            $new_match->start_at=date("Y-m-d 14:00:00");
            $new_match->end_at=date("Y-m-d 14:00:00",strtotime('+2 day'));
            $new_match->save();
            $body=json_encode(["code"=>10000,"response"=>"add match success"],320);
         }
         else if($current_hour==14){
            $new_match->start_at=date("Y-m-d 19:00:00");
            $new_match->end_at=date("Y-m-d 19:00:00",strtotime('+2 day'));
            $new_match->save();
            $body=json_encode(["code"=>10000,"response"=>"add match success"],320);
         }else{
            $body=json_encode(["code"=>30001,"response"=>"time error"],320);
         }
         return $body;
       }

}
