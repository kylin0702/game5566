<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
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
        'network_type','sdk_version','platform','system','version','screen_width','screen_height','pixel_ratio','brand','model','aid','ad_tag','traceid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The coupons that belong to the user.
     */
    public function coupons()
    {
        return $this->belongsToMany(Coupon::class,"user_coupons")->as("coupon_info")->withPivot(['user_id','coupon_id','used'])->withTimestamps();
    }
}
