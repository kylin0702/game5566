<?php

namespace App\Http\Middleware;

use App\Merchant;
use App\User;
use Closure;

class WechatLog
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $response = $next($request);
        $merchant=Merchant::findOrFail($request->id);
        if($merchant){
            $exist=\App\WechatLog::where("user_id",$request->input("user_id"))->where("merchant_id",$request->id);

            if($exist->count()>0){
                $view_count=$exist->orderBy("id","desc")->first()->view_count;
            }
            else{
                $view_count=0;
            }
            $wechat_log=new \App\WechatLog();
            $wechat_log->merchant_id=$request->id;
            $wechat_log->user_id=$request->input("user_id");
            $wechat_log->view_count=$view_count+1;
            $wechat_log->save();
        }
        return $response;
    }
}
