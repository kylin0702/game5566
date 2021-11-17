<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Match;

class BlcjUserLog extends Model
{
    use Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'openid','unionid','appid','login_time','report_time','game_time','play_time','ip','isp','address','province','city',
        'sdk_version','platform','system','version','screen_width','screen_height','pixel_ratio','brand','model','share_count','aid','ad_tag','trackid'
    ];


}
