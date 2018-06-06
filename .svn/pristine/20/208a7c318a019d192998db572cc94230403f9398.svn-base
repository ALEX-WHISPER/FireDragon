cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function() {
        let loadingBlock = cc.find('Canvas/LoadingBlock');
        let wxLoginBlock = cc.find('Canvas/wxLoginBlock');
        let enterRoomBlock = cc.find('Canvas/EnterRoomBlock');
        // let userCenterBlock = cc.find('Canvas/UserCenterBlock');
        let gamePlayBlock = cc.find('Canvas/GamePlayBlock');
        let mallBlock = cc.find('Canvas/MallBlock');

        if (loadingBlock != null) loadingBlock.active = true; //  加载
        if (enterRoomBlock != null) enterRoomBlock.active = true;   //  选择房间
        if (gamePlayBlock != null) gamePlayBlock.active = true;    //  进入游戏
        if (mallBlock != null) mallBlock.active = true;        //  商城

        if (wxLoginBlock != null) wxLoginBlock.active = false; //  微信登录
        // userCenterBlock.active = false;
    }
});
