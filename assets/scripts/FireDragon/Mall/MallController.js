//#region custom structs
var mallData_Purchase = cc.Class({
    name: 'mall_DataSet',
    properties: {
        curTreasureAmount: 0,
        isAutoRedeem: false
    }
});

var mallData_Redeem = cc.Class({
    name: 'mallData_Redeem',
    properties: {
        curTreasureAmount: 0,
        curVoucherPointAmount: 0,
        treasurePerPoint: 0,
    }
});
//#endregion

var gameFlags = require("GameFlags");
var mallFlags = require("MallFlags");

cc.Class({
    extends: cc.Component,
//#region   PROPERTIES
    properties: () => ({
//  MVC
        _gameControl: {
            default: null,
            type: require("GameController"),
            visible: true
        },

        _mallModel: {
            default: null,
            type: require("MallModel"),
            visible: true
        },

        _mallView: {
            default: null,
            type: require("MallView"),
            visible: true
        },

//  Interface nodes
        mallPanel_PurchaseBlock: {
            default: null,
            type: cc.Node
        },

        mallPanel_RedeemBlock: {
            default: null,
            type: cc.Node
        },
//  custum structs
        mallData_Purchase: {
            default: {},
            type: mallData_Purchase,
            visible: false
        },

//  Flags
        isPurchaseConfirming: {
            default: false,
            visible: false
        },

//  Voucher panel 
        scrollView: {
            default: null,
            type:cc.ScrollView
        },
        
        voucherItem: {
            default: null,
            type: cc.Prefab
        },

        voucherItemArray: {
            default: [],
            type: [require("VoucherManager")],
            visible: false
        },

        chosenIndex: {
            default: 0,
            visible: false
        },
    }),
//#endregion

    onLoad: function() {
        NOTIFICATION.on(mallFlags.MALL_CHOOSE_VOUCHER, this.onChooseVoucher, this);
        NOTIFICATION.on(mallFlags.MALL_2_GAME, this.onMallToGame, this);

        this.variablesInit();
    },

    start: function() {
        this.init_PurchaseVoucherPanel();        
    },

    onDisable: function() {
        NOTIFICATION.off(mallFlags.MALL_CHOOSE_VOUCHER, this.onChooseVoucher, this);
        NOTIFICATION.off(gameFlags.GAME_2_MALL, this.onGameToMall, this);        
    },

    variablesInit: function() {
        this.mallData_Purchase = {curTreasureAmount: '0', isAutoRedeem: false};
        this.mallData_Redeem = {curTreasureAmount: '0', curVoucherPointAmount: '0', treasurePerPoint: '0'}
    },

//  interfaces switching
    onGameToMall: function(event) {
        this.controllerDataUpdate();
        
        if (event.voucherPoint > 0) {
            this.enterRedeemBlock();
        } else if (event.voucherPoint === 0) {
            this.enterPurchaseBlock();
        } else {
            console.log("illegal voucher point!");
            return;
        }
    },

    controllerDataUpdate: function() {
        this.mallData_Purchase.curTreasureAmount = this._gameControl.curTreasure;
        this.mallData_Purchase.isAutoRedeem = this._mallModel.isAutoRedeem;

        this.mallData_Redeem.curTreasureAmount = this._gameControl.curTreasure;
        this.mallData_Redeem.curVoucherPointAmount = this._gameControl.curVoucherPoint;
        this.mallData_Redeem.treasurePerPoint = this._gameControl.treasurePerPoint;
    },

    enterPurchaseBlock: function() {
        this.controllerDataUpdate();
        this.mallPanel_PurchaseBlock.active = true;
        this.mallPanel_RedeemBlock.active = false;
        this._mallView.init_PurchaseBlock(this.mallData_Purchase);
    },
    
    init_PurchaseVoucherPanel: function() {
        if (this.voucherItemArray.length > 0) {
            console.log("voucherContent has already been inited");
            return;
        }

        this.content = this.scrollView.content;
        this.voucherValuesArray = this._mallModel.voucherValuesArray;

        //  spawn all the vouchers
        for (let i = 0; i < this._mallModel.voucherValuesArray.length; i++) {
            let item = cc.instantiate(this.voucherItem);
            this.content.addChild(item);
            this.voucherItemArray.push(item.getComponent("VoucherManager"));
        }
        
        //  set vouchers' values
        for (let i = 0; i < this.voucherItemArray.length; i++) {
            this.voucherItemArray[i].setVoucherValues(i, this.voucherValuesArray[i]);
        }
    },

    enterRedeemBlock: function() {
        this.controllerDataUpdate();
        this.mallPanel_RedeemBlock.active = true;
        this.mallPanel_PurchaseBlock.active = false;
        this._mallModel.init_RedeemBlock(this.mallData_Redeem);
        this._mallView.init_RedeemBlock(this.mallData_Redeem);
    },

    onMallToGame: function() {
        this.mallPanel_PurchaseBlock.active = false;
        this.mallPanel_RedeemBlock.active = false;
        this._gameControl.onMallToGame();
    },

    onSwitchMallBlock: function() {
        if (this.mallPanel_PurchaseBlock.active) {
            if (this._gameControl.curVoucherPoint <= 0) {
                this._mallView.activateLackOfVoucherPanel();
                return;
            }
            this.enterRedeemBlock();
        } else if (this.mallPanel_RedeemBlock.active) {
            this.enterPurchaseBlock();
        }
    },
//  interfaces switching

//  confirming purchase
    redeemVoucherPoint: function() {
        let voucherPoint_Purchased = this.voucherItemArray[this.chosenIndex].getVoucherValues().voucherAmount;
        this.mallData_Redeem.curVoucherPointAmount += voucherPoint_Purchased;

        this._gameControl.updateVoucherPointOnController(this.mallData_Redeem.curVoucherPointAmount);
        this._mallView.updateCurVoucherPointAmount(this.mallData_Redeem.curVoucherPointAmount);

        console.log(this.mallData_Redeem.curVoucherPointAmount);
    },

    redeemTreasure: function() {
        if (!this._mallView.toggle_AutoRedeem_Purchase) {
            return;
        }
        let increment = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_Treasure;
        // this._mallView.updateTreasureAmount({increment: increment, unit: 10000});
        let curTreasure = this._gameControl.curTreasure;
        let newTreasure = curTreasure + increment * 10000;

        this._mallView.updateTreasureAmount(newTreasure);
        NOTIFICATION.emit(gameFlags.USER_RECHARGE_TREASURE_ADD, {increment: increment * 10000});
    },

    //  TODO
    redeemVIP: function() {
        
    },
    
    //  TODO
    deductRMB: function() {

    },
//  confirming pruchase

    resetPurchase: function() {
        this.isPurchaseConfirming = false;
        this.chosenIndex = 0;
    },

//  ui events
    onChooseVoucher: function(event) {
        if (this.isPurchaseConfirming === true) {
            return;
        }
        this.isPurchaseConfirming = true;

        this.chosenIndex = event.index;
        let voucherAmount = this.voucherItemArray[this.chosenIndex].getVoucherValues().voucherAmount;
        let redeem_Treasure = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_Treasure;
        let redeem_vipDays = this.voucherItemArray[this.chosenIndex].getVoucherValues().redeem_vipDays;
        let price_rmb = this.voucherItemArray[this.chosenIndex].getVoucherValues().price_rmb;

        console.log(cc.js.formatStr(
            "index: %s, voucherAmount: %s, treasure: %s, vip: %s days, price: %s rmb",
                this.chosenIndex, voucherAmount, redeem_Treasure, redeem_vipDays, price_rmb));

        this._mallView.activateConfirmPanel();
    },

    //  call back on hit confirm button
    onConfirmPurchasing: function() {
        if (this.isPurchaseConfirming === false) {
            return;
        }

        if (this._mallView.toggle_AutoRedeem_Purchase.isChecked) {
            console.log("autoRedeem");
            this.redeemTreasure();  //  redeem trasure
        } else {
            this.redeemVoucherPoint();  //  redeem voucher point            
        }
        
        this.redeemVIP();   //  redeem vip
        this.deductRMB();   //  deduct rmb

        this._mallView.deactivateConfirmPanel();
        this.resetPurchase();
    },

    //  on hit cancle button
    onCanclePurchasing: function() {
        this.resetPurchase();
    },

    onSliderEvent(sender, eventType) {
        let curRedeemAmount = Math.floor(this.mallData_Redeem.curVoucherPointAmount * sender.progress);
        if (curRedeemAmount <= 0) {
            curRedeemAmount = 1;
        }
        this._mallModel.updateRedeemVoucherAmount(curRedeemAmount);
        this._mallView.updateRedeemAmount(curRedeemAmount);
    },

    onConfrimRedeem: function(){
        let curTreasure = this._gameControl.curTreasure;
        let increment = this._mallModel.redeemVoucherAmount * this._gameControl.treasurePerPoint;

        console.log(cc.js.formatStr("curTreasure: %s, redeemVoucherAmount: %s, treasurePerPoint: %s", curTreasure, this._mallModel.redeemVoucherAmount, this._gameControl.treasurePerPoint));
        this._gameControl.updateTreasureOnController(curTreasure + increment);
        this._gameControl.updateVoucherPointOnController(this.mallData_Redeem.curVoucherPointAmount - this._mallModel.redeemVoucherAmount);
        this._mallView.updateTreasureAmount(curTreasure + increment);
    },
    //  on hit exit button
    onExit: function() {
        NOTIFICATION.emit(mallFlags.MALL_2_GAME);
    },
//  ui events
});
