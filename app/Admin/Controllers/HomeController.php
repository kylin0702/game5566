<?php

namespace App\Admin\Controllers;
use App\Device;
use App\UserDriver;
use App\Order;
use App\Fare;
use App\Withdraw;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\Dashboard;
use Encore\Admin\Layout\Column;
use Encore\Admin\Layout\Content;
use Encore\Admin\Layout\Row;
use Encore\Admin\Widgets\Box;
use Encore\Admin\Widgets\InfoBox;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Auth\Permission;

class HomeController extends Controller
{
    public function index(Content $content)
    {
       if(Admin::user()->isRole('administrator')){
          return $this->admin();
       }
       else if(Admin::user()->isRole('teamleader')){
        return $this->teamleader();
       }
       else if(Admin::user()->isRole('cityleader')){
        return $this->cityleader();
       }
       else{
        $content=new Content;
        return $content
            ->header("信息面板")
            ->row(Dashboard::title())
            ->row(function (Row $row) {
                $row->column(3, function (Column $column) {

                });

            });
       }


    }

    protected function admin(){
        $content=new Content;
        return $content
            ->header("信息面板")
            ->row(Dashboard::title())
            ->row(function (Row $row) {
                $row->column(3, function (Column $column) {
                    // $withdraw_count=Withdraw::where("driver_id",1)->where("withdraw_status","un_withdraw")->count();
                    // $count=Device::all()->count();
                    // $infoBox = new InfoBox('设备总数', 'cube', 'purple', '/admin/devices', $count."台");
                    // $column->append($infoBox);
                });
               
            });
    }
    
}
