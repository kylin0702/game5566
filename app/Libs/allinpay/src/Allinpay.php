<?php
namespace Allinpay\AllinpayService;
include_once 'File/X509.php';
include_once 'Math/BigInteger.php';
include_once 'Crypt/RSA.php';
include_once 'Crypt/Hash.php';
use App\UserPoint;
use App\Order;
use App\MerchantBookdate;
use App\UserCoupon;
use App\Merchant;
use Illuminate\Support\Facades\DB;
use App\OrderMerchant;
use App\User;

class Allinpay{
    private $merchantCode='1908121555215405316';
    private $version=2;
    private $key_path=__DIR__.'/tlKeys/1908121555215405316.pfx';
    private $key_pwd="20090202";
    private $publicKeyPath=__DIR__.'/tlKeys/TLCert-prod.cer';
    private $requestUrl="https://fintech.allinpay.com/service/soa?";
    private $accountSetNo="400191";
    private $frontUrl="https://admin.ctstory.net";
    private $backUrl="https://admin.ctstory.net/api/wechat/my/order/pay_restul";

    public function index()
    {
        $info = $this->createMember("a103901jda91283912039012hd128",1);
    }

    /**
     *创建一个普通用户;
     * 可以进行验证手机号码等后续操作
     * @param $userId
     * @param int $memberType 用户类型 2=企业用户 3=个人用户
     * @param int $source 本次终端访问类型 1=mobile 2=pc
     * @return array
     * @throws \Exception
     * @author  trendpower
     */
    public function createMember($userId, $memberType = 3, $source = 1)
    {
        $param["bizUserId"] = (string)$userId;
        $param["memberType"] = $memberType;
        $param["source"] = $source;
        $serviceName = 'MemberService';//MemberService
        $methodName = 'createMember';//createMember
        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $signedValue = json_decode($result['signedValue'], 1);
            $thirdUserId = $signedValue['userId'];
            $data['state'] = true;
            $data['msg'] = "新用户注册成功=" . $thirdUserId;
            $data['thirdUserId'] = $thirdUserId;
            $data['signedValue'] = $signedValue;
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null : $result['signedValue'];
        }
        return $data;
    }
    /**
     * 可以进行验证手机号码等后续操作
     * @param $userId
     * @param string $phone 验证手机
     * @param int
     * @return array
     * @throws \Exception
     * @author  trendpower
     */
    public function sendVerificationCode($userId, $phone)
    {
        $param["bizUserId"] = (string)$userId;
        $param["phone"] = $phone;
        $param["verificationCodeType"] = 9;//9-绑定手机,6-解绑手机
        $serviceName = 'MemberService';
        $methodName = 'sendVerificationCode';
        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $signedValue = json_decode($result['signedValue'], 1);
            $data['state'] = 'OK';
            $data['signedValue']=$signedValue;
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null : $result['signedValue'];
        }
        return $data;
    }


    /**
     *创建一个普通用户;
     * 可以进行验证手机号码等后续操作
     * @param $userId
     * @param int $memberType 用户类型 2=企业用户 3=个人用户
     * @param int $source 本次终端访问类型 1=mobile 2=pc
     * @return void
     * @throws Exception
     * @author  trendpower
     */
    public function getMemberInfo($userId, $memberType = 3, $source = 1)
    {
        $param["bizUserId"] = (string)$userId;
        $param["memberType"] = $memberType;
        $param["source"] = $source;

        $serviceName = 'MemberService';//MemberService
        $methodName = 'getMemberInfo';//createMember
        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $signedValue = json_decode($result['signedValue'], 1);
            $data['state'] = true;
            $data['msg']=$signedValue;
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null :  $result['signedValue'];
        }
        return $data;
    }

    //查询绑定的银行卡
    public function queryBankCard($openid,$cardNo)
    {
        $openid=$openid;
        $cardNo=$cardNo;//银行卡号。RSA 加密 如为空，则返回用户所有绑定银行卡。

        $bizUserId=$openid;
        $param["bizUserId"] = $bizUserId; //商户系统用户标识，商户系统中唯一编号。
        if(!empty($cardNo)){
            $param["cardNo"] = $this->getEncryptedString($cardNo); // 银行卡号。RSA 加密 如为空，则返回用户所有绑定银行卡。
        }

        $serviceName = 'MemberService';//MemberService
        $methodName = 'queryBankCard';//queryBankCard 查询绑定的银行卡

        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $signedValue = json_decode($result['signedValue'], 1);
            $data['state'] = true;
            $data['signedValue'] = $signedValue;
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null : $result['signedValue'];
        }
        return $data;
    }
    /**
     *消费;
     * @param string $bizUserId
     * @param string $bizOrderNo 订单金额
     * @param int $amount 订单金额 以分为单位
     * @param int $fee 平台手续费 以分为单位
     * @param  string $orderExpireDatetime
     * @param int $source 本次终端访问类型 1=mobile 2=pc
     * @return
     * @throws Exception
     * @author  trendpower
     */
    public function depositApply($bizUserId,$bizOrderNo,$amount,$fee=0, $orderExpireDatetime,$source = 2)
    {
        $param["bizUserId"] = $bizUserId;
        $param["bizOrderNo"] = $bizOrderNo;
        $param["accountSetNo"]=$this->accountSetNo;
        $param["amount"] = $amount;
        $param["fee"] = $fee;
        $param["validateType"]=0;
        $param["frontUrl"]=$this->frontUrl;
        $param["backUrl"]=$this->backUrl;
        $param["orderExpireDatetime"]=$orderExpireDatetime;

        //!!!!********各种支付方式,只需要用一种*******!!!!
        $BALANCE=array(["accountSetNo"=>$this->accountSetNo,"amount"=>$amount]);
        $GATEWAY_VSP=array("gateid"=>"","paytype"=>"B2C","amount"=>$amount);
        $WECHATPAY_MINIPROGRAM=array("limitPay"=>"","amount"=>$amount,"openid"=>"o47GM1ds-9K-o1YAgc8a0HByQSoA");
        $COUPON=array("amount"=>0);
        $VIRTUAL_IN=array("amount"=>$amount,"paysummary"=>"虚拟入金");
        //!!!!!******支付方式定义结束******!!!!!

        $payMethod=array("VIRTUAL_IN"=>$VIRTUAL_IN);
        $param["payMethod"]=$payMethod;
        $param["industryCode"]="1514";//传媒类;
        $param["industryName"]="传媒";
        $param["source"]=$source;
        $serviceName ="OrderService";//MemberService
        $methodName = "depositApply";//createMember
        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $data["sysid"]=$result["sysid"];
            $signedValue = json_decode($result['signedValue'], 1);
            $data["orderNo"]=$signedValue["orderNo"];
            $data["bizUserId"]=$signedValue["bizUserId"];
            $data["bizOrderNo"]=$signedValue["bizOrderNo"];
            $data["status"]=$result["status"];
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null : $result['signedValue'];
        }
        return $data;
    }

    public function  payVirtual($bizUserId,$bizOrderNo){
        $param["bizUserId"] = $bizUserId;
        $param["bizOrderNo"] = $bizOrderNo;
        $param["flag"] = "confirm";
        $param["extPayMethod"] = "VIRTUAL_IN";
        $param["extTradeNo"] ="2100320130120212";
        $param["summary"] = "虚拟通道支付";
        $param["consumerIp"] = "192.168.0.66";
        $serviceName ="OrderService";//MemberService
        $methodName = "payVirtual";//createMember
        $result = $this->request($serviceName, $methodName, $param);
        if ($result && $result['status'] == "OK") {
            $signedValue = json_decode($result['signedValue'], 1);
            return $response=json_encode(["errMsg"=>"request:faild","data"=>$result],320);
        } else {
            $data['state'] = false;
            $data['msg'] = empty($result['signedValue']) ? null : $result['signedValue'];
        }
        return $data;
    }


    /**
     *请求封装
     * @param $service 服务名称
     * @param $method 方法名称
     * @param $param  其他的参数
     * @return 返回类型
     * @throws Exception
     * @author  trendpower
     */
    public function request($service, $method, $param)
    {

        $ssoid = $this->merchantCode;  //商户ID
        if (empty($ssoid)) {
            return null;
        }
        $request["service"] = $service;
        $request["method"] = $method;
        $request["param"] = $param;
        $strRequest = json_encode($request);
        $strRequest = str_replace("\r\n", "", $strRequest);
        $req['req'] = $strRequest;
        $req['sysid'] = $ssoid;
        $timestamp = date("Y-m-d H:i:s", time());
        $sign = $this->sign($ssoid, $strRequest, $timestamp);
        $req['timestamp'] = $timestamp;
        $req['sign'] = $sign;
        $req['v'] = $this->version;
        $serverAddress = $this->requestUrl;
        $result = $this->requestYSTAPI($serverAddress, $req);
        return $this->checkResult($result);
    }

    /*
     * 后台退款申请
     */
    public function backRefund($order_id,$remark)
    {
        $id=$order_id;
        $order=Order::find($id);
        if(!empty($order))
        {
            if(empty($order->cancel_at))
            {
                $refund_money=$order->pay_price;
                if($refund_money>0){
                    $user=User::find($order->user_id);
                    $oriBizOrderNo=$order->order_sn; //商户订单号（支付订单）
                    $bizOrderNo=$order->pay_sn;//商户订单号（支付订单）
                    $bizUserId=$user->openid;
                    $amount=$refund_money*100;//单位：分。不得超过原订单金额。 平台提成20%
                    $couponAmount=0;//代金券退款金额  单位：分不得超过退款总金额，支持部分退款。如不填，则默认为 0。如为 0，则不退代金券。
                    $feeAmount=$order->platform_commission_price*100;//手续费退款金额 单位：分不得超过退款总金额。如不填，则默认为 0。如为 0，则不退手续费。
                    $param["bizOrderNo"] = $bizOrderNo;//商户订单号（支付订单）
                    $param["oriBizOrderNo"] = $oriBizOrderNo;//需要退款的原交易订单号
                    $param["bizUserId"] = $bizUserId; //商户系统用户标识，商户系统中唯一编号。退款收款人。 必须是原订单中的付款方 如果是平台自身，参数值为：#yunBizUserId_B2C#。
                    $param['refundType']="D0";//退款方式 默认 D1   D1：D+1 14:30 向渠道发起退款D0：D+0 实时向渠道发起退款说明1）此参数仅对支持退款金额原路返回的支付订单有效（接口说明 3） （2）不支持退款的渠道及内部账户，
//        $param['refundList']=array();//托管代收订单中的收款人的退款金额 JSONArray  此字段总金额=amount-feeAmount。 （1）原订单为消费接口，不填（2）原订单为简化版代收接口refundList 不填，默认从中间账户至原代收订单付款方，支持全额退款、部分退款；（3）原订单为简化校验版代收接口A -全额退款，refundList 不填，原路径返回（未代付-从中间账户至原代收订单付款方，已代付-从已代付收款人至原代收订单付款方）； B -部分退款，若 refundList 不上送，从中间账户至原代收账户，若refundList上送，指定托管专用账户集，从退款列表会员 bizUserId 及金额amount 退款至代收订单付款方； （4）原订单为标准版托管代收接口全额退款不填，部分退款必填；A-全额退款不填，原路径返回（未代付 -从中间账户至原代收订单付款方，已代付-从已代付收款人至原代收订单付款方）；B-部分退款必填，已代付-填写账户集编号，明确托管专用账户集，从退款列表会员bizUserId及金额amount退款至代收订单付款方，未代付-账户集不上送，默认从中间账户退至代收订单付款方；
//                $param['backUrl']="https://admin.ctstory.net/api/allipay/order/notify_result";//https://admin.ctstory.net/api/wechat/my/order/pay_result config("allipay.backUrl");//后台通知地址 如果不填，则不通知。退款成功时，才会通知。
                    $param['amount']=$amount;//单位：分。不得超过原订单金额。
                    $param['couponAmount']=$couponAmount;//代金券退款金额单位：分不得超过退款总金额，支持部分退款。如不填，则默认为 0。如为 0，则不退代金券。
                    $param['feeAmount']=$feeAmount;//手续费退款金额 单位：分不得超过退款总金额。如不填，则默认为 0。如为 0，则不退手续费。
                    $param['extendInfo']=$remark;//扩展信息
                    $serviceName ="OrderService";
                    $methodName = "refund";
                    $result = $this->request($serviceName, $methodName, $param);
                    if (!$result || $result['status'] != "OK") {
                        $msg="系统繁忙";
                        if(!empty($result['signedValue'])){
                            $msg=$result['message'];
                        }
                        return  json_encode(array("rspStatus"=>-1,"errMsg"=>$msg),320);
                    }
                    $signedValue = json_decode($result['signedValue'], 1);
                }else{
                    $signedValue['orderNo']="8".time();
                }
                //退款交易状态  交易成功
                $refund_time=date("Y-m-d H:i:s",time());//退款交易完成时间
                //开始事务
                DB::beginTransaction();
                //（1）修改订单的取消时间
                $order->cancel_at=$refund_time;//退款交易完成时间
                $order->refund_sn=$signedValue['orderNo'];//退款交易单号
                $order->refund_amount=$refund_money;//退款金额
                $order->refund_remark=$remark;//退款说明
                $order->remark=$remark;//关闭说明
                $order->is_close=1;
                $order->update();
                //（2）更新商家预约时间 、销量
                $book_date=$order->bookdate;
                $period=$order->period;
                $items=OrderMerchant::where("order_id",$id)->get();
                foreach ($items as $item)
                {
                    //更新销量  取消时间
                    $merchant=Merchant::findOrFail($item["merchant_id"]);
                    $sale=$merchant->sale;
                    $merchant->sale=$sale-1;
                    $merchant->save();

                    $order_merchant_obj= OrderMerchant::find($item['id']);
                    $order_merchant_obj->cancel_at=$refund_time;
                    $order_merchant_obj->save();
                    //更新商家预约时间表
                    $book_date=MerchantBookdate::where("merchant_id",$item->merchant_id)->where("bookdate",$book_date)->first();
                    if(!empty( $book_date)){
                        $col_name="period".$period;
                        $t=MerchantBookdate::find($book_date->id);
                        $t->$col_name=0;
                        $t->save();
                    }
                }
                //有使用优惠券 更新优惠券使用状态
                if($order->coupon_id>0){
                    //设置优惠券未使用
                    $user_coupon=UserCoupon::where("user_id",$order->user_id)->where("coupon_id",$order->coupon_id)->first();
                    $user_coupon->used=0;
                    $user_coupon->save();
                }
                try{
                    DB::commit();
                    return  json_encode(array("rspStatus"=>1,"errMsg"=>"退款成功"),320);
                }
                catch (\Exception $e){
                    return  json_encode(array("rspStatus"=>-1,"errMsg"=>"已退款！但程序在更新订单状态时，系统发生了异常"),320);
                }
            }else{
                // 原交易已做过退款交易
                return  json_encode(array("rspStatus"=>-1,"errMsg"=>"原交易已做过退款交易"),320);
            }

        }else{
            //找不到订单
            return  json_encode(array("rspStatus"=>-1,"errMsg"=>"找不到相应的订单信息"),320);
        }
    }

    public function getParam($service, $method, $param){
        $ssoid = $this->merchantCode;  //商户ID
        if (empty($ssoid)) {
            return null;
        }
        $request["service"] = $service;
        $request["method"] = $method;
        $request["param"] = $param;
        $strRequest = json_encode($request);
        $strRequest = str_replace("\r\n", "", $strRequest);
        $req['req'] = $strRequest;
        $req['sysid'] = $ssoid;
        $timestamp = date("Y-m-d H:i:s", time());
        $sign = $this->sign($ssoid, $strRequest, $timestamp);
        $req['timestamp'] = $timestamp;
        $req['sign'] = $sign;
        $req['v'] = $this->version;
        return $req;
    }

    /**
     *对数据进行加密
     * @param $ssoid
     * @param $strRequest
     * @param $timestamp
     * @return 返回类型
     * @author  trendpower
     */
    private function sign($ssoid, $strRequest, $timestamp)
    {
        if (intval($this->version) == 2) {
            $dataStr = $ssoid . $strRequest . $timestamp;
            $text = base64_encode(hash('md5', $dataStr, true));
        } else {
            $text = $ssoid . $strRequest . $timestamp;
        }
        $privateKey = $this->getPrivateKey($this->key_path,$this->key_pwd);

        openssl_sign($text, $sign, $privateKey);
       // openssl_free_key($privateKey);
        $sign = base64_encode($sign);
        return  $sign;
    }

    /**
     *获取私匙的绝对路径;
     * @param 参数1
     * @param 参数2
     * @return 返回类型
     * @author  trendpower
     */
    public function getPrivateKey($path,$pwd)
    {
        return $this->loadPrivateKey($path,$pwd);
    }


    /**
     * 从证书文件中装入私钥 pem格式;
     * @param path 证书路径的绝对路径
     * @param password 证书密码
     * @return 私钥
     * @throws Exception
     */
    private function loadPrivateKey($path, $pwd)
    {

        //判断文件的格式
        $str = explode('.', $path);
        $houzuiName = $str[count($str) - 1];
        if ($houzuiName == "pfx") {
            return $this->loadPrivateKeyByPfx($path, $pwd);
        }

        if ($houzuiName == "pem") {
            $priKey = file_get_contents($path);
            $res = openssl_get_privatekey($priKey, $pwd);
            if (!$res) {
                exit('您使用的私钥格式错误，请检查私钥配置');
            }

            return $res;
        }


    }

    /*
     * RSA加密
     * $data  需要加密的字符串
     */
    public  function getEncryptedString($data)
    {
        $certfile = file_get_contents($this->getPublicKeyPath());
        if (!$certfile) {
            return null;
        }
        $x509 = new  \File_X509();//请自行去github下载;
        $cert = $x509->loadX509($certfile);
        $publicKey = $x509->getPublicKey();

        openssl_public_encrypt($data, $encrypted, $publicKey);
        $encrypted = strtoupper(bin2hex($encrypted));//十六进制字符串（大写）
        return $encrypted;
    }

    function encrypt($data){
        $publicKey = $this->getTLPublicKey();
        openssl_public_encrypt($data, $encrypted, $publicKey);
        $encrypted = strtoupper(bin2hex($encrypted));
        return $encrypted;
    }

    /**
     * 从证书文件中装入私钥 Pfx 文件格式
     * @param path 证书路径
     * @param password 证书密码
     * @return 私钥
     * @throws Exception
     */
    private function loadPrivateKeyByPfx($path, $pwd)
    {
        if (file_exists($path)) {
            $priKey = file_get_contents($path);


            if (openssl_pkcs12_read($priKey, $certs, $pwd)) {
                $privateKey = $certs['pkey'];
                return $privateKey;
            }
            die("私钥文件格式错误");

        }
        die('私钥文件不存在');
    }
    /**
     *请求云商通URL
     * @param 参数1
     * @param 参数2
     * @return 返回类型
     * @author  trendpower
     */
    private function requestYSTAPI($serverUrl, $args)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $serverUrl);
        $sb = '';
        $reqbody = array();
        foreach ($args as $entry_key => $entry_value) {
            $sb .= $entry_key . '=' . urlencode($entry_value) . '&';
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sb);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_AUTOREFERER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-length', count($reqbody)));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    /**
     *检查返回的结果是否合法;
     * @param $result 需要检测的返回结果
     * @return bool
     * @throws Exception
     * @author  trendpower
     */
    private function checkResult($result)
    {

        $arr = json_decode($result, true);

        $sign = $arr['sign'];
        $signedValue = $arr['signedValue'];

        $success = false;
        if ($sign != null) {
            //云商通API 的版本.
            if ($this->version == 2) {

                $success = $this->verify2($this->getPublicKeyPath(), $signedValue, $sign);
            }

            if ($this->version == 1) {
                $success = $this->verify($this->getPublicKeyPath(), $signedValue, $sign);

            }

        }
        if ($success) {
            return $arr;
        }
        return $success;
    }


    /**
     *验证的返回结果的合法性 2.0版本
     * @param $publicKeyPath 公匙所在绝对路径
     * @param $signedValue  返回的数据
     * @param $sign     返回的加密数据
     * @return bool
     * @author  trendpower
     */
    private function verify2($publicKeyPath, $signedValue, $sign)
    {
        $certfile = file_get_contents($publicKeyPath);
        if (!$certfile) {
            return null;
        }
        $x509 = new  \File_X509();//请自行去github下载;
        $cert = $x509->loadX509($certfile);
        $publicKey = $x509->getPublicKey();

        $rsa = new \Crypt_RSA();
        $rsa->loadKey($publicKey); // public key
        $rsa->setSignatureMode(CRYPT_RSA_SIGNATURE_PKCS1);
        $signedValue = base64_encode(hash('md5', $signedValue, true));
        $verifyResult = $rsa->verify($signedValue, base64_decode(trim($sign)));
        return $verifyResult;
    }


    /**
     *验证返回的数据的合法性
     * @param $publicKeyPath 公匙整数所在的绝对路径
     * @param $text
     * @param $sign
     * @return bool
     * @throws Exception
     * @author  trendpower
     */
    private function verify($publicKeyPath, $text, $sign)
    {

        $publicKey = $this->loadPublicKey($publicKeyPath);
        $result = (bool)openssl_verify($text, base64_decode($sign), $publicKey, OPENSSL_ALGO_SHA1);
        openssl_free_key($publicKey);
        return $result;
    }

    /**
     *获取公匙的绝对路径
     * @param 参数1
     * @param 参数2
     * @return 返回类型
     * @author  trendpower
     */
    public function getPublicKeyPath()
    {
        return $this->publicKeyPath;
    }
}


