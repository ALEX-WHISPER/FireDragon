var net = require("net")
var config = require('config');
// var UserManager = require('UserManager');    //  EASON COMMENT
// const EventManager=require('EventManager');  //  EASON COMMENT
// const globalCfg=require('GlobalConfig');     //  EASON COMMENT

var SUCCESS = 1;

//#region  EASON COMMENT
/*
net.OnThreeWayLoginResponse = function(rsp){ 
    if(rsp.result == SUCCESS)
    { 
         net.loginOk = true   
         config.Instance.save();   
         UserManager.User.id = rsp.info.user_dbid;
         UserManager.User.money = Number(rsp.info.Score.money);
         UserManager.User.oldMoney =UserManager.User.money;
         UserManager.User.currentMoney=UserManager.User.money;
         UserManager.User.sex = rsp.info.sex;
         UserManager.User.nick = rsp.info.nickname; 
         UserManager.User.score = rsp.info.Score;  
         UserManager.User.certification = rsp.info.certification; 
        
         //保存本次玩家数据result
         //登录成功查询域;
         net.QueryArenaReq(); 
        //  console.error('返回亲朋验证码',rsp.info.authcode); 
        //  if(rsp.info.authcode && rsp.info.authcode==32)
              
         if(rsp.info.authcode &&  UserManager.User.sLicensekey!=rsp.info.authcode){
            net.confirmAuthCode(rsp.info.authcode); 
         } 
         UserManager.User.sLicensekey=rsp.info.authcode;  
         if(cc.sys.isNative)
            cc.director.getScene().getChildByName('Canvas').getChildByName('LoginLayer').getComponent('LoginLayer').saveNewData(); 
    }
    else
    {   
          //登录失败弹出提示
          cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1004',rsp.error_message);
          cc.director.getScene().getChildByName('Canvas').getChildByName('LoginLayer').getChildByName('Loading').active=false;
    }
}
*/
//#endregion

net.OnAuthCodeConfirmRst=function(rsp){
    //授权返回结果
    if( rsp.result == SUCCESS ){
         
    }else{
        //  cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1004',rsp.message);
    }
}

net.OnFastRegisterResponse = function(rsp){ 
	if( rsp.result == SUCCESS ){
        config.Instance.account = rsp.name;
        config.Instance.pwd = rsp.password;
        if(cc.sys.isNative)
           cc.director.getScene().getChildByName('Canvas').getChildByName('LoginLayer').getComponent('LoginLayer').saveNewData(rsp.name,rsp.password);
        // UserManager.Self().set(rsp.user_id, rsp.nickname); 
        console.log('kuaisuzhucechenggong ',rsp.name, rsp.password);
        // EventManager.Dispatch('fastRegister',rsp.name, rsp.password);    //  EASON COMMENT
    }else{
	    // console.log('kuaisuzhuceshibai');
        cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1004','注册失败,请稍后再试！');  
    }
}  

net.OnGatewayHeartbeat = function(rsp)
{
    net.waitGatewayHeartbeatNum = 0
}

net.OnQueryArenaResponse = function(rsp)
{
    console.log("OnQueryArenaResponse",rsp.arena_info[0].id); 
    net.ArenaId= rsp.arena_info[0].id
    var config=require('config')  
    net.EnterArenaReq(net.ArenaId,config.Version);
}

// 进入arena的返回结果
net.OnUserEnterMCRsp = function(rsp)
{
    console.log("OnUserEnterMCRsp+++++++++++++++++++"+rsp.result)
    if(rsp.result == SUCCESS)
    {
        // if(net.MJroomID != null && net.MJroomID != "")
        // {
        //     net.RoomId = net.MJroomID;
        //     net.MJroomID = "";
        // }

        // net.EnterCustomTableReq(net.RoomId,net.ArenaId)
        net.HallEnterRoomReq();
        //EventManager.Dispatch(EventManager.Type.E_Showroom)
    }
    else
    {
        // UIManager.ShowTip(net.ErrorCode[rsp.result])
    }
}

//#region  EASON COMMENT
/*
net.OnHallEnterRoomRsp = function(rsp){
    console.log('daolezheli')
    if(rsp.ret_code == SUCCESS)
    { 
        net.RoomId = rsp.room_id 
        console.log('进入房间成功')
        net.HallSitInGSReq(UserManager.User.id, rsp.room_id);
    }
    else
    {
         cc.director.getScene().getChildByName('Canvas').getChildByName('LoginLayer').getChildByName('Loading').active=false; 
         if(rsp.ret_code==42){
             return;
         }  
         if(rsp.ret_code==49){ 
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006','您已经被纳入防沉迷系统，是否前往填写防沉迷信息？',function(){
                   
               },function(){
                  //填写信息
                   let url=cc.js.formatStr(globalCfg.tAntiAddictionAddressInfo,UserManager.User.id,UserManager.User.certification);
                   cc.sys.openURL(url); 
              }); 
             return;
         }
         if(net.gameIng && rsp.ret_code==22){
              cc.director.getScene().getChildByName('Canvas').getChildByName('MainLayer').getComponent('Player').resetGame(2);  
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1003','您的账号在其他地方登录,请重新登录'); 
         }else{
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1003',globalCfg.errorCfg[rsp.ret_code]); 
         } 
    }
}
*/
//#endregion

