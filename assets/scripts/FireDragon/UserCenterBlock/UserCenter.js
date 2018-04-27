cc.Class({
    extends: cc.Component,

    properties: {
        sprite_Avatar: cc.Sprite,
        label_NickName: cc.Label,
        label_CurTreature: cc.Label,
        label_QPID: cc.Label,
        label_BindgingAccount: cc.Label,

        wxUserInfoControl: require("wxUserInfoDisplay"),

        _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
        },

        hasInited: {
            default: false,
            visible: false
        }
    },

    onEnable: function() {
        this.setWxUserInfo();
        this.setGameData();

        this.hasInited = true;
    },

    setWxUserInfo: function() {
        this.sprite_Avatar.spriteFrame = this.wxUserInfoControl.avatar_EnterRoom.getComponent(cc.Sprite).spriteFrame;
        
        this.label_NickName.string = this.label_NickName.string.replace(
            this.hasInited ? this.nickName : 'value', 
            this.wxUserInfoControl.nickName_EnterRoom.getComponent(cc.Label).string
        );

        this.nickName = this.wxUserInfoControl.nickName_EnterRoom.getComponent(cc.Label).string;
    },

    setGameData: function() {
        this.label_CurTreature.string = this.label_CurTreature.string.replace(
            this.hasInited ? this.curTreasure : 'value',
            this._gameModel.curTreasure
        );

        this.label_QPID.string = this.label_QPID.string.replace(
            this.hasInited ? this.QP_ID: 'value',
            this._gameModel.QP_ID
        );

        this.label_BindgingAccount.string = this.label_BindgingAccount.string.replace(
            this.hasInited ? this.bindingAccount : 'value',
            this._gameModel.bindingAccount
        );  

        this.curTreasure = this._gameModel.curTreasure;
        this.QP_ID = this._gameModel.QP_ID;
        this.bindingAccount = this._gameModel.bindingAccount;
    },

    onBackToEnterRoom: function() {
        let enterRoomBlock = cc.find('Canvas/EnterRoomBlock');
        enterRoomBlock.active = true;
        this.node.active = false;
    }
});
