cc.Class({
    extends: cc.Component,

    properties: {
        _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
        },
        curTreature_EnterRoom: cc.Node
    },

    onLoad: function() {
        this.setGameInfo();
    },

    setGameInfo: function() {
        let label_curTreasure = this.curTreature_EnterRoom.getComponent(cc.Label);
        
        label_curTreasure.string = label_curTreasure.string.replace(
            this.hasInited ? this.curTreasure : 'value', 
            this._gameModel.curTreasure
        );
        
        this.curTreasure = this._gameModel.curTreasure;
        console.log("curTreature in GameInfoDisplay: " + this.curTreasure);
        this.hasInited = true;
    }
});