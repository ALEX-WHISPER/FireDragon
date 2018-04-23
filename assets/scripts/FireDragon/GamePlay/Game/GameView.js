var Flags = require("GameFlags");
var catchingMsgItemPool = require("CatchingMsgItemPool");

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },

        scrollItemTotalCount: 0,
        scrollItemMaxCount: 30,

        catchingMinusInfo: {
            default: null,
            type: cc.Node
        },

        msgItemPoolController: {
            default: null,
            type: catchingMsgItemPool
        },

        itemTemplate: { // item template to instantiate other items
            default: null,
            type: cc.Prefab
        },

        lable_CurTreasureCount: {
            default: null,
            type: cc.Label
        },

        lable_MagnificationCount: {
            default: null,
            type: cc.Label
        },

        playButton: {
            default: null,
            type: cc.Button
        },

        playButtonSprites: {
            default: [],
            type: [cc.SpriteFrame]
        },

        pauseButtonSprites: {
            default:[],
            type: [cc.SpriteFrame]
        },
    },

    onLoad: function() {
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
    },

    start: function() {
        if (!this.catchingMinusInfo.active) {
            this.catchingMinusInfo.active = true;
            this.catchingMinusInfo.opacity = 0;
        }
    },

    //  update current treasure count
    setNewTreasure: function(newTreasure) {
        this.lable_CurTreasureCount.string = newTreasure;
    },

    //  update current magnification count
    setNewMag: function(newMag) {
        if(newMag != this.lable_MagnificationCount.string) {
            this.lable_MagnificationCount.string = newMag;
        }
    },

    //  pop out catching-minus floating box
    setCatchingMinusInfo: function(curMagValue) {
        this.catchingMinusInfo.opacity = 255;
        this.catchingMinusInfo.runAction(cc.fadeOut(1));
        this.catchingMinusInfo.getChildByName("minusCount").getComponent(cc.Label).string = "-" + curMagValue.toString();
    },

    //  update the button sprite frames: pause -> play
    onHitPlayButton: function() {
        this.spriteChanged_PlayButton(this.pauseButtonSprites);
    },

    //  update the button sprite frames: play -> pause
    onHitPauseButton: function() {
        this.spriteChanged_PlayButton(this.playButtonSprites);
    },

    spriteChanged_PlayButton: function(spritesArray) {
        this.playButton.normalSprite = spritesArray[0];
        this.playButton.pressedSprite = spritesArray[1];
        this.playButton.hoverSprite = spritesArray[2];
        this.playButton.disabledSprite = spritesArray[3];
    },

    //  add catching result item to scrollView
    onScrollViewVicItemAdded: function(msg) {
        if (this.scrollItemTotalCount >= this.msgItemPoolController.maxCount) {
            var first = this.items.shift();
            this.scrollItemTotalCount--;
            this.content.removeChild(first);
            
            this.msgItemPoolController.itemPool.put(first);
        }

        let item = null;
        if (this.msgItemPoolController.itemPool.size() > 0) {
            item = this.msgItemPoolController.itemPool.get();
            console.log("get available item from itemPool");
        } else {
            console.log("no available item in itemPool!!!");
            return;
        }
        this.content.addChild(item);
        this.items.push(item);

        this.content.height = (this.scrollItemTotalCount + 1) * item.height + item.height;
        this.scrollItemTotalCount++;

        item.getChildByName("attackObj").getComponent(cc.Label).string = msg.attackObj;
        item.getChildByName("result").getComponent(cc.Label).string = msg.result;
        
        console.log("attackObj: " + msg.attackObj + ", result: " + msg.result + ", itemCount: " + this.items.length);
    },

    //  when treasure is running out
    onRunningOutofTreasure: function() {
        this.spriteChanged_PlayButton(this.playButtonSprites);
        this.playButton.interactable = false;
    }
});
