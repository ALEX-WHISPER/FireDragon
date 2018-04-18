
cc.Class({
    extends: cc.Component,

    properties: {
        reloadOnGameOver: false,
        readyToPlay: false,

        //  star prefab
        startPrefab: {
            default: null,
            type: cc.Prefab
        },

        //  disappear duration of stars
        starLife_MaxDuration: 0,
        starLife_MinDuration: 0,

        //  ground node, to get the ground height
        ground: {
            default: null,
            type: cc.Node
        },

        //  player node, to get the player's jump height
        player: {
            default: null,
            type: cc.Node
        },

        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

//#region Life cycle
    onEnable: function() {
        this.eventsRegistration();
    },

    onLoad: function() {
        this.varsInitOnLoad();
    },

    update: function(dt) {
        if (!this.readyToPlay) {
            return;
        }
        if (this.elapsedTime > this.starLifeTime) {
            this.gameOver();
            return;
        }
        this.elapsedTime += dt;
        
        var progressValue = 1 - this.elapsedTime / this.starLifeTime;
        NOTIFICATION.emit(STAR_DISAPPEARING, {msg: progressValue.toString()});
    },

    onDisable: function() {
        this.eventsDeRegistration();
    },
//#endregion

//#region Game logic
    eventsRegistration: function() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
        NOTIFICATION.on(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.on(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.on(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.on(GAME_RESTART, this.onGameRestart, this);        
    },

    eventsDeRegistration: function() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);
        NOTIFICATION.off(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.off(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.off(GAME_RESUME, this.onGameResume, this);
        NOTIFICATION.off(GAME_RESTART, this.onGameRestart, this);        
    },

    varsInitOnLoad: function() {
        this.groundY = this.ground.y + this.ground.height/2;

        //  initial variables
        this.elapsedTime = 0;
        this.starLifeTime = 0;
        this.score = 0;
    },

    onGameStart: function() {
        this.starSpawner();
        this.readyToPlay = true;
        this.player.getComponent('Player').onGameStart();
    },

    onGameOver: function() {
        this.readyToPlay = false;
        this.player.getComponent('Player').onGameOver();
    },

    onGamePaused: function() {
        this.readyToPlay = false;
        this.player.getComponent('Player').onGamePaused();
    },

    onGameResume: function() {
        this.readyToPlay = true;
        this.player.getComponent('Player').onGameResume();
    },

    onGameRestart: function() {
        cc.director.loadScene('main');
    },

    starSpawner: function() {
        var newStar = cc.instantiate(this.startPrefab);
        var starPos = this.getNewStarPosition();

        this.node.getChildByName("GamePlay").addChild(newStar);

        //  set reference of property: 'game' in 'Star.js', to make bridge for stars to get player's motion
        newStar.getComponent('Star').game = this;
        newStar.setPosition(starPos);
        NOTIFICATION.emit(PROGRESSBAR_FOLLOWSTAR, {pos: starPos});

        this.starLifeTime = this.starLife_MinDuration + cc.random0To1() * (this.starLife_MaxDuration - this.starLife_MinDuration);
        this.elapsedTime = 0;
    },

    getNewStarPosition: function() {
        var randX = 0;
        var randY = 0;
        
        randX = cc.randomMinus1To1() * this.node.width/2;
        randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        return cc.p(randX, randY);
    },

    gainScore: function() {
        this.score += 1;
        // this.scoreLable.string = this.scoreHintText + this.score.toString();
        NOTIFICATION.emit(SCORE_CHANGED, {msg: this.score.toString()});
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function() {
        NOTIFICATION.emit(GAME_OVER, {msg: 'gameOver, trigger to call GAME_OVER event', score: this.score.toString()});
    },
//#endregion
});