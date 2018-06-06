var Flags = require("GameFlags");
var catchingMsgItemPool = require("CatchingMsgItemPool");

cc.Class({
    extends: cc.Component,

    properties: {
        //  捕获记录滚动视窗
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },

        scrollItemTotalCount: 0,    //  视窗内的记录数量
        scrollItemMaxCount: 30,     //  视窗内最多可容纳的记录数

        //  对象池控制脚本
        msgItemPoolController: {
            default: null,
            type: catchingMsgItemPool
        },

        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Prefab
        },

        //  当前金币数
        lable_CurTreasureCount: {
            default: null,
            type: cc.Label
        },

        //  当前倍率
        lable_MagnificationCount: {
            default: null,
            type: cc.Label
        },

        //  捕获数量
        label_CaughtCount: {
            default: null,
            type: cc.Label
        },

        //  主按钮
        playButton: {
            default: null,
            type: cc.Button
        },
        
        onPausedLabelStr: '开始狩猎',   //  按下暂停后的按钮文本
        onStartLabelStr: '狩猎中...',   //  按下开始后的按钮文本
    },

    onLoad: function() {
        this.content = this.scrollView.content;
        this.caughtCount = 0;
        this.items = []; // array to store spawned items
        this.labelChanged_PlayButton(1);    //  默认为暂停状态，需玩家点击触发游戏开始
    },

//#region update data
    //  update current treasure count
    setNewTreasure: function(newTreasure) {
        this.lable_CurTreasureCount.string = newTreasure;
    },

    //  update current magnification count
    setNewMag: function(newMag) {
        if(newMag != this.lable_MagnificationCount.string) {this.lable_MagnificationCount.string = newMag;}
    },

    //  update current caught count
    setNewCaughtCount: function(newCaughtCount) {
        if (newCaughtCount != this.label_CaughtCount.string) { this.label_CaughtCount.string = newCaughtCount;}
    },

    //  pop out catching-minus floating box
    setCatchingMinusInfo: function(curMagValue) {
        this.catchingMinusInfo.opacity = 255;
        this.catchingMinusInfo.runAction(cc.fadeOut(1));
        this.catchingMinusInfo.getChildByName("minusCount").getComponent(cc.Label).string = "-" + curMagValue.toString();
    },
    
    //  add catching result item to scrollView
    onScrollViewVicItemAdded: function(msg) {
        this.label_CaughtCount.string = ++this.caughtCount; //  增加捕获数量

        //  若当前scrollView内的记录数量 >= 对象池内可容纳对象的数量最大值
        if (this.scrollItemTotalCount >= this.msgItemPoolController.maxCount) {
            var first = this.items.shift(); //  remove数组内的第0个元素
            this.scrollItemTotalCount--;    //  减少当前scrollView内的记录数
            this.content.removeChild(first);    //  将第0个元素对应的记录从scrollView中移出
            
            this.msgItemPoolController.itemPool.put(first); //  将移出的对象放回至对象池内
        }

        let item = null;

        //  如果对象池不为空
        if (this.msgItemPoolController.itemPool.size() > 0) {
            //  从中获取一个对象
            item = this.msgItemPoolController.itemPool.get();
            console.log("get available item from itemPool");
        } else {
            console.log("no available item in itemPool!!!");
            return;
        }
        //  将记录添加至scrollView视图中
        this.content.addChild(item);

        //  将元素添加至数组中
        this.items.push(item);

        //  根据当前scrollView内的记录数量，调整content的高度使其可容纳所有scrollView内的记录
        this.content.height = (this.scrollItemTotalCount + 2) * item.height;
        
        //  增加当前视图内的记录数量
        this.scrollItemTotalCount++;

        //  记录数量大于10后，则需滑动浏览方能看到最新添加的记录
        if (this.scrollItemTotalCount > 10) {
            //  视图自动滚动至最低端，每次滚动耗时0.3秒
            this.scrollView.scrollToBottom(0.3);
        }

        //  为每条记录的UI元素赋予对应的信息
        item.getChildByName("enemyImg").getComponent(cc.Sprite).spriteFrame = msg.enemyImg;
        item.getChildByName("attackObj").getComponent(cc.Label).string = msg.attackObj;
        item.getChildByName("result").getComponent(cc.Label).string = msg.result;
        
        console.log("attackObj: " + msg.attackObj + ", result: " + msg.result + ", itemCount: " + this.items.length);
    },
//#endregion

//#region update visually

    //  开始/继续游戏
    onHitPlayButton: function() {   
        this.labelChanged_PlayButton(0);
    },

    //  暂停游戏
    onHitPauseButton: function() {
        this.labelChanged_PlayButton(1);        
    },

    labelChanged_PlayButton: function(tarStats) {
        //  on start/continue
        if (tarStats === 0) {
            this.playButton.node.getChildByName('Label').getComponent(cc.Label).string = this.onStartLabelStr;
        }

        //  on pause
        if (tarStats === 1) {
            this.playButton.node.getChildByName('Label').getComponent(cc.Label).string = this.onPausedLabelStr;    
        }
    },
//#endregion

//#region reset
    //  清除所有捕获记录
    onViewReset() {
        this.setNewCaughtCount(0);  //  重置捕获数量
        this.onScrollViewReset();   //  清除捕获记录
    },
    
    //  清除捕获记录
    onScrollViewReset: function() {
        for (let i = 0; i < this.scrollItemTotalCount; i++) {
            var first = this.items.shift();
            this.content.removeChild(first);
        }
        this.scrollItemTotalCount = 0;        
    },
//#endregion

    //  when treasure is running out
    onRunningOutofTreasure: function() {
        this.labelChanged_PlayButton(1);
        this.playButton.interactable = false;
    },

    //  when treasure is enough again
    onResumeEnoughTreasure: function() {
        this.playButton.interactable = true;
    }
});
