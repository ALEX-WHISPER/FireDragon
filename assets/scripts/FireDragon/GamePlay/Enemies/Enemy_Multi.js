var enemyBase = require("EnemyBase");
var flags = require("GameFlags");

cc.Class({
    extends: enemyBase,

    properties: {
        multiNum: 1,

        catchingRate: {
            get: function() {
                return this._catchingRate;
            },

            set: function(value) {
                this._catchingRate = value;
            }
        }
    },

    onLoad: function() {
        NOTIFICATION.on(flags.ENEMY_GET_CAUGHT, this.onGetCatched, this);
        NOTIFICATION.on(flags.ENEMY_GET_ESCAPED, this.onGetEscaped, this);
    },

    start: function() {
        this.variablesInit();
    },

    variablesInit: function() {
        this.catchingRate = 1 / this.multiNum;
    },

    onGetCatched: function(event) {
        var tarName = event.msg;
        var selfName = this.enemyName;

        if (tarName.toLowerCase() === selfName.toLowerCase()) {
            console.log("enemy: " + selfName + " get caught!");
            NOTIFICATION.emit(flags.ENEMY_ESCAPED_TREASURE_MINUS);
            NOTIFICATION.emit(flags.ENEMY_CAUGHT_TREASURE_ADD, {multiNum: this.multiNum, enemyName: selfName, killMsg: this.killMsg});
        }
    },

    onGetEscaped: function(event) {
        var tarName = event.msg;
        var selfName = this.enemyName;

        if (tarName.toLowerCase() === selfName.toLowerCase()) {
            console.log("enemy: " + selfName + " get escaped!");
            NOTIFICATION.emit(flags.ENEMY_ESCAPED_TREASURE_MINUS);  
        }
    }
});
