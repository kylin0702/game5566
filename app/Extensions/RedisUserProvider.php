<?php
namespace App\Extensions;

use Illuminate\Support\Facades\Redis;
use Illuminate\Auth\EloquentUserProvider;

class RedisUserProvider extends EloquentUserProvider
{
    /**
     * Retrieve a user by the given credentials.
     *
     * @param  array  $credentials
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function retrieveByCredentials(array $credentials)
    {
        if (!isset($credentials['api_token'])) {
            return;
        }

        $userId = Redis::get($credentials['api_token']);
        $response=json_encode(["code"=>0,"data"=> $userId],320);
        return $response;
        return $this->retrieveById($userId);
    }
}
