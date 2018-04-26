cc.Class({
    extends: cc.Component,

    properties: {
        avatar_EnterRoom: cc.Node,
        nickName_EnterRoom: cc.Node
    },

    onLoad: function() {
        this.getUserInfo();
    },

    getUserInfo: function() {
        var self = this;

        wx.getUserInfo({
            withCredentials: true,

            success: function(res) {
                self.userInfo = res.userInfo;
                var nickName = self.userInfo.nickName;
                var language = self.userInfo.language;
                var avatarUrl = self.userInfo.avatarUrl;
                var gender = self.userInfo.gender;
                var country = self.userInfo.country;
                var province = self.userInfo.province;
                var city = self.userInfo.city;

                self.setUserInfo();

                console.log("nickName: " + nickName);
                console.log("province: " + province);
                console.log("language: " + language);
                console.log("avatarUrl: " + avatarUrl);        
            }
        });
    },

    setUserInfo: function() {
        //  set avatar
        var _picUrl = this.userInfo.avatarUrl;
        var nickName = this.userInfo.nickName;
        var self = this;

        cc.loader.load({url:_picUrl, type:"png"},function (err_, tex_) {
                if (err_) {
                cc.error("ResMgr.loadImage load  image failed: ", err_, ", url: ", _picUrl);
                return;
            }
            if (!(tex_ instanceof cc.Texture2D)) {
                cc.error("ResMgr.loadImage jpg image is not instance of Texture2D", typeof(tex_));
                return;
            }
            tex_.width = tex_.height = 128;
            var _frame = new cc.SpriteFrame(tex_);
            self.avatar_EnterRoom.getComponent(cc.Sprite).spriteFrame = _frame;
        });

        //  set nickName
        self.nickName_EnterRoom.getComponent(cc.Label).string = nickName;
    }
});
