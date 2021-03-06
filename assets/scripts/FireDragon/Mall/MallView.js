var voucherItemSetting = require("VoucherManager");

cc.Class({
    extends: cc.Component,

    properties: {

        //#region  Purchase UI elems
        
        //  确认购买界面
        confirmingPanle: {
            default: null,
            type: cc.Node
        },
        
        //  缺少点券提示界面
        lackOfVoucherPanel: {
            default: null,
            type: cc.Node
        },

        //  购买界面-当前金币
        label_CurTreasure_Purchase: {
            default: null,
            type: cc.Label
        },

        //  购买界面-自动兑换选框
        toggle_AutoRedeem_Purchase: {
            default: null,
            type: cc.Toggle
        },
        //#endregion

        //#region  Redeem UI elems
        //  兑换界面-兑换数量
        label_RedeemedAmount: {
            default: null,
            type:cc.Label
        },

        //  兑换界面-当前点券数(滑块最大值)
        label_SliderMaxAmount: {
            default: null,
            type:cc.Label
        },

        //  兑换界面-当前金币
        label_CurTreasure_Redeem: {
            default: null,
            type:cc.Label
        },

        //  兑换界面-可兑换金币
        label_CashableTreasure_Redeem: {
            default: null,
            type: cc.Label
        },

        //  兑换界面-1点券可兑换的金币数
        label_Rule: {
            default: null,
            type: cc.Label
        },

        //  兑换界面-滑块
        slider_ChooseRedeemAmount: {
            default: null,
            type: cc.Slider
        },

        //  兑换界面-进度条
        progressBar_Slider: {
            default: null,
            type: cc.ProgressBar
        },
        //#endregion

        //  购买界面-是否已进行初始化
        hasInited_Purchase: {
            default: false,
            visible: false
        },

        //  兑换界面-是否已进行初始化
        hasInited_Redeem: {
            default: false,
            visible: false
        }
    },

    //  init/update UI content in purchase block
    init_PurchaseBlock: function(initValueSet) {
        //#region store values to local vars
        let curTreasureAmount = initValueSet.curTreasureAmount;
        let isAutoRedeem = initValueSet.isAutoRedeem;
        //#endregion

        //#region view update
        //  购买界面-当前金币
        this.label_CurTreasure_Purchase.string = curTreasureAmount;
        
        //  购买界面-自动兑换选框
        this.toggle_AutoRedeem_Purchase.isChecked = this.hasInited_Purchase ? this.toggle_AutoRedeem_Purchase.isChecked : isAutoRedeem;
        //#endregion
        
        //#region values update
        this.curTreasureAmount = curTreasureAmount;
        this.hasInited_Purchase = true;
        //#endregion
    },

    //  init/update UI content in redeem block
    init_RedeemBlock: function(initValueSet) {
        //#region store values to local vars
        let curTreasureAmount = initValueSet.curTreasureAmount;     //  当前金币数
        let curVoucherPointAmount = initValueSet.curVoucherPointAmount; //  当前点券数
        let treasurePerPoint = initValueSet.treasurePerPoint;   //  每张点券可兑换金币的数量
        let cashableTreasure = curVoucherPointAmount * treasurePerPoint;    //  最多可兑换金币的数量
        //#endregion

        //#region view update
        //  兑换界面-金币数
        this.label_CurTreasure_Redeem.string = this.label_CurTreasure_Redeem.string.replace(this.hasInited_Redeem ? this.curTreasureAmount :'value', curTreasureAmount);
        this.label_RedeemedAmount.string = curVoucherPointAmount;   //  兑换数量
        
        //  滑块最大值
        this.label_SliderMaxAmount.string = this.label_SliderMaxAmount.string.replace(this.hasInited_Redeem ? this.curVoucherPointAmount : 'value', curVoucherPointAmount);
        
        //  每张点券可兑换金币的数量
        this.label_Rule.string = this.label_Rule.string.replace(this.hasInited_Redeem ? this.treasurePerPoint : 'value', treasurePerPoint);
        
        //  兑换界面-可兑换金币的数量
        this.label_CashableTreasure_Redeem.string = cashableTreasure;
        
        this.slider_ChooseRedeemAmount.progress = 1;    //  滑块在滑动条上的进度值
        this.progressBar_Slider.progress = 1;   //  绿色进度条的值
        //#endregion
        
        //#region values update
        this.curTreasureAmount = curTreasureAmount;
        this.curVoucherPointAmount = curVoucherPointAmount;
        this.redeemAmount = curVoucherPointAmount;
        this.treasurePerPoint = treasurePerPoint;
        this.cashableTreasure = cashableTreasure;
        
        //  MallView的数值和表现已被初始化
        if (!this.hasInited_Redeem) {
            this.hasInited_Redeem = true;
        }
        //#endregion
    },

    //  弹出“缺少点券”提示界面
    activateLackOfVoucherPanel: function() {
        if (this.lackOfVoucherPanel.active === false) {
            this.lackOfVoucherPanel.active = true;
        }
    },

    //  关闭“缺少点券”提示界面
    deactivateLackOfVoucherPanel: function() {
        if (this.lackOfVoucherPanel.active === true) {
            this.lackOfVoucherPanel.active = false;
        }
    },

    //  弹出“确认购买”界面
    activateConfirmPanel: function() {
        if (this.confirmingPanle.active === false) {
            this.confirmingPanle.active = true;
        }
    },

    //  关闭“确认购买”界面
    deactivateConfirmPanel: function() {
        if (this.confirmingPanle.active === true) {
            this.confirmingPanle.active = false;
        }
    },

    //#region   for slider: update redeemed amount and slider length on user sliding
    updateRedeemAmount: function(tarRedeemAmount) {
        this.label_RedeemedAmount.string = tarRedeemAmount;
        this.label_CashableTreasure_Redeem.string = tarRedeemAmount * this.treasurePerPoint;
    },

    updateRedeemProgressBar: function(sliderProgress) {
        this.progressBar_Slider.progress = sliderProgress;
    }
    //#endregion
});
