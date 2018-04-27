
cc.Class({
    extends: cc.Component,

    properties: ()=>({
        _gameControl: {
            default: null,
            type: require("GameController"),
            visible: true
        },

        _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
        },

        _mallModel: {
            default: null,
            type: require("MallModel"),
            visible: true
        },

        label_HowMuchLackOf: cc.Label,
        label_RecoRechargeValue: cc.Label,
        label_CostRMB:cc.Label,

        gamePlayPanel: cc.Node,
        enterRoomBlock: cc.Node,
        lackOfTreasurePanel: cc.Node
    }),

    start: function() {
        this.hasInited = false;

        this.howMuchLackOf = 0;
        this.recoRechargeValue = 0;
        this.costRMB = 0;
    },
    
    onChooseRoomToEnter: function(event, customEventData) {
        let curTreasure = this._gameModel.curTreasure;
        let allowedTreasure = customEventData;

        if (curTreasure < allowedTreasure) {
            console.log(cc.js.formatStr("lack of treasure, curTreasure: %s, allowedTreasure: %s", curTreasure, allowedTreasure));
            this.onLackOfTreasure(Math.abs(curTreasure - allowedTreasure));
        } else {
            console.log(cc.js.formatStr("enough treasure, curTreasure: %s, allowedTreasure: %s", curTreasure, allowedTreasure));
            this.onEnterRoom();
        }
    },

    //  not allowed to enter room
    onLackOfTreasure: function(reduction) {
        //  pop out the hint window: You should buy more coin
        this.lackOfTreasurePanel.active = true;

        //  how much treasure is it lack of
        let howMuchLackOf = reduction;
        this.label_HowMuchLackOf.string = this.label_HowMuchLackOf.string.replace(
            this.hasInited ? this.howMuchLackOf : 'value', howMuchLackOf
        );
        this.howMuchLackOf = howMuchLackOf;

        //  what is the nearest recommanded recharge value
        let voucherArray = [];
        let recoRechargeVoucherIndex;
        voucherArray = this._mallModel.voucherValuesArray;

        for(let i = 0; i < voucherArray.length; i++) {
            if (voucherArray[i].redeem_Treasure > this.howMuchLackOf / 10000) {
                console.log(cc.js.formatStr("redeem_Treasure: %s, howMuchLackOf: %s", voucherArray[i].redeem_Treasure, this.howMuchLackOf / 10000));
                recoRechargeVoucherIndex = i;
                break;
            }
        }
        this.label_RecoRechargeValue.string = this.label_RecoRechargeValue.string.replace(
            this.hasInited ? this.recoRechargeValue : 'value', voucherArray[recoRechargeVoucherIndex].redeem_Treasure
        );        
        
        this.recoRechargeValue = voucherArray[recoRechargeVoucherIndex].redeem_Treasure;

        //  how much money does it cost
        this.label_CostRMB.string = this.label_CostRMB.string.replace(
            this.hasInited ? this.costRMB : 'value', voucherArray[recoRechargeVoucherIndex].price_rmb
        );        
        
        this.costRMB = voucherArray[recoRechargeVoucherIndex].price_rmb;

        this.hasInited = true;
    },

    //  allow to enter room
    onEnterRoom: function() {
        this.enterRoomBlock.active = false;
        this.lackOfTreasurePanel.active = false;

        this.gamePlayPanel.active = true;
    },

    onExitRechargeEntry: function() {
        this.lackOfTreasurePanel.active = false;
    },

    onFastRecharge: function() {
        let newTreasure = this._gameModel.curTreasure + this.recoRechargeValue * 10000;
        this._gameControl.updateTreasureOnController(newTreasure);
        this._gameControl.updateValuesOnModel();
        this._gameControl.updateValuesOnView();
        
        //  update game info in this panel
        this.node.getComponent("GameInfoDisplay").setGameInfo();

        this.onExitRechargeEntry();
    },

    onEnterUserCenter: function() {
        let userCenterBlock = cc.find('Canvas/UserCenterBlock');
        userCenterBlock.active = true;
        this.node.parent.active = false;
    }
});