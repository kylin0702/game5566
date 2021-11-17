<style>
    @-webkit-keyframes shake{
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }@keyframes shake{
         0%{
             opacity: 1;
         }
         50%{
             opacity: 0.5;
         }
         100%{
             opacity: 1;
         }
     }
    .shake{
        -webkit-animation: shake 2s infinite;
        animation: shake 2s infinite;
    }
</style>

    <div id="app" class=" ">
        <section class="content"><div class="row"><div class="col-md-12">
                    <div class="box box-info">
                        <div class="box-header with-border">
                            <h3 class="box-title">编辑</h3>

                            <div class="box-tools">
                                <div class="btn-group pull-right" style="margin-right: 5px">
                                    <a href="/admin/orders/422" class="btn btn-sm btn-primary" title="查看">
                                        <i class="fa fa-eye"></i><span class="hidden-xs"> 查看</span>
                                    </a>
                                </div>
                                <div class="btn-group pull-right" style="margin-right: 5px">
                                    <a href="/admin/orders" class="btn btn-sm btn-default" title="返回列表"><i class="fa fa-list"></i><span class="hidden-xs">&nbsp;返回列表</span></a>
                                </div>
                            </div>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <form action="" method="post" accept-charset="UTF-8" class="form-horizontal" pjax-container="">
                            <div class="box-body">
                                <div class="fields-group">
                                    <div class="form-group ">
                                        <label class="col-sm-2  control-label">订单编号</label>
                                        <div class="col-sm-8">
                                            <div class="box box-solid box-default no-margin">
                                                <!-- /.box-header -->
                                                <div class="box-body">{{$orderinfo->order_sn}}&nbsp;</div>
                                                <!-- /.box-body -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <label class="col-sm-2  control-label">客户姓名</label>
                                        <div class="col-sm-8">
                                            <div class="box box-solid box-default no-margin">
                                                <!-- /.box-header -->
                                                <div class="box-body">{{$orderinfo->user_name}}&nbsp;</div>
                                                <!-- /.box-body -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <label class="col-sm-2  control-label">联系方式</label>
                                        <div class="col-sm-8">
                                            <div class="box box-solid box-default no-margin">
                                                <!-- /.box-header -->
                                                <div class="box-body">{{$orderinfo->user_phone}}&nbsp;</div>
                                                <!-- /.box-body -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <label class="col-sm-2  control-label">下单时间</label>
                                        <div class="col-sm-8">
                                            <div class="box box-solid box-default no-margin">
                                                <!-- /.box-header -->
                                                <div class="box-body">{{$orderinfo->created_at}}&nbsp;</div>
                                                <!-- /.box-body -->
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group ">
                                        <label class="col-sm-2  control-label">订单关闭</label>
                                        <div class="col-sm-8">
                                                <!-- /.box-header -->
                                                <div class="box-body"><input type="radio" name="is_close" value="0" checked="checked" />&nbsp;正常&nbsp;&nbsp;<input type="radio" name="is_close" value="1" />&nbsp;关闭&nbsp;&nbsp;</div>
                                                <!-- /.box-body -->
                                        </div>
                                    </div>


                                    <div class="form-group">
                                        <label for="remark" class="col-sm-2  control-label">备注</label>
                                        <div class="col-sm-8">
                                            <textarea name="remark" id="remark" class="form-control remark" value="{{$orderinfo->remark}}" rows="5" placeholder="输入 备注">{{$orderinfo->remark}}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box-body -->
                            <div class="box-footer">
                                <div class="col-md-8">
                                    <div class="btn-group pull-right">
                                        <input type="hidden" id="order_id" value="{{$orderinfo->id}}"/>
                                        <button type="button" class="btn btn-primary" id="btn-submit">确定</button>
                                    </div>
                                    <div class="btn-group pull-left">
                                        <button type="reset" class="btn btn-warning">撤销</button>
                                    </div>
                                </div>
                            </div>
                        <!-- /.box-footer -->
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
<script>
    //设置置顶
    $('#btn-submit').click(function(){
        var is_close=$('input[name="is_close"]:checked').val();
        var order_id=$("#order_id").val();
        var remark=$("#remark").val();
        $.ajax({
            url:"/admin/order/cancel_order_pay",
            method:"post",
            data:{"is_close":is_close,"id":order_id,"remark":remark ,'_token':'{{csrf_token()}}'},
            dataType:"json",
            success:function (data) {
                alert(data.errMsg);
                if(data.rspStatus=="1"){
                    window.location.href='/admin/orders';
                }
            }
        });
    });
</script>

