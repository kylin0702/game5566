<?php

namespace App\Admin\Controllers;

use App\MatchUser;
use App\User;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;
use Encore\Admin\Facades\Admin;

class MatchUserController extends Controller
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
            ->header('参赛选手列表')
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
            ->header('查看比赛详情')
            ->description(' ')
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
            ->header('修改比赛信息')
            ->description(' ')
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
            ->header('添加比赛')
            ->description(' ')
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new  MatchUser);
        $grid->model()->orderBy("id","desc");
        $grid->match()->session("届数");
        $grid->match()->title("比赛名称");
        $grid->openid('openid');
        $grid->user()->nickName("选手昵称")->display(function($v){
            return empty($v)?"未授权":$v;
        });
        $grid->weapon_id('达标装备');
        $grid->weapon_level('达标等级');
        $grid->group('所在分组');
        $grid->disableTools()->disableRowSelector()->disableExport();
        $grid->expandFilter();
        $grid->disableActions();
        $grid->filter(function($filter){
            $filter->disableIdFilter();
            $filter->column(1/2, function ($filter) {
                $filter->equal('match_id',"比赛名称")->select(MatchUser::all()->pluck("title","id"));
            });

            $filter->column(1/2, function ($filter) {
                $filter->equal('openid',"选手昵称")->select(User::all()->pluck("nickName","openid"));
            });

        });
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
        $obj=Match::findOrFail($id);
        $show = new Show( $obj);
        $show->id('ID');
        $show->type_name('分类名称');
        $show->created_at('添加时间');
        $show->updated_at('修改时间');
        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new  Match);
        $form->display('id', 'ID');
        $form->text("title","比赛名称")->setWidth(4);
        $form->text("weapon_id","装备ID")->setWidth(4);
        $form->text("weapon_level","达标等级")->setWidth(4);
        $form->datetime('start_at', '比赛开始时间');
        $form->datetime('end_at', '比赛结束时间');
        return $form;
    }
}
