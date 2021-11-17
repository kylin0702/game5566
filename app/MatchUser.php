<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\User;
use App\Match;

class MatchUser extends Model
{
    use Notifiable;
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'openid','match_id',"weapon_id","weapon_level","group"
    ];

    public function user()
    {
        return $this->hasOne(User::class,"openid","openid");
    }
    
    public function match()
    {
        return $this->belongsTo(Match::class,"match_id","id");
    }

}
