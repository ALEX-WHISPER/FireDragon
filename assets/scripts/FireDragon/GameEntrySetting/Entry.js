
var blockStruct = cc.Class({
    name: 'blockStruct',

    properties: {
        blockNode: cc.Node, //  模块节点
        views: [cc.Node],   //  模块子节点-界面
        controller: cc.Node,    //  模块子节点-逻辑控制物体
        isViewActiveOnStart: 0  //  界面开始时即显示
    }
});

cc.Class({
    extends: cc.Component,

    editor: {
        executionOrder: -99
    },

    properties: {
        //  加载模块
        loadingBlock: {
            default: null,
            type: blockStruct
        },

        //  选房模块
        enterRoomBlock: {
            default: null,
            type: blockStruct
        },

        //  游戏模块
        gamePlayBlock: {
            default: null,
            type: blockStruct
        },

        //  商城模块
        mallBlock: {
            default: null,
            type: blockStruct
        }
    },
    
    onLoad: function() {
        this.blockActivationOnLoad(this.loadingBlock);
        this.blockActivationOnLoad(this.enterRoomBlock);
        this.blockActivationOnLoad(this.gamePlayBlock);
        this.blockActivationOnLoad(this.mallBlock);        
    },

    blockActivationOnLoad: function(block) {
        block.active = true;    //  开启整个模块

        var views = block.views;
        var controller = block.controller;

        //  开启/关闭模块界面
        if (views != null && views.length > 0) {
            for (let i = 0; i < views.length; i++) {
                views[i].active = block.isViewActiveOnStart === 0 ? false : true;
            }
        }

        //  开启逻辑控制物体
        controller.active = true;
    }
});
