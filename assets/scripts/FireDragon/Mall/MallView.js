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
    },

    init_PurchaseBlock: function(initValueSet) {
        let curTreasureAmount = initValueSet.curTreasureAmount;
        let isAutoRedeem = initValueSet.isAutoRedeem;

        this.label_CurTreasure_Purchase.string = this.label_CurTreasure_Purchase.string.replace('value', curTreasureAmount);
        this.toggle_AutoRedeem_Purchase.isChecked = isAutoRedeem;

        this.curTreasureAmount = curTreasureAmount;
    },

    init_RedeemBlock: function(initValueSet) {
        let curTreasureAmount = initValueSet.curTreasureAmount;
        let curVoucherPointAmount = initValueSet.curVoucherPointAmount;
        let treasurePerPoint = initValueSet.treasurePerPoint;

        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace('value', curTreasureAmount);
        this.label_RedeemedAmount.string = this.label_RedeemedAmount.string.replace('value', curVoucherPointAmount);
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace('value', curVoucherPointAmount);
        this.label_Rule.string = this.label_Rule.string.replace('value', treasurePerPoint);
        this.slider_ChooseRedeemAmount.progress = 1;

        this.curTreasureAmount = curTreasureAmount;
        this.curVoucherPointAmount = curVoucherPointAmount;
        this.redeemAmount = curVoucherPointAmount;
        this.treasurePerPoint = treasurePerPoint;
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

    // onUpdateTreasureAmount: function(event) {
    //     let newTreasureAmount = this.curTreasureAmount + event.increment * event.unit;
    //     this.curTreasureLabel.string = this.curTreasureLabel.string.replace(this.curTreasureAmount, newTreasureAmount);
    //     this.curTreasureAmount = newTreasureAmount;
    // },

    updateRedeemAmount: function(tarRedeemAmount) {
        this.label_RedeemedAmount.string = tarRedeemAmount;
    },

    updateTreasureAmount: function(tarTreasureAmount) {
        console.log("tarTreasureAmount" + tarTreasureAmount);
        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.curTreasureAmount, tarTreasureAmount);        
    }
});
