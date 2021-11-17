<?php

namespace App\Admin\Controllers;

use App\Match;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;
use Encore\Admin\Facades\Admin;

class MatchController extends Controller
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
            ->header('比赛列表')
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
        $grid = new Grid(new  Match);
        $grid->id('ID')->sortable();
        $grid->title('比赛名称');
        $grid->session('届数');
        $grid->weapon_id('达标装备');
        $grid->weapon_level('达标等级');
        $grid->start_at('比赛开始时间');
        $grid->end_at('比赛结束时间');
        $grid->disableTools()->disableRowSelector()->disableExport();
        $grid->expandFilter();
        $grid->filter(function($filter){
            $filter->disableIdFilter();

            $filter->column(1/2, function ($filter) {
                $filter->between('start_at', "开始时间")->datetime();
            });

            $filter->column(1/2, function ($filter) {
                $filter->between('end_at', "结束时间")->datetime();
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
        $form->text("session","届数")->setWidth(4);
        $form->text("weapon_id","装备ID")->setWidth(4);
        $form->text("weapon_level","达标等级")->setWidth(4);
        $form->datetime('start_at', '比赛开始时间');
        $form->datetime('end_at', '比赛结束时间');
        return $form;
    }
}
