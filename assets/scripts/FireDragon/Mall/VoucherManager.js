var mallFlags = require("MallFlags");

cc.Class({
    extends: cc.Component,

    properties: {
        sprite_VoucherIcon: {
            default: null,
            type: cc.Sprite,
        },

        label_VoucherAmount: {
            default: null,
            type: cc.Label
        },

        label_RedeemedTreasure: {
            default: null,
            type: cc.Label
        },

        label_RedeemedVIPDays: {
            default: null,
            type: cc.Label
        },

        label_Price: {
            default: null,
            type: cc.Label
        },
    },

    setVoucherValues: function(index, voucherValueStruct) {
        this.index = index;
        this.voucherValues = voucherValueStruct;

        let voucherAmount = this.voucherValues.voucherAmount;
        let redeem_Treasure = this.voucherValues.redeem_Treasure;
        let redeem_vipDays = this.voucherValues.redeem_vipDays;
        let price_rmb = this.voucherValues.price_rmb;

        this.sprite_VoucherIcon.spriteFrame = this.voucherValues.voucherIcon;
        this.label_VoucherAmount.string = this.label_VoucherAmount.string.replace('value', voucherAmount);
        this.label_RedeemedTreasure.string = this.label_RedeemedTreasure.string.replace('value', redeem_Treasure);
        this.label_RedeemedVIPDays.string = this.label_RedeemedVIPDays.string.replace('value', redeem_vipDays);
        this.label_Price.string = this.label_Price.string.replace('value', price_rmb);
    },

    getVoucherValues: function() {
        return this.voucherValues;
    },

    getVoucherIndex: function() {
        return this.index;
    },

    onChoosePrice: function() {
        //  send this.index to the confirm panel
        NOTIFICATION.emit(mallFlags.MALL_CHOOSE_VOUCHER, {index: this.index});        
    }
});
