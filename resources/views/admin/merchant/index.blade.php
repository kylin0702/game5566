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
<div class="box box-danger">
    <div class="box-body">
        <form class="form-inline" action="" method="get">
            <div class="form-group">
                <label for="name"><i class="fa fa-user"></i> 商户名称</label>
                <input type="text" class="form-control" name="title" placeholder="请输入客户名称">&nbsp;&nbsp;
                <label for="review"><i class="fa fa-briefcase"></i> 商户类型</label>
                <select name="type" class="form-control">
                    <option value="">全部</option>
                    @foreach ($type as $t)
                    <option value="{{$t->id}}">{{$t->title}}</option>
                        @endforeach
                </select>&nbsp;
                <label for="review"><i class="fa fa-github"></i>猜你喜欢</label>
                <select name="also_like" class="form-control">
                    <option value="">全部</option>
                    <option value="0">不出现在猜你喜欢中</option>
                    <option value="1">随机出现在猜你喜欢中</option>
                    <option value="2">固定出现在猜你喜欢中</option>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <button type="submit" class="btn btn-success">搜索</button>&nbsp;
            <a href="/admin/merchants" type="button" class="btn btn-default">取消</a>
            <span class="pull-right"><a href="/admin/merchants/create" class="btn btn-success" type="button"><i class="fa fa-plus"></i>新增商户</a></span>

        </form>
    </div>
</div>
@foreach ($merchants as $v)
    <div class="box box-default collapsed-box">
        <div class="box-header with-border">
            <h4 class="box-title" ><a data-widget="collapse" data-merchant_id="{{$v->id}}" id="h4a{{$v->id}}">{{$v->type->title}}-{{$v->title}}</a></h4>
            <div class="box-tools ">
                <a href="/admin/merchants/{{$v->id}}/edit" class="btn btn-sm btn-info" type="button"><i class="fa fa-edit"></i>修改信息</a>
                <a href='javascript:void(0)' data-id="{{$v->id}}" data-type="{{$v->type_id}}" class="btn btn-google btn-sm btn-tag-modal" data-toggle="modal" data-target="#tagModal" ><i class="fa fa-tags" data-toggle="modal" ></i>标签设置</a>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <div class="col-lg-1">
                    <a href='/admin/suits/create?merchant_id={{$v->id}}' class="btn btn-success btn-sm" ><i class="fa fa-plus"></i>新增套餐</a>
                </div>
                <div class="col-lg-2"><i class="fa fa-user"></i> 名称:{{$v->title}}</div>
                <div class="col-lg-2"><i class="fa fa-mobile"></i> 联系方式:{{$v->phone}}</div>
                <div class="col-lg-2"><i class="fa fa-calendar-check-o"></i>添加时间:{{date("Y-m-d",strtotime($v->created_at))}}</div>
                <div class="col-lg-3">
                    <form class="form-inline" action="" method="get">
                        <b>猜你喜欢:</b>
                        <input id="r1" data-merchant_id="{{$v->id}}" type="radio" name="also_like" value="0" @if($v->also_like==0){{"checked"}}@endif /><label for="r1">不出现</label>
                        <input id="r2" data-merchant_id="{{$v->id}}"   type="radio" name="also_like" value="1" @if($v->also_like==1){{"checked"}}@endif  /> <label for="r2">随机出现</label>
                        <input id="r3" data-merchant_id="{{$v->id}}"  type="radio" name="also_like" value="2" @if($v->also_like==2){{"checked"}}@endif   /> <label for="r3">固定出现</label>
                    </form>
                </div>
                <div class="col-lg-2">
                    <form class="form-inline" action="" method="get">
                        <b>置顶:</b>
                        <input id="r4" data-merchant_id="{{$v->id}}" type="radio" name="recommended" value="0" @if($v->recommended==0){{"checked"}}@endif /><label for="r4">否</label>
                        <input id="r5" data-merchant_id="{{$v->id}}"   type="radio" name="recommended" value="1" @if($v->recommended==1){{"checked"}}@endif  /> <label for="r5">是</label>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-responsive table-bordered table-condensed">
                        <thead>
                        <th>套餐编号</th>
                        <th>套餐名称</th>
                        <th>套餐内容</th>
                        <!--syz 20190725 add start-->
                        <th>原价</th>
                        <!--syz 20190725 add end-->
                        <th>价格</th>
                        <!--syz 20190826 add start-->
                        <th>平台提成</th>
                        <!--syz 20190826 add end-->


                        <!--syz 20190725 update start-->
                        <!--
                        <th>性别</th>
                        <th>桌数</th>
                        -->
                        <!--syz 20190725 update end-->
                        <th colspan="2">随心配</th>
                        <th class="hidden">添加时间</th>
                        <th  class="hidden">修改时间</th>
                        <th>操作</th>
                        </thead>
                        <tbody class="suit"></tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.box-body -->
    </div><!-- /.box -->
