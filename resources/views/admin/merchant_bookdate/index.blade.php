<style>
    .fancy{width:600px; height:auto}
    .fancy h3{height:30px; line-height:30px; border-bottom:1px solid #d3d3d3; font-size:14px}
    .fancy form{padding:10px}
    .fancy p{ line-height:28px; padding:4px; color:#999}
    .input{height:20px; line-height:20px; padding:2px; border:1px solid #d3d3d3; width:100px}
    .btn2{-webkit-border-radius: 3px;-moz-border-radius:3px;padding:5px 12px; cursor:pointer}
    .btn_ok{background: #360;border: 1px solid #390;color:#fff}
    .btn_cancel{background:#f0f0f0;border: 1px solid #d3d3d3; color:#666 }
    .btn_del{background:#f90;border: 1px solid #f80; color:#fff }
    .sub_btn{height:32px; line-height:32px; padding-top:6px; border-top:1px solid #f0f0f0; text-align:right; position:relative}
    .sub_btn .del{position:absolute; left:2px}
</style>
<div class="row">
    <div class="col-md-2">
    </div>
    <div class="col-md-8">
        <div id="calendar"></div>
    </div>
    <div class="col-md-2">
    </div>
</div>
<script>
    $(function () {
        $('#calendar').fullCalendar({
            theme:true,
            handleWindowResize:false,
            height:600,
            dayClick: function(date, jsEvent, view) {
            },
            eventClick: function(calEvent, jsEvent, view) {
            }
        });
        $("#sub_event").click(function(){

        });
        $('#del_event').on('click',function(){

        });
    });


    function formatDate(time){
        var date = new Date(time);

        var year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var newTime = year + '-' +
            month + '-' +
            day + ' ' +
            hour + ':' +
            min + ':' +
            sec;
        return newTime;
    }
    function formatStartDate(time){
        var date = new Date(time);
        var year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate();
        if(month<10){month='0'+month.toString()}
        var newTime = year + '-' + month + '-' + day;
        return newTime;
    }
</script>