var voucherItemSetting = require("VoucherManager");

cc.Class({
    extends: cc.Component,

    properties: {
        confirmingPanle: {
            default: null,
            type: cc.Node
        },

        //#region  Purchase UI elems
        label_CurTreasure_Purchase: {
            default: null,
            type: cc.Label
        },

        toggle_AutoRedeem_Purchase: {
            default: null,
            type: cc.Toggle
        },
        //#endregion

        //#region  Redeem UI elems
        label_RedeemedAmount: {
            default: null,
            type:cc.Label
        },

        label_SliderMaxAmount: {
            default: null,
            type:cc.Label
        },

        label_CurTreasure_Redeem: {
            default: null,
            type:cc.Label
        },

        label_Rule: {
            default: null,
            type: cc.Label
        },

        slider_ChooseRedeemAmount: {
            default: null,
            type: cc.Slider
        },
        //#endregion

        hasInited_Purchase: {
            default: false,
            visible: false
        },
        hasInited_Redeem: {
            default: false,
            visible: false
        }
    },

    init_PurchaseBlock: function(initValueSet) {
        let curTreasureAmount = initValueSet.curTreasureAmount;
        let isAutoRedeem = initValueSet.isAutoRedeem;
        
        this.label_CurTreasure_Purchase.string = this.label_CurTreasure_Purchase.string.replace(this.hasInited_Purchase ? this.curTreasureAmount : 'value', curTreasureAmount);
        this.toggle_AutoRedeem_Purchase.isChecked = isAutoRedeem;
        this.curTreasureAmount = curTreasureAmount;

        this.hasInited_Purchase = true;
    },

    init_RedeemBlock: function(initValueSet) {
        let curTreasureAmount = initValueSet.curTreasureAmount;
        let curVoucherPointAmount = initValueSet.curVoucherPointAmount;
        let treasurePerPoint = initValueSet.treasurePerPoint;

        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.hasInited_Redeem ? this.curTreasureAmount :'value', curTreasureAmount);
        // this.label_RedeemedAmount.string = this.label_RedeemedAmount.string.replace('value', curVoucherPointAmount);
        this.label_RedeemedAmount.string = curVoucherPointAmount;
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace(this.hasInited_Redeem ? this.curTreasureAmount : 'value', curVoucherPointAmount);
        this.label_Rule.string = this.label_Rule.string.replace(this.hasInited_Redeem ? this.treasurePerPoint : 'value', treasurePerPoint);
        this.slider_ChooseRedeemAmount.progress = 1;

        this.curTreasureAmount = curTreasureAmount;
        this.curVoucherPointAmount = curVoucherPointAmount;
        this.redeemAmount = curVoucherPointAmount;
        this.treasurePerPoint = treasurePerPoint;
        
        this.hasInited_Redeem = true;        
    },

    activateConfirmPanel: function() {
        if (this.confirmingPanle.active === false) {
            this.confirmingPanle.active = true;
        }
    },

    deactivateConfirmPanel: function() {
        if (this.confirmingPanle.active === true) {
            this.confirmingPanle.active = false;
        }
    },
    
    updateCurVoucherPointAmount: function(tarVoucherPointAmount) {
        // this.label_RedeemedAmount.string = this.label_RedeemedAmount.string.replace(this.curVoucherPointAmount, tarVoucherPointAmount);
        this.label_RedeemedAmount.string = tarVoucherPointAmount;        
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace(this.curVoucherPointAmount, tarVoucherPointAmount);
        
        this.curVoucherPointAmount = tarVoucherPointAmount;
    },

    //#region   for slider
    updateRedeemAmount: function(tarRedeemAmount) {
        this.label_RedeemedAmount.string = tarRedeemAmount;
    },
    //#endregion

    updateTreasureAmount: function(tarTreasureAmount) {
        console.log("tarTreasureAmount" + tarTreasureAmount);
        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.curTreasureAmount, tarTreasureAmount);
        this.label_CurTreasure_Purchase.string = this.label_CurTreasure_Purchase.string.replace(this.curTreasureAmount, tarTreasureAmount);
        
        this.curTreasureAmount = tarTreasureAmount;
    }
});
