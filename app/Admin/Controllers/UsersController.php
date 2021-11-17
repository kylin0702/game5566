<?php

namespace App\Admin\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Encore\Admin\Admin;
use Encore\Admin\Auth\Database\Administrator;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;
use App\Order;
use Zhusaidong\GridExporter\Exporter;

class UsersController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header('客户列表')
            ->description(' ')
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed   $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header('Detail')
            ->description('description')
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed   $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('Edit')
            ->description('description')
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header('Create')
            ->description('description')
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new User);
        $grid->setName('user');
        $grid->disableActions();
        $grid->disableRowSelector();
        $grid->disableCreateButton()->disableExport();
        $grid->model()->orderBy("id","desc");
        $grid->openid('微信ID');
        $grid->nickName('微信昵称')->display(function ($v ) {
            return empty($v)?"未授权":$v;
        });
        $grid->avatarUrl("头像")->display(function ($v) {
            return empty($v)?"未授权":"<img width='24px' src='$v'/>";
        });
        $grid->level('小枪等级');
        $grid->created_at('第一次登陆时间');
        $grid->updated_at('最后登陆时间');
        $grid->expandFilter();
        $grid->filter(function($filter){
            $filter->disableIdFilter();
            $filter->column(1/2, function ($filter) {
                $filter->like('nickName',"微信昵称");

            });
        });
        $exporter = Exporter::get($grid);
        $exporter->setFileName('商品订单列表.xlsx');
        return $grid;
    }


    /**
     * Make a show builder.
     *
     * @param mixed   $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(User::findOrFail($id));

        $show->id('ID');
        $show->created_at('Created at');
        $show->updated_at('Updated at');

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new User);

        $form->display('id', 'ID');
        $form->display('created_at', 'Created At');
        $form->display('updated_at', 'Updated At');
        $states = [
            'on'  => ['value' => 1, 'text' => '通过审核', 'color' => 'primary'],
            'off' => ['value' => 2, 'text' => '等待审核', 'color' => 'default'],
        ];
        $form->switch("is_merchant","审核商家")->options($states);

        return $form;
    }


}
