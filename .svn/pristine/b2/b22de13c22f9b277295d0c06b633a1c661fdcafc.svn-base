cc.Class({
    extends: cc.Component,

    properties: {
        wxUserInfoControl: require("wxUserInfoDisplay")
    },

    onLoad: function() {
        // if (this.node.parent.getChildByName('wxLoginPanel') != null) {
        //     this.node.parent.getChildByName('wxLoginPanel').active = false;
        // }
    },

    onWxLogin: function() {
        if (cc.sys.isBrowser) {
            this.wxLoginSuccessCallBack();
        } else if (cc.sys.WECHAT_GAME) {
            this.wxAuthorize();
        }
    },

    wxAuthorize: function() {
        var self = this;
        wx.authorize({
            scope: 'scope.userInfo',
            success: function() {
                console.log('authorize: success');
                // self.wxUserInfoControl.getUserInfo();
                self.wxUserInfoControl.enableGetUserInfo();
                self.wxLogin();
            },
    
            fail: function(res) {
                console.log('authorize: failed: ' + res.errMsg);
            }
          });
    },

    wxLogin: function() {
        var self = this;
        wx.login({
            success: function(res) {
                if (res.code) {
                    console.log("login success, server handling...");
                    self.wxLoginSuccessCallBack();
                } else {
                  console.log("login failed: " + res.errMsg);
                }
            },
      
            fail: function() {
                console.log("login failed: " + res.errMsg);
            }
        });
    },

    wxLoginSuccessCallBack: function() {
        cc.find('Canvas/EnterRoomBlock/EnterRoomPanel').active = true;
        this.node.parent.active = false;
    }
});