net.OnHallSitInGSRsp = function(rsp)
{ 
    if(rsp.ret_code == SUCCESS)
    { 
        console.log('kaishile 11111')
        net.HallGsReadyReq();
    }
    else
    {
        cc.error("错误001") 
    }
}

net.OnUserEnterTableRsp = function(rsp){
    console.log('+++++++++++++++++++++++++++++++++++++')
    // if(rsp.result == SUCCESS){
    //     console.log('chengggong el ') 
    //      net.HallSitInGSReq(UserManager.User.id, rsp.room_id);
    // } 
}

//#region EASON COMMENT
/*
net.OnSyncMoney = function(rsp)
{
    if(rsp){ 
        if(rsp.Type==0 || rsp.Type==1 ||rsp.Type==2){   
            let jieguo= rsp.Money + rsp.Ratio - (UserManager.User.currentMoney+UserManager.User.pokerAward);  
            let type=0;
            if(rsp.HasFiveCard && rsp.Type==2){
                //卡牌奖励处理  
                type=1; 
                if(jieguo>0)
                   UserManager.User.pokerAward=jieguo;    
            } 
             //击杀怪物同步金币 
            if(UserManager.User.pokerAward>0){
                 UserManager.User.setMoney(UserManager.User.getMoney()-rsp.Ratio);    
            }else{
                 UserManager.User.setMoney(UserManager.User.currentMoney-rsp.Ratio);     
            }
            //特殊处理 如果是金币怪 则同步上个怪结束时金币
            if(UserManager.User.cMonstType==3 && jieguo>0){ 
                // console.log('金币怪',UserManager.User.currentMoney,UserManager.User.pokerAward,rsp.Money)
                if(UserManager.User.pokerAward>0){
                    UserManager.User.setMoney(UserManager.User.currentMoney+UserManager.User.pokerAward);  
                    UserManager.User.pokerAward=0;  
                } 
            }  
            if(UserManager.User.pokerAward>0){
               UserManager.User.currentMoney=rsp.Money-UserManager.User.pokerAward;
               if(UserManager.User.currentMoney<0)
                  UserManager.User.currentMoney=0;  
            }else{ 
                UserManager.User.currentMoney=rsp.Money;   
            } 
            if(jieguo<=0)
            {
                jieguo=0;  
                UserManager.User.setMoney(UserManager.User.currentMoney);
            }else{
                UserManager.User.oldMoney=UserManager.User.currentMoney-jieguo;   
            } 
            let fz=0;
            if(UserManager.User.cMonstType==3 && jieguo>0)
            {
                //如果是前置怪需要计算分值 同步金币 
                fz=Math.round(jieguo/rsp.Ratio);
            } 
            // if(fz>0)
            //    UserManager.User.setMoney(UserManager.User.getMoney()-rsp.Ratio);
            if(rsp.Money<=0){
                UserManager.User.setMoney(0);
                jieguo=0;
                fz=0;
            }   
            // EventManager.Dispatch('synMoney',jieguo,fz,type);    //  EASON COMMENT
            console.log('返回金币'+rsp.Money,jieguo,UserManager.User.getMoney());  
        }else if(rsp.Type==3){ 
              //充值金币送钻石处理
            //   let key=Number(rsp.Money)-UserManager.User.currentMoney; 
              //播放金币雨效果 
              cc.director.getScene().getChildByName('Canvas').getChildByName('AnimationLayer').getComponent('AnimationLayer').playPayGlod();  
              //充值成功
              UserManager.User.setMoney(rsp.Money);  
              UserManager.User.oldMoney=rsp.Money; 
              UserManager.User.currentMoney=rsp.Money; 
        } 
    } 
}
*/
//#endregion

net.OnRefreshUserMoneyRsp=function(rsp){
    //  if(rsp){
    //      UserManager.User.setMoney(Number(rsp.Money)); 
    //      UserManager.User.oldMoney=Number(rsp.Money); 
    //      UserManager.User.currentMoney=Number(rsp.Money); 
    //  }
} 

net.OnSyncSomeOneAdditional=function(rsp){
    //同步卡牌数据
    if(rsp&&rsp.Data){
       if(rsp.Id==globalCfg.respDataId.poker){
           let data=rsp.Data.replace(/&/g,'"');
           console.log(data);
           let obj=JSON.parse(data); 
           for(let key in obj){ 
                if(UserManager.User.beiIndex==Number(key)){ 
                       cc.director.getScene().getChildByName('Canvas').getChildByName('MainLayer').getComponent('Player').addPoker(obj[key] || {});
                } 
                UserManager.User.pokerList[key]=obj[key] || {};
            } 
       }
    }
}

net.OnSyncInitAdditional=function(rsp)
{
    if(rsp){ 
        //同步数据
        UserManager.User.synInitPlayer(rsp.Data); 
        // console.log('登录同步额外数据',rsp.Data); 
        // EventManager.Dispatch('loginSuccess');   //  EASON COMMENT
    } 
}


