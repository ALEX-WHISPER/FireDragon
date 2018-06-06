var net = require("net")
var util  = require('util')
var ServerType = net.ServerType
// var UserManager = require('UserManager');    //  E-Comment
// const EventManager=require('EventManager');     //  E-Comment
var md5 = require('MD5') 
net.GatewayHeartbeat = function(){
    var msg = net.MakeMsg("GatewayHeartbeat")
    msg.free = 1;
    net.SendMsg(msg, ServerType.PS, net.RoomId, false)
} 

//登录成功确认绑定
net.confirmAuthCode=function(aAuthCode){  
      var msg = net.MakeMsg("AuthCodeConfirm");
      msg.authcode = aAuthCode;
	//   msg.userID = UserManager.User.id;  //  E-Comment
      net.SendMsg(msg, ServerType.PS);
} 

//房间查询
net.QueryArenaReq = function(){ 
    var msg = net.MakeMsg("QueryArenaRequest")
    msg.game_id = net.GameId
    net.SendMsg(msg, ServerType.PS)
}  

net.QueryUserTableReq = function(){
    console.log("net.QueryUserTableReq")
    var  msg = net.MakeMsg("QueryUserTableReq")
    // msg.user_id = UserManager.Self().id //  E-Comment
    net.SendMsg(msg,ServerType.MC,net.ArenaId)
}

//房间查询
net.QueryArenaReq = function(){ 
    var msg = net.MakeMsg("QueryArenaRequest")
    msg.game_id = net.GameId
    net.SendMsg(msg, ServerType.PS)
}

//查询到arena后，点击发送此请求
net.EnterArenaReq = function (arenaId, gameVersion) {  
    var msg = net.MakeMsg("UserEnterMCReq");
    msg.cur_version = gameVersion.curVersion;
    msg.min_version = gameVersion.minVersion;
    msg.max_version = gameVersion.maxVersion;
    net.SendMsg(msg, ServerType.MC, arenaId);
}; 

net.HallEnterRoomReq= function(){
    var msg = net.MakeMsg("HallEnterRoomReq");
    net.SendMsg(msg,ServerType.MC,net.ArenaId);
}


net.HallSitInGSReq = function (uid, roomId) { 
    var msg = net.MakeMsg("HallSitInGSReq");
    msg.user_dbid = uid;
    net.SendMsg(msg, ServerType.GS, roomId);
};

net.CertificaitonLoginReq = function() { 
    var msg = net.MakeMsg("CertificaitonLoginReq")
    // msg.user_dbid = UserManager.User.id;    //   E-Comment
    // msg.certification =  UserManager.User.certification;    //  E-Comment
    msg.game_id = net.GameId; 
    net.SendMsg(msg, ServerType.PS);
}

net.HallGsReadyReq = function() { 
    console.log('kaishile',net.RoomId)
    var msg = net.MakeMsg("HallGsReadyReq")
    net.SendMsg(msg, ServerType.GS, net.RoomId) 
}

net.RequestAttack = function(score,ratio,type){ 
    var msg = net.MakeMsg("RequestAttack")
    msg.Score = score;
    msg.Ratio = ratio;
    msg.Type = type; 
    net.SendMsg(msg, ServerType.GD,net.RoomId);
} 

//保存数据接口
net.RequestAdditional=function(id,data){
    var msg = net.MakeMsg("RequestAdditional")
    msg.Id = id;
    msg.Data = data; 
    net.SendMsg(msg, ServerType.GD,net.RoomId);
}

//获取服务器时间
net.RequestGameServerTime=function(){
    var msg = net.MakeMsg("RequestGameServerTime");
    msg.bNewTime = true;  
    net.SendMsg(msg, ServerType.GD,net.RoomId);
}

//退出登录 
net.UserLogoutReq=function(){
    var msg = net.MakeMsg("UserLogoutReq");
    // msg.user_dbid = UserManager.User.id;    //  E-Comment
	// msg.certification = UserManager.User.certification; //  E-Comment
	msg.game_id = net.GameId;
	msg.platform = 0;
    net.SendMsg(msg, ServerType.PS,net.RoomId);
}

//退出房间
net.UserQuitArenaReq=function(){
    var msg = net.MakeMsg("UserQuitArenaReq");
    // msg.user_key = {user_dbid:UserManager.User.id};     //  E-Comment
    net.SendMsg(msg,ServerType.MC,net.ArenaId); 
}

//第三方登录
net.PartnerUserLoginReq=function(openid,unionid,access_token,authcode){
     var msg = net.MakeMsg("PartnerUserLoginReq");
     msg.game_id = net.GameId;
     msg.partner_id=1;
     msg.access_token=access_token;
     msg.openid=openid;
     msg.unionid=unionid; 
     msg.mac_address='';
     msg.phy_id='';
     msg.local_ip=0;
     msg.remote_ip=0;
     msg.authcode=authcode||'';
     msg.deviceInfo=util.getDeviceInfo()+'' ;
     msg.platform=2;
     net.SendMsg(msg,ServerType.PS);

} 

//获取微信关联的账号
net.GetLoginNameByPartnerUserIDReq=function(unionid){
     var msg = net.MakeMsg("GetLoginNameByPartnerUserIDReq");
     msg.unionid = unionid;
     msg.partner_id = 1;
     net.SendMsg(msg,ServerType.PS);
} 

//查询微信账号是否可以绑定账号 
net.GetQPUserInfoByParnerUserIDReq=function(unionid){
     var msg = net.MakeMsg("GetQPUserInfoByParnerUserIDReq"); 
     msg.partner_id = 1;
     msg.unionid = unionid; 
     net.SendMsg(msg,ServerType.PS);
} 

//检测是否可以绑定微信 
net.ChangeUserCheckReq=function(accName,pwd,authcode){
     var msg = net.MakeMsg("ChangeUserCheckReq");
     msg.name = accName;
     msg.password = util.PwdMD5(pwd);
     msg.authcode = authcode;
     net.SendMsg(msg,ServerType.PS);
} 

//更换微信绑定的账号
net.PartnerChangeBindReq=function(accName, pwd,userid,lAuthCode){
     var msg = net.MakeMsg("PartnerChangeBindReq");
     msg.partner_id = 1;
    //  msg.openid = UserManager.User.wechatInfo.openid;   //  E-Comment
    //  msg.unionid =UserManager.User.wechatInfo.unionid;  //  E-Comment
    //  msg.access_token = UserManager.User.wechatInfo.access_token;   //  E-Comment
     msg.user_id = userid;
     msg.name = accName;
     msg.authcode = lAuthCode;
     msg.password = util.PwdMD5(pwd);
     net.SendMsg(msg,ServerType.PS);
}  

//点劵兑换
net.ticketExchangeGoldReq=function(userid, ticket,callBack){ 
     let sAddress='http://mapi.qpgame.com/Services/api.ashx'; 
     let handle = "userticketchargecoin";
     let SECURITY_KEY = "E8FE168AD73Fqp*s$yGAME";  
     let sign=handle+userid+ticket+net.GameId+ 0 +SECURITY_KEY;  
     let url = cc.js.formatStr("%s?handle=%s&uid=%d&gameid=%s&ticket=%s&datatype=json&sign=%s&exchangetype=0",
          sAddress, handle, userid, net.GameId, ticket, md5.hex_md5(sign));  
     net.sendRequest(url,callBack);     
} 

net.sendRequest=function(url,callBack){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var result = xhr.responseText;  
                    if(callBack)
                       callBack(result);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
}
