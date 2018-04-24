cc.Class({
    extends: cc.Component,

    properties: {
        loginBlock: cc.Node,
        loadingBlock: cc.Node,

        loadingBar: cc.ProgressBar,
        defaultLoadingText: '',

        //  default: "检测版本更新..."
        //  0: 最新版本："游戏资源加载中，请稍候..."
        //  1: 检测到新版本
        loadingStatus: 0,

        label_LoadingInfo: cc.Label,
        loadingSpeed: 0,

        confirm_Update: cc.Node,
        isLoadingStatusChecked: {
            default: false,
            visible: false
        }
    },

    start: function() {
        this.updateCheck();
    },

    update: function(dt) {
        if (!this.isLoadingStatusChecked) {
            return;
        }
        this.updateLoadingInfo(dt);
    },

    updateCheck: function() {
        let setDefaultText = cc.callFunc(
        () => {
            this.loadingBar.progress = 0;
            this.label_LoadingInfo.string = this.defaultLoadingText;
        });
        
        let delay = cc.delayTime(1);
        let updateResultCheck = cc.callFunc(this.updateResultCheck.bind(this));

        this.node.runAction(cc.sequence(setDefaultText, delay, updateResultCheck));
    },

    updateResultCheck: function() {
        this.isLoadingStatusChecked = true;
        console.log("trigger to enter update");

        switch(this.loadingStatus) {
            case 0:
                this.label_LoadingInfo.string = '游戏资源加载中，请稍候...';
                break;
            case 1:
                this.confirm_Update.active = true;
                this.isLoadingStatusChecked = false;
                this.label_LoadingInfo.string = '正在更新，请稍候...';
                break;
        }
    },

    updateLoadingInfo: function(dt) {
        let progress = this.loadingBar.progress;
        progress += dt * this.loadingSpeed;
        this.loadingBar.progress = progress;

        if (this.loadingBar.progress >= 1) {
            console.log("loading, done");
            this.isLoadingStatusChecked = false;

            this.loadingBlock.active = false;
            this.loginBlock.active = true;
        }
    },

    onConfirmVersionUpdated: function() {
        if (this.confirm_Update.active) {
            this.confirm_Update.active = false;
            this.isLoadingStatusChecked = true;
        }
        console.log("confirm update");
    },

    onCancleVersionUpdated: function() {
        if (this.confirm_Update.active) {
            this.confirm_Update.active = false;
            this.isLoadingStatusChecked = false;
        }
        console.log("cancled update");
    }
});
