<?php

namespace App\Http\Controllers;

use App\MerchantType;
use Illuminate\Http\Request;
use AlibabaCloud\Client\AlibabaCloud;
use AlibabaCloud\Client\Exception\ClientException;
use AlibabaCloud\Client\Exception\ServerException;

class WechatConfig extends Controller
{

    //输出各种配置信息
    public function index()
    {
        $data=[
            "search_text"=>config("others.search_text"),
            "gift_switch"=>config("others.gift_switch"),
            "gift_text"=>config("others.gift_text"),
            "invite_friend_point"=>config("others.invite_friend_point"),
            "article_wedding_point"=>config("others.article_wedding_point"),
            "share_order_point"=>config("others.share_order_point"),
        ];
        $response=json_encode(["errMsg"=>"request:ok","data"=>$data],320);
        return $response;
    }

    //商户类型筛选标签
    public function merchant_tag(Request $request)
    {
        $id = $request->get('q');
        $extras= MerchantType::find( $id)->extra;
        $items=[];
        $data=[];
        foreach($extras as $extra){
            $values=explode(",",$extra["value"]);
            foreach($values as $value){
                array_push($items,$value);
            }
        }
        for ($i=0;$i<count($items);$i++){
            array_push($data,["id"=>$items[$i],"text"=>$items[$i]]);
        }
        return $data;
    }

    //发送短信验证码
    public function verify_code(Request $request){
        $phone=$request["phone"];
        AlibabaCloud::accessKeyClient('LTAILAPRnWnyZnJz', 'CBUbx0b1Srm8ccDqwp3RWOu4U9R1Wr')
            ->regionId('cn-hangzhou')
            ->asDefaultClient();
        $verify_code=rand(100000,999999);
        try {
            $result = AlibabaCloud::rpc()
                ->product('Dysmsapi')
                // ->scheme('https') // https | http
                ->version('2017-05-25')
                ->action('SendSms')
                ->method('POST')
                ->options([
                    'query' => [
                        'RegionId' => "cn-hangzhou",
                        'PhoneNumbers' => "$phone",
                        'SignName' => "享结婚小程序",
                        'TemplateCode' => "SMS_167435404",
                        'TemplateParam' => "{'code':'$verify_code'}",
                    ],
                ])
                ->request();
            //print_r($result->toArray());
            $response=json_encode(["verify_code"=>$verify_code,"reslut"=>$result->toArray()],320);
            return $response;
        } catch (ClientException $e) {
            echo $e->getErrorMessage() . PHP_EOL;
            $response=json_encode(["reslut"=>$e->getErrorMessage() . PHP_EOL],320);
            return $response;
        } catch (ServerException $e) {
            $response=json_encode(["reslut"=>$e->getErrorMessage() . PHP_EOL],320);
            return $response;
        }
    }


}
