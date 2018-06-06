var voucherValueStruct = cc.Class({
    name: 'voucherValueStruct',

    properties: {
        voucherAmount: 0,
        redeem_Treasure: 0,
        redeem_vipDays: 0,
        price_rmb: 0
    }
});

var voucherItemSetting = require("VoucherManager");

cc.Class({
    extends: cc.Component,

    properties: {
        isAutoRedeem: false,
        redeemVoucherAmount: {
            get: function() {return this._redeemVoucherAmount;},
        },
        voucherValuesArray: {
            default: [],
            type: [voucherValueStruct]
        },
    },

    init_RedeemBlock: function(mallData_Redeem) {
        this._redeemVoucherAmount = mallData_Redeem.curVoucherPointAmount;
    },

    updateRedeemVoucherAmount: function(curRedeemAmount) {
        this._redeemVoucherAmount = curRedeemAmount;
    },
});
