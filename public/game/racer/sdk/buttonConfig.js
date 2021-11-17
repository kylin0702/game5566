//按钮配置 visible 是否显示 type 按钮操作类型数组 0 分享 1 视频，按数组循环切换,count 当前点击次数
window.wbeLogin.buttonConfig = {
    bisaijiesuan:{ visible: !0, type: [1],count:0 },//比赛结算 三倍
    bisaipaiming:{ visible: !1, type: [1],count:0 },//限时奖励
    bisaipaimingshuangbeijiangli:{ visible: !1, type: [1],count:0 },//限时双倍
    daoju:{ visible: !0, type: [0,1],count:0 },//商城道具折扣
    goumaisaiche:{ visible: !0, type: [0,1],count:0 },//购买赛车折扣
    mianfeibaoxianglingqu:{ visible: !0, type: [1],count:0 },//免费宝箱领取
    mianfeidaojuqinglinqu:{ visible: !0, type: [1],count:0 },//免费道具领取
    mianfeihaochelingqu:{ visible: !0, type: [1],count:0 },//免费赛车领取
    saiqianjiasu:{ visible: !0, type: [0],count:0 },//赛前加速
    shangchengdaoju:{ visible: !1, type: [0],count:0 },//免费商城道具
    shangchengshengjisaiche:{ visible: !1, type: [0],count:0 },//免费商城升级
    shengjisaiche:{ visible: !0, type: [0,1],count:0 },//商城升级折扣
    shengyazhuangbeidaoju:{ visible: !1, type: [0],count:0 },//生涯道具免费
    xingyunzhuanpan:{ visible: !0, type: [1],count:0 },//幸运转盘额外次数
    xingyunzhuanpanshuangbeilingqu:{ visible: !0, type: [0],count:0 },//幸运转盘双倍领取
    xuanyaoyixia:{ visible: !0, type: [0],count:0 },//炫耀一下
    zhuangbeidaoju:{ visible: !0, type: [0,1],count:0 },//生涯道具折扣
    zhuanpanmianfeichoujiang:{ visible: !1, type: [0],count:0 },//通关幸运转盘
    zhujiemianqiandao:{ visible: !0, type: [0],count:0 },//签到双倍
}