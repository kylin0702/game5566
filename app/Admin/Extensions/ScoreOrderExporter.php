<?php
namespace App\Admin\Extensions;

use Encore\Admin\Grid\Exporters\ExcelExporter;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ScoreOrderExporter extends ExcelExporter implements WithMapping,ShouldAutoSize
{
    protected $fileName ="婚贝订单列表.xlsx";


    protected $columns = [
        'ordersn'   => '订单编号',
        'user_name' => '客户姓名',
        'user_phone' => '联系方式',
        'created_at' => '下单时间',
        'reciver_address' => '收货地址',
        'order_original_amount'=>'婚贝抵用前订单总额',
        'order_allpoint'=>'抵用婚贝',
        'order_offset_amount'=>'婚贝抵用金额',
        'order_amount'=>'婚贝抵用后订单总额',
        'orderstate'=>'订单状态',
        'pay_amount'=>'付款金额',
        'paidtime'=>'付款时间',
        'canceltime'=>'取消时间',
        'refund_sn'=>'退款单号',
        'refund_amount'=>'退款金额',
        'refund_remark'=>'退款说明',
        'deliverytime'=>'发货时间',
        'shippingcode'=>'物流单号',
        'deliverytime'=>'配送时间',
];
    public function map($order): array
    {
        switch ( $order->orderstate){
            case "0":
                $orderstate= "待付款";
                break;
            case "1":
                $orderstate= "待发货";
                break;
            case "2":
                $orderstate= "已发货";
                break;
            case "3":
                $orderstate= "已收货";
                break;
            case "4":
                $orderstate= "已完成";
                break;
            case "5":
                $orderstate= "已评价";
                break;
            case "6":
                $orderstate= "已取消";
                break;
        }


        return [
           ' '.$order->ordersn,
            $order->user_name,
            $order->user_phone,
            $order->created_at,
            $order->reciver_address,
            $order->order_original_amount,
            $order->order_allpoint,
            $order->order_offset_amount,
            $order->order_amount,
            $orderstate,
            $order->pay_amount,
            $order->paidtime,
            $order->canceltime,
            $order->refund_sn,
            $order->refund_amount,
            $order->refund_remark,
            $order->deliverytime,
            $order->shippingcode,
            $order->deliverytime,
        ];
    }

}