net.OnSyncInitMoney=function(rsp)
{ 
      console.log('登录同步金币'); 
      if(rsp){ 
           UserManager.User.setMoney(rsp.Money); 
           UserManager.User.oldMoney=rsp.Money;
           UserManager.User.currentMoney=rsp.Money;
      }
}

net.OnResponseGameServerTime=function(rsp)
{
      console.log('登录同步时间'); 
}

net.OnResponseAdditional=function(rsp)
{ 
    
}

net.OnHeartbeat=function(rsp){

}

net.OnUserLogoutRsp=function(rsp){
    console.log('退出成功')
}

net.OnS2CSendMessage=function(rsp){
     //------防沉迷
      if(rsp){ 
           rsp.showTime=Math.min(5,rsp.showTime || 3);
           if(rsp.showType=='1'){
              //显示确认框 
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',rsp.message);  
           }else if(rsp.showType=='2'){
              //防沉迷确认框
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',rsp.message,function(){
                  //跳转到登陆界面 
                   net.loginOk=false;
                   cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').removeAll();
                   cc.director.getScene().getChildByName('Global').getComponent('Function').loginOut(2);
               },function(){
                  //填写信息
                   let url=cc.js.formatStr(globalCfg.tAntiAddictionAddressInfo,UserManager.User.id,UserManager.User.certification);
                   cc.sys.openURL(url);
                    net.loginOk=false;
                    cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').removeAll();
                    cc.director.getScene().getChildByName('Global').getComponent('Function').loginOut(2);
              }); 
           }else{
              cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',rsp.message,null,null,rsp.showTime);   
           }
      } 
}

net.OnRefreshUserDianJuanRsp=function(rsp){
    //同步点券
    if(rsp){  
       UserManager.User.setVolume(Number(rsp.money));  
    } 
}

net.OnNotifyWebChargeSuccess=function(rsp){
     //充值同步
     if(UserManager.User.payId)
     {  
            cc.director.getScene().getChildByName('Canvas').getChildByName('AnimationLayer').getComponent('AnimationLayer').playPayDianjuan();  
            let currntGK=(UserManager.User.bigGuanka-1)*10+UserManager.User.smallGuanka; 
            let gem=globalCfg.BuyGemCfg[UserManager.User.payId];  
            if(currntGK>10){
                    if(UserManager.User.payId=='1001'){ 
                        gem+=(1*Math.pow(1+0.1,currntGK-1))*0.1; 
                    }else if(UserManager.User.payId=='1002'){
                        gem+=(1*Math.pow(1+0.1,currntGK-1))*0.3;
                    }else if(UserManager.User.payId=='1003'){
                        gem+=(1*Math.pow(1+0.1,currntGK-1))*0.6;
                    }else if(UserManager.User.payId=='1004'){
                        // gem+=(1*Math.pow(1+0.1,currntGK-1))*0.9;
                        gem+=(1*Math.pow(1+0.1,currntGK-1))+(1*Math.pow(1+0.1,currntGK))*0.5;
                    }else if(UserManager.User.payId=='1005'){
                        gem+=1*Math.pow(1+0.1,currntGK-1)*(1-Math.pow(1+0.1,2))/(1-(1+0.1));
                    }else if(UserManager.User.payId=='1006'){
                        gem+=1*Math.pow(1+0.1,currntGK-1)*(1-Math.pow(1+0.1,5))/(1-(1+0.1));
                    }else if(UserManager.User.payId=='1007'){
                        gem+=1*Math.pow(1+0.1,currntGK-1)*(1-Math.pow(1+0.1,15))/(1-(1+0.1));
                    }else if(UserManager.User.payId=='1008'){
                        gem+=1*Math.pow(1+0.1,currntGK-1)*(1-Math.pow(1+0.1,40))/(1-(1+0.1));
                    }    
                }   
            //   let addGem=globalCfg.BuyGemCfg[UserManager.User.payId]; 
                UserManager.User.setGemNum(UserManager.User.getGemNum()+Math.round(gem)); 
                cc.director.getScene().getChildByName('Canvas').getChildByName('MainLayer').getComponent('Player').updateGem(); 
                UserManager.User.payId=null; 
            if(Number(rsp.dianJuan)>0 && !UserManager.User.audtoDuiHuan){
                 //弹出提示 时候点劵兑换金币
                 let msg=cc.js.formatStr("恭喜您获得%d点券，是否立即兑换为%d金币",Number(rsp.dianJuan),Number(rsp.dianJuan)*2000);
                 cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',msg,function(){
                    
                 },function(){
                     net.ticketExchangeGoldReq(UserManager.User.id,Number(rsp.dianJuan),function(data){ 
                            if(data){ 
                                let result=JSON.parse(data);
                                if(result.result.value==0){
                                     let msg="兑换成功，获得"+result.result.data.ChargeValue+"金币！";
                                     cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',msg,null,null,2);   
                                }else{
                                     cc.director.getScene().getChildByName('Canvas').getChildByName('WindowLayer').getComponent('WindowLayer').openTips('1006',result.result.message,null,null,2); 
                                } 
                            } 
                       }); 
                 }); 
            }
     }  
}

 

