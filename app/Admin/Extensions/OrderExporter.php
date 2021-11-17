<?php
namespace App\Admin\Extensions;

use Encore\Admin\Grid\Exporters\ExcelExporter;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class OrderExporter extends ExcelExporter implements WithMapping,ShouldAutoSize
{
    protected $fileName ="订单列表.xlsx";
    protected $columns = [
        'order_sn'   => '订单编号',
        'user_name' => '客户姓名',
        'user_phone' => '联系方式',
        'bookdate' => '活动日期',
        'address' => '活动地点',
        'order_amount'=>'订单总价',
        'coupon_price'=>'优惠券金额',
        'pay_price'=>'支付金额',
        'created_at'=>'下单时间',
        'paid_at'=>'支付时间',
        'confirm_at'=>'确认时间',
        'is_close'=>'是否关闭',
        'remark'=>'备注',

    ];
    public function map($order): array
    {
        return [
           ' '.$order->order_sn,
            $order->user_name,
            $order->user_phone,
            $order->bookdate,
            $order->address,
            $order->order_amount,
            $order->coupon_price,
            $order->pay_price,
            $order->created_at,
            $order->paid_at,
            $order->confirm_at,
            $order->is_close==0?"正常":"订单关闭",
            $order->remark,
        ];
    }

}