var flags = require("GameFlags");

cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },
//#region  Properties
    properties: () => ({
        //#region  mvc
        _gameModel: {
            default: null,
            type: require("GameModel"),
            visible: true
        },

        _gameView: {
            default: null,
            type: require("GameView"),
            visible: true
        },

        _mallController: {
            default: null,
            type: require("MallController"),
            visible: true
        },
        //#endregion

        //  Interface nodes
        gamePanelBlock: {
            default: null,
            type: cc.Node
        },

        //#region Data reference
        curVoucherPoint: {
            get: function() {return this._curVoucherPoint;},
            visible: false
        },

        curTreasure: {
            get: function() {return this._curTreasure;},
            visible: false
        },

        curMag: {
            get: function() {return this._curMag;},
            visible: false
        },

        magInterval: {
            get: function() {return this._magInterval;},
            visible: false
        },

        treasurePerPoint: {
            get: function() {return this._treasurePerPoint;},
            visible: false
        },
        //#endregion

        //  Flags
        isPlaying: {
            default: false,
            visible: false
        },
    }),
    //#endregion

//#region  life cycle
    onLoad: function() {
        this.eventsRegistration();
        this.initValuesOnController();
    },

    onEnable: function() {
        this.updateValuesOnModel();
        this.updateValuesOnView();
    },

    onDisable: function() {
        this.eventsDeRegistration();
    },
//#endregion

//#region  events
    eventsRegistration: function() {
        NOTIFICATION.on(flags.GAME_HIT_MAIN, this.onHitMainButton, this);
        NOTIFICATION.on(flags.MAG_ADD, this.onMagAdded, this);
        NOTIFICATION.on(flags.MAG_MINUS, this.onMagMinus, this);

        NOTIFICATION.on(flags.ENEMY_CATCH_ATTEMPT, this.onCatchAttempt, this);
        NOTIFICATION.on(flags.ENEMY_CAUGHT_TREASURE_ADD, this.onTreasureAdded_CaughtEnemy, this);
        NOTIFICATION.on(flags.ENEMY_ESCAPED_TREASURE_MINUS, this.onTreasureMinus_LostEnemy, this);
        
        NOTIFICATION.on(flags.USER_RECHARGE_TREASURE_ADD, this.onTreasureAdded_Recharge, this);

        NOTIFICATION.on(flags.GAME_2_MALL, this.onGameToMall, this);
    },

    eventsDeRegistration: function() {
        NOTIFICATION.off(flags.GAME_HIT_MAIN, this.onHitMainButton, this);
        NOTIFICATION.off(flags.MAG_ADD, this.onMagAdded, this);
        NOTIFICATION.off(flags.MAG_MINUS, this.onMagMinus, this);

        NOTIFICATION.off(flags.ENEMY_CATCH_ATTEMPT, this.onCatchAttempt, this);
        NOTIFICATION.off(flags.ENEMY_CAUGHT_TREASURE_ADD, this.onTreasureAdded_CaughtEnemy, this);
        NOTIFICATION.off(flags.ENEMY_ESCAPED_TREASURE_MINUS, this.onTreasureMinus_LostEnemy, this);

        NOTIFICATION.off(flags.USER_RECHARGE_TREASURE_ADD, this.onTreasureAdded_Recharge, this);

        NOTIFICATION.off(flags.GAME_2_MALL, this.onGameToMall, this);                
    },
//#endregion

//#region  interfaces switching
    onGameToMall: function() {
        if (this.isPlaying === true) {
            this.isPlaying = false;
            this.onPauseHangingUp();
            this._gameView.onHitPauseButton();
        }
        this.gamePanelBlock.active = false;
        this._mallController.onGameToMall({voucherPoint: this.curVoucherPoint});
    },

    onMallToGame: function() {
        this.gamePanelBlock.active = true;
        this.updateValuesOnModel();
        this.updateValuesOnView();
    },
//#endregion

//#region  game play, game pause
    onHitMainButton: function() {
        if (this.isPlaying === false) {
            this.isPlaying = !this.isPlaying;
            this.onStartHangingUp();
            this._gameView.onHitPlayButton();
        } else {
            this.isPlaying = !this.isPlaying;
            this.onPauseHangingUp();
            this._gameView.onHitPauseButton();
        }
    },

    onStartHangingUp: function() {
        this._gameModel.startHangingUp();
    },

    onPauseHangingUp: function() {
        this._gameModel.pauseHangingUp();
    },
//#endregion

