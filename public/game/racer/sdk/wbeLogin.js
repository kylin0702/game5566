class wbeLogin{
    constructor() {
        this.isBeInvited = true
        
        this.baseUrl = 'https://h5game.hanchor.cn';
    }
    /** 
     * 监听通过分享进入游戏，获取透传的参数
     * @param {} data 透传的参数
     * 
    */
   onStartGameWithInvitation(data){
        console.log("onStartGameWithInvitation = ",data)
        this.isOnStart = "isOnStart1"
        if(data.parameters){
            this.startGameType = data.parameters.type
            this.startGameData = data.parameters.data
        }
    }
    /** 
     * 监听是否可以被邀请
     * @return {Boolean} 是否可以被邀请
     * 
    */
    onInviteableCheck(){
        return this.isBeInvited
    }
    /** 
     * 设置是否可以被邀请
     * @param {Boolean} isBeInvited 是否可以被邀请
     * 
    */
    setBeInvited(isBeInvited){
        this.isBeInvited = isBeInvited
    }
    /** 
     * 监听app邀请返回
     * 
    */
    onSendGameInvite(){
        console.log("监听app邀请返回")
        var sendGameInviteCallback = this.sendGameInviteCallback 
        this.sendGameInviteCallback = null
        if(sendGameInviteCallback){
            sendGameInviteCallback()
        }
    }
    /** 
     * 登陆
     * @param {function}  success 成功回调
     * @param {function}  fail 失败回调
     * @param {function}  complete 完成回调
     * 
    */
    login(success,fail,complete)
    {
        uni.login({
            success:function (res) {
                console.log(res)
                // fillField("nameField", "已登录，nickName:" + res["userInfo"]["nickName"] + " gameName:" + uni.gameName);
                success && success(res)
            },
            fail:function (res) {
                // alert(res["code"] + "\n" + res["message"]);
                fail && fail(res)
            },
            complete:function () {
                complete && complete()
            },
            timeout:5000,
			//在测试app中登录后，将debug_scookie改为app中显示的Cookie，将debug_uid改为app中显示的UID，即可模拟app登录，直接在PC中调试大部分接口
            // debug_scookie:"1205954|844d6fa9a07cb364a77d31392e80000dea3a9230|1|c53e43483e3a21404cf5e0c012fd1d43",
            // debug_uid:"1205954",
            
            debug_scookie:"1194741|660a86f39f0fe002fd52bd050a10911fc9e313a2|1|5d7f046ea3475654957440d9dc1cdbf6",
			debug_uid:"1194741"
        });
    }
    /** 
     * 获取后台记录游戏数据
     * @param {function}  success 成功回调
     * @param {function}  fail 失败回调
     * @param {function}  complete 完成回调
     * 
    */
    getArchivedProfile1(success,fail,complete){
        uni.getArchivedProfile({
			idx:0,
			success:function (res) {
				console.log(res["data"]);
            }
		})
        // uni.getArchivedProfile({idx:1,success:function (idx,data) {
        //     console.log(data)
        //     // fillField("nameField", "已登录，nickName:" + res["userInfo"]["nickName"] + " gameName:" + uni.gameName);
        //     success && success(data)
        // },
        // fail:function () {
        //     // alert(res["code"] + "\n" + res["message"]);
        //     fail && fail()
        // },
        // complete:function () {
        //     complete && complete()
        // }})
    }
    /** 
     * 后台记录游戏数据
     * @param {object}  data 游戏数据
     * @param {function}  success 成功回调
     * @param {function}  fail 失败回调
     * @param {function}  complete 完成回调
     * 
    */
    archiveProfile(data,success,fail,complete){
        uni.archiveProfile({idx:0,data:data,success:function (idx,data) {
            console.log(data)
            success && success(data)
        },
        fail:function () {
            fail && fail()
        },
        complete:function () {
            complete && complete()
        }})
    }
    /** 
     * 后台反馈
     * 
    */
    feedback(){
        uni.feedback()
    }
    /** 
     * 查看玩家信息
     * @param {string} uid 玩家id
    */
    viewProfile(uid) {
        uni.viewProfile(uid)
    }
    /** 
     * 获取排行榜
     * 
    */
    getMonthRanking(){
        uni.getMonthRanking({})
    }
    /** 
     * 退出游戏
     * 
    */
    exit(){
        uni.exit()
    }
    /** 
     * 获取按钮配置
     * @return buttonConfig
    */
    getButtonConfig(){
        return this.buttonConfig
    }
}
window.wbeLogin =  new wbeLogin()