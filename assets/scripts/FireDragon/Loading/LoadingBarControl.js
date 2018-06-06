cc.Class({
    extends: cc.Component,

    properties: {
        loadingBlock: cc.Node,  //  加载界面
        enterRoomPanel: cc.Node,    //  选房界面

        loadingBar: cc.ProgressBar, //  加载进度条
        defaultLoadingText: '',

        //  default: "检测版本更新..."
        //  0: 最新版本："游戏资源加载中，请稍候..."
        //  1: 检测到新版本
        // loadingStatus: 0,

        label_LoadingInfo: cc.Label,    //  进度条文本内容
        loadingSpeed: 0,    //  加载速度

        //  update开关
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
        //  进度条置为0，设置loading文本内容
        let setDefaultText = cc.callFunc(
        () => {
            this.loadingBar.progress = 0;
            this.label_LoadingInfo.string = this.defaultLoadingText;
        });
        
        //  等待1秒
        let delay = cc.delayTime(1);
        
        //  打开update开关
        let updateResultCheck = cc.callFunc(this.updateResultCheck.bind(this));

        //  按顺序执行上述3个方法
        this.node.runAction(cc.sequence(setDefaultText, delay, updateResultCheck));
    },

    //  打开进入update的开关
    updateResultCheck: function() {
        this.isLoadingStatusChecked = true;
        console.log("trigger to enter update");
    },

    //  进度条加载
    updateLoadingInfo: function(dt) {
        let progress = this.loadingBar.progress;
        progress += dt * this.loadingSpeed; //  模拟加载进度：进度值随时间增加
        this.loadingBar.progress = progress;

        if (this.loadingBar.progress >= 1) {
            console.log("loading, done");
            this.isLoadingStatusChecked = false;

            this.loadingBlock.active = false;
            this.enterRoomPanel.active = true;
        }
    },
});
