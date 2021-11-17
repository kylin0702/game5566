<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class BlcjUser extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'openid','unionid','appid','login_count','register_time','register_timestamp','remember_token' ,'avatarUrl','is_share','from_unionid',
        'nickName','name' ,'country' ,'province','language','city' ,'gender','email','password','api_token','is_driver',
        'network_type','sdk_version','platform','system','version','screen_width','screen_height','pixel_ratio','brand','model','aid','ad_tag','trackid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    
}
