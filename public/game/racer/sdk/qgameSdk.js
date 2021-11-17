var kingnet_opensdk = window.kingnet_opensdk//require("src/sdk/kingnet_opensdk.js");
// var kingnet_opensdk = window.kingnet_opensdk//
console.log("kingnet_opensdk",kingnet_opensdk)
console.log("kingnet_opensdk",window.kingnet_opensdk)
var platform = kingnet_opensdk.platform.QIMAO
class qgameSdk{
    constructor(){
    }
    init(){
        kingnet_opensdk.init({
                appid:"10014",//必填
                platform:platform,//必填
                success:function(res){//非必填
                    console.log("init sdk1",res)
                },
                fail:function(res){//非必填
                console.log("init sdk2",res)
                }
            }); 
    }
    login(success){
        //登录
        kingnet_opensdk.login({
            success:function(res){//非必填
                success && success(res.info)
            },
            fail:function(res){//非必填
            }
        }); 
    }
    showVideo(callback,failCallback,errorCallback){
        
        kingnet_opensdk.show_video({
            source:"tools",
            onload:function(res){
                //加载成功
            },
            onerror:function(res){
                //播放出错
                errorCallback&&errorCallback()
            },
            onclose:function(res){
                //未播放完成关闭
                failCallback&&failCallback()
            },
            onfinish:function(res){
                //播放完成
                callback&&callback()
            }
        });
    }
    showInterstitialAd(callback){
        //插屏广告
        // kingnet_opensdk.show_interstitial_ad({
        //     onload:function(res){
        //         //加载成功
        //         callback && callback()
        //     },
        //     onerror:function(res){
        //         //播放出错
        //         callback && callback()
        //     }
        // });
        callback && callback()
    }
    showBanner(obj){
        //banner广告
        kingnet_opensdk.show_banner(obj);
    }
    hideBanner(){
        kingnet_opensdk.hide_banner(); 
    }
    enterMain(){
        kingnet_opensdk.report_enter_game(); 
    }
    createRole(){
        kingnet_opensdk.report_create_role(); 
    }
    loaded(){
        kingnet_opensdk.init({
            appid:"10014",//必填
            platform:kingnet_opensdk.platform.QIMAO,//必填
            success:function(res){//非必填
                console.log("init sdk1",res)
                kingnet_opensdk.report_js_loaded(); 
            },
            fail:function(res){//非必填
            console.log("init sdk2",res)
            }
        }); 
    }
}
window.qgameSdk =  new qgameSdk()
window.apiNetIp = "https://h5game.hanchor.cn"
window.kingnet_opensdk_platform = "qimao"
window.kingnet_opensdk_buttonConfig = "https://minigame.hanchor.cn/qmfc3d/qimao/10305/ButtonConfig.json"
window.kingnet_opensdk_serverList = "https://minigame.hanchor.cn/qmfc3d/qimao/10305/ServerList.json"
// window.kingnet_opensdk_platform = "iqiyi"
// window.kingnet_opensdk_platform = "vivox"