//#region onEnemy: attempt, caught, escaped
    onTreasureAdded_CaughtEnemy: function(event) {
        let addingValue = event.multiNum * this.curMag;
        console.log("Treasure += " + addingValue);

        this.updateTreasureOnController(this.curTreasure + addingValue);
        this.updateValuesOnModel();
        this.updateValuesOnView();
        
        let attackObj = event.enemyName;
        let result = event.killMsg + addingValue;
        let msg = {attackObj: attackObj, result: result}
        this.updateScrollViewOnView(msg);
    },

    onTreasureMinus_LostEnemy: function() {
        //  if current treasure is less than or equal to 0, force to stop the game
        if (this.curTreasure <= 0 || this.curTreasure - this.curMag < 0) {
            this._gameModel.pauseHangingUp();
            this._gameView.onRunningOutofTreasure();
            console.log("Run out of all your treasure, need to recharge!");
            return;
        }

        let minusValue = this.curMag;
        console.log("Treasure -= " + minusValue);
        
        this.updateTreasureOnController(this.curTreasure - minusValue);
        this.updateValuesOnModel();
        this.updateValuesOnView();
    },

    onTreasureAdded_Recharge: function(event) {
        // console.log(cc.js.formatStr("increment: %s, unit: %s, totalCount: %s", event.increment, event.unit, event.increment*event.unit));
        let increment = event.increment;
        let newTreasure = this.curTreasure + increment;
        
        this.updateTreasureOnController(newTreasure);
        console.log(cc.js.formatStr("GameController.curTreasure: %s", this.curTreasure));
    },

    //  attampt to catch enemy, deduct the treasure after all
    onCatchAttempt: function() {
        this._gameView.setCatchingMinusInfo(this.curMag);
    },
//#endregion

//#region operate magnification value
    onMagAdded: function() {
        console.log("onMagAdded, interval: " + this.magInterval);
        this.check_MagInterval();

        if (this.curMag === 1000) {
            this.updateMagOnController(1);
            this.updateMagIntervalOnController(1);
        } else {
            this.updateMagOnController(this.curMag + this.magInterval);
        }

        this.updateValuesOnModel();
        this.updateValuesOnView();
    },

    onMagMinus: function() {
        console.log("onMagMinus, interval: " + this.magInterval);
        this.check_MagInterval();
        
        if (this.curMag === 1) {
            this.updateMagIntervalOnController(0);
        } else if (this.curMag === 100) {
            this.updateMagIntervalOnController(10);
        }

        this.updateMagOnController(this.curMag - this.magInterval);
        if (this.curMag === 0) {
            this.updateMagOnController(1);
        }

        this.updateValuesOnModel();
        this.updateValuesOnView();
    },

    check_MagInterval: function(isAdding) {
        if (this.curMag >= 1  && this.curMag < 10) {
            this.updateMagIntervalOnController(1);
        } else if (this.curMag >= 10 && this.curMag < 100) {
            this.updateMagIntervalOnController(10);            
        } else if (this.curMag >= 100 && this.curMag < 1000) {
            this.updateMagIntervalOnController(100);            
        }
    },
//#endregion

//#region  update values on model and view
    updateValuesOnModel: function() {
        this._gameModel.setNewMagInterval(this.magInterval);
        this._gameModel.setNewMag(this.curMag);
        this._gameModel.setNewTreasure(this.curTreasure);
        this._gameModel.setNewVoucherPoint(this.curVoucherPoint);
    },

    updateValuesOnView: function() {
        this._gameView.setNewMag(this.curMag);
        this._gameView.setNewTreasure(this.curTreasure);
    },

    updateScrollViewOnView: function(msg) {
        this._gameView.onScrollViewVicItemAdded(msg);
    },
    
    updateVoucherPointOnController: function(tarVoucherPoint) {this._curVoucherPoint = tarVoucherPoint;},
    updateTreasureOnController: function(tarTreasure) {
        if (tarTreasure > 0 && tarTreasure - this.curMag >= 0) {
            this._gameView.onResumeEnoughTreasure();
        }
        this._curTreasure = tarTreasure;
    },
    updateMagOnController: function(tarMagValue) {this._curMag = tarMagValue;},
    updateMagIntervalOnController: function(tarMagInterval) {this._magInterval = tarMagInterval;},
    updateTreasurePerPointOnController: function(tarTreasurePerPoint) {this._treasurePerPoint = tarTreasurePerPoint;},
//#endregion

//#region  others
    initValuesOnController: function() {
        this.updateVoucherPointOnController(this._gameModel.curVoucherPoint);
        this.updateTreasureOnController(this._gameModel.curTreasure);
        this.updateMagOnController(this._gameModel.curMag);
        this.updateMagIntervalOnController(this._gameModel.magInterval);
        this.updateTreasurePerPointOnController(this._gameModel.treasurePerPoint);
    },
//#endregion
});