@endforeach
{!! $merchants->appends(request()->input())->render() !!}
<!-- 状态Modal -->
<div class="modal fade" id="tagModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document" style="width: 800px;">
        <div class="modal-content" id="app">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <!-- tag-select -->
            <div class="modal-body " style="overflow: hidden;max-height: 800px;overflow-y: auto;">
                <!-- <select class="tag-select" multiple="true"></select> -->
            </div>
            <div class="modal-footer">
                <!-- data-dismiss="modal" -->
                <button type="button" class="btn btn-success btn-submit" >确定</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>


<script>
    $("[data-widget='collapse']").on('click',function(){
        var collapse=$(this);
        var merchant_id=$(this).attr("data-merchant_id");
        var content=$(this).parents('.collapsed-box').find('.suit');
        content.html("<tr><td colspan='6'><span class='shake'> 数据加载中... </span></td></tr>");
        $.get("/admin/merchants/getSuit", {merchant_id: merchant_id}, function (r) {
            var data=r.data;
            var suit = "";
            $(data).each(function (i, e) {
                var gender=(e.gender==1?'男':'女');
                var popup='';
                switch (e.popup) {
                    case 0:
                        popup='<select><option value="0" selected>不参与</option> <option value="1" >红区</option><option value="2" >白区</option> </select>';
                        break;
                    case 1:
                        popup='<select><option value="0" >不参与</option><option value="1" selected>红区</option> <option value="2" >白区</option> </select>';
                        break;
                    case 2:
                        popup='<select><option value="0">不参与</option><option value="1" >红区</option><option value="2" selected>白区</option> </select>';
                        break;
                    default:
                        popup='<select><option value="0" selected>不参与</option><option value="1" >红区</option><option value="2" >白区</option> </select>';
                        break;
                }
                suit += "<tr>";
                suit += "<td>" + e.code + "</td>";
                suit += "<td>" + e.title + "</td>";
                suit += "<td style='width: 60%'>" + e.content + "</td>";
                <!--syz 20190725 add start-->
                suit += "<td>" + e.original_price + "元</td>";
                <!--syz 20190725 add end-->
                suit += "<td>" + e.price + "元</td>";
                <!--syz 20190826 add start-->
                suit += "<td>" + e.platform_commission + "%</td>";
                <!--syz 20190826 add end-->


                <!--syz 20190725 update start-->
                //suit += "<td>" +gender + "</td>";
               // suit += "<td>" + e.desk + "</td>";
                <!--syz 20190725 update end-->
                suit += "<td>"+popup+"</td>";
                suit+="<td><button  type='button' class='btn btn-box-tool' data-suit_id='"+e.id+"'>更改</button></td>";
                suit += "<td class='hidden'>" + e.created_at + "</td>";
                suit += "<td class='hidden'>" + e.updated_at + "</td>";
                suit += "<td>" +
                    "<a href='javascript:void(0);' class='btn btn-sm btn-danger btn-del' data-suit_id='"+e.id+"'>删除</a>&nbsp;&nbsp;"+
                    "<a href='/admin/suits/"+e.id+"/edit' class='btn btn-sm btn-microsoft' >修改</a>&nbsp;&nbsp;"+
                    "<a href='javascript:void(0);' class='btn btn-sm btn-info' data-toggle='modal' data-target='#myModal'  onclick='getStatus(this)'>详细状态</a></td>";
                suit += "</tr>";
            });
            content.html(suit);

            //设定是否参与随心配
            $('.btn-box-tool').click(function(){
                var that=this;
                var id=$(that).attr('data-suit_id');
                var popup=$(this).parent("td").prev('td').find("select").val();
                $.post('/admin/merchants/setSuit/'+id,{popup:popup, _token:'{{csrf_token()}}'},function(data){
                    alert("设置成功!");
                    collapse.trigger('click');
                    window.setTimeout(function () {
                        collapse.trigger('click');
                    },1000);
                });
            });

            //删除套餐
            $('.btn-del').click(function() {
                var that = this;
                var id = $(that).attr('data-suit_id');
                swal({
                    title: "确定删除此套餐?",
                    showCancelButton:true,
                    cancelButtonText: '取消'
                }).then((result) => {
                        if (result.value) {
                            $.post('/api/wechat/merchant/del_suit/' + id, function (data) {
                                swal("删除成功!");
                                collapse.trigger('click');
                                window.setTimeout(function () {
                                    collapse.trigger('click');
                                }, 1000);
                            });
                        }
                    });
            });
        }, "json");
    });
    //设置标签
    $('.btn-tag-modal').on('click',function(){
        var that=this;
        var id=$(that).attr("data-id");
        var data="";
        var tag=[]; //已选择的标签数组
        var options ="";
        $('.btn-submit').attr('id',id);
        $("#tagModal").find("h4").html('标签设置');
        $("#tagModal b").html('标签设置');
        $.get("/api/wechat/merchant/merchant_and_type/"+id,function (r) {
            $(".modal-body").empty();
            data=r.merchant_type.extra;
            tag=r.merchant.tag; //已选择的标签数组
            $(data).each(function(i,e){
                $(e).each(function(i,e){
                    var value =  e.value.split(',');
                    options  += '<select id="'+e.slug+'" type="'+e.type+'" multiple="multiple"  size="4"   class="col-md-12 form-control tag-select" style="margin-top:15px">';
                    for(var i=0; i<value.length; i++){
                        if(tag != null){
                            $(tag).each(function(index,d){
                                if(d.slug == e.slug){
                                    if(d.value !=  null){
                                        if(d.value.indexOf(value[i]) != '-1'){
                                            options  += '<option selected>'+value[i]+'<\/option>';
                                        }else{
                                            options  += '<option>'+value[i]+'<\/option>';
                                        }
                                    }else{
                                        options  += '<option>'+value[i]+'<\/option>';
                                    }
                                }
                            });
                        }else{
                            options  += '<option>'+value[i]+'<\/option>';
                        }

                    }
                    options += '<\/select>';
                });
            });
            $(".modal-body").html(options);
            $(".tag-select").bootstrapDualListbox({});
        },"json");

        $('#btn-confirm').on('click',function(){
            $.ajax({
                url:"/api/merchant/tag?id="+1,
                method:"get",
                success:function (data) {
                    if(data.status){
                        alert(data.message);
                        $("#tagModal").find(".close").trigger('click');
                        collapse.trigger('click');
                        window.setTimeout(function () {
                            collapse.trigger('click');
                        },1000);
                    }
                }
            });
        });
    });
    $('.btn-submit').click(function(){
        var id=$(this).attr("id");
        var data = {};
        data.tag = [];
        $(".tag-select").each(function(){
            var list = {};
            list.slug = $(this).attr('id');
            list.type = $(this).attr('type');
            list.value = $(this).val();
            data.tag.push(list);

        });
        $.ajax({
            url:"/api/wechat/merchant/update_tag/"+id,
            method:"post",
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success:function (data) {
                alert('标签设置成功');
                window.setTimeout(function () {
                    $("#tagModal").find(".close").trigger('click');
                },1000);
            }
        });
    });
    //设置置顶
    $('input[name="recommended"]').on('click',function(){
        var id=$(this).attr("data-merchant_id");
        var value=$(this).val();
        $.ajax({
            url:"/api/wechat/merchant/recommended/"+id,
            method:"post",
            data:{"value":value},
            dataType:"json",
            success:function (data) {
                if(data.errMsg=="request:ok"){
                    alert('设置成功');
                }
                else{
                    alert(data.data);
                }

            }
        });
    });
    //设置猜你喜欢
    $('input[name="also_like"]').on('click',function(){
        var id=$(this).attr("data-merchant_id");
        var value=$(this).val();
        $.ajax({
            url:"/api/wechat/merchant/also_like/"+id,
            method:"post",
            data:{"value":value},
            dataType:"json",
            success:function (data) {
                if(data.errMsg=="request:ok"){
                    alert('设置成功');
                }
                else{
                   alert(data.data);
                }

            }
        });
    });
    //时间格式化
    function formatMinutes(StatusMinute){
        var day=parseInt(StatusMinute/60/24);
        var hour=parseInt(StatusMinute/60%24);
        var min= parseInt(StatusMinute % 60);
        StatusMinute="";
        if (day > 0)
        {
            StatusMinute= day + "天";
        }
        if (hour>0)
        {
            StatusMinute += hour + "小时";
        }
        if (min>0)
        {
            StatusMinute += parseFloat(min) + "分钟";
        }
        return StatusMinute;
    }


</script>

