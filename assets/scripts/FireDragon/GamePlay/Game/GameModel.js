var enemyBase = require("EnemyBase");
var flags = require("GameFlags");

cc.Class({
    extends: cc.Component,

    editor: {
        executionOrder: -2
    },

    properties: () => ({
        catchActionInterval: 2,

        //#region Data
        curVoucherPoint: {
            get: function() {return this._curVoucherPoint;},
            visible: false
        },

        curTreasure: {
            get: function() { return this._curTreasure;},
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
        
        enemies: {
            default: [],
            type: [enemyBase]
        },

        curEnemyIndex: {
            default: 0,
            visible: false
        },

        totalCardinal: {
            default: 0,
            visible: false
        },
    }),

    onLoad: function() {
        this.gameValuesInit();
    },

    start: function() {
        this.selection_sort();  //  after sorting, the enemy array has been sorted ascendingly basic on cardinalNum

        for(let i = 0; i < this.enemies.length; i++) {
            console.log(this.enemies[i].enemyName + ": " + this.enemies[i].cardinalNum);
        }

        //  calc the total cardinal number, to confirm the spawning rate of each enemy
        for (let i = 0; i < this.enemies.length; i++) {
            this.totalCardinal += this.enemies[i].cardinalNum;
        }

        //  calc the spawning rate of each enemy
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].spawningRate = this.enemies[i].cardinalNum / this.totalCardinal;
            if (i > 0) this.enemies[i].spawningRate += this.enemies[i - 1].spawningRate;
            console.log(this.enemies[i].enemyName + "'s spawningRange: " + this.enemies[i].spawningRate);
        }
    },

    startHangingUp: function() {
        this.schedule(this.onStartSpawning, this.catchActionInterval);
    },

    pauseHangingUp: function() {
        this.unschedule(this.onStartSpawning, this);
    },

    onStartSpawning: function() {
        this.enemySpawner();
        this.enemyCatcher();
    },

    enemySpawner: function() {
        let calcSpawningRate = cc.random0To1();
        for(let i = 0; i < this.enemies.length; i++) {
            if (calcSpawningRate <= this.enemies[i].spawningRate) {
                this.curEnemyIndex = i;
                break;
            }
        }
        // this.curEnemyIndex = Math.floor(Math.random() * this.enemies.length);
        console.log("CalcSpawningNum: " + calcSpawningRate + ", spawned enemy: " + this.enemies[this.curEnemyIndex].enemyName);
    },

    enemyCatcher: function() {
        //  randomize a num as the catching rate
        var calcCatchingRate = Math.random();
        var enemyCatchingRate = this.enemies[this.curEnemyIndex].catchingRate;
        console.log("CalcCatchingRate: " + calcCatchingRate + ", RealCatchingRate: " + enemyCatchingRate);

        if (calcCatchingRate <= enemyCatchingRate) {
            //  enemy get caught
            NOTIFICATION.emit(flags.ENEMY_GET_CAUGHT, {msg: this.enemies[this.curEnemyIndex].enemyName});
        } else {
            //  enemy get escaped
            NOTIFICATION.emit(flags.ENEMY_GET_ESCAPED, {msg: this.enemies[this.curEnemyIndex].enemyName});
        }

        NOTIFICATION.emit(flags.ENEMY_CATCH_ATTEMPT, {msg: this.enemies[this.curEnemyIndex].enemyName});
    },

    setNewTreasure: function(newTreasure) {
        this._curTreasure = newTreasure;
    },

    setNewMag: function(newMag) {
        this._curMag = newMag;
    },

    setNewMagInterval: function(newMagInterval) {
        this._magInterval = newMagInterval;
    },

    selection_sort: function() {
        for (let i = 0; i < this.enemies.length; i++) {
            let minCardinal = this.enemies[i].cardinalNum;
            let minIndex = i;

            for (let j = i; j < this.enemies.length; j++) {
                if (this.enemies[j].cardinalNum < minCardinal) {
                    minCardinal = this.enemies[j].cardinalNum;
                    minIndex = j;
                }
            }

            if (minIndex != i) {
                let temp = this.enemies[minIndex];
                this.enemies[minIndex] = this.enemies[i];
                this.enemies[i] = temp;
            }
        }
    },

    //  FOR DEVELOPER TESTING
    gameValuesInit: function() {
        this._curVoucherPoint = 20;
        this._curTreasure = 100009;
        this._curMag = 1;
        this._magInterval = 1;
        this._treasurePerPoint = 2000;
    }
});
