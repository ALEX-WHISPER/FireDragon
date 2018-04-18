cc.Class({
    extends: cc.Component,

    properties: {
        startPanel: {
            default:null,
            type: cc.Node
        },

        playingPanel: {
            default: null,
            type: cc.Node
        },

        gameOverPanel: {
            default: null,
            type: cc.Node
        },

        pausedPanel: {
            default: null,
            type: cc.Node
        },

        scoreLable: {
            default: null,
            type: cc.Label
        },

        timeBar: {
            default: null,
            type: cc.ProgressBar
        },
    },

    onLoad: function() {
        this.startPanel.active = true;
    },

    onEnable: function() {
        this.uiEventsRegisration();
    },

    onDisable: function() {
        this.uiEventsDeRegistration();
    },

    uiEventsRegisration: function() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
        NOTIFICATION.on(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.on(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.on(GAME_RESTART, this.onGameRestart, this);
        NOTIFICATION.on(GAME_RESUME, this.onGameResume, this);
        
        NOTIFICATION.on(SCORE_CHANGED, this.onScoreChanged, this);
        NOTIFICATION.on(STAR_DISAPPEARING, this.onTimeFlowing, this);
        NOTIFICATION.on(PROGRESSBAR_FOLLOWSTAR, this.onProgressBarFollowStar, this);
    },

    uiEventsDeRegistration: function() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);
        NOTIFICATION.off(GAME_OVER, this.onGameOver, this);
        NOTIFICATION.off(GAME_PAUSED, this.onGamePaused, this);
        NOTIFICATION.off(GAME_RESUME, this.onGameResume, this);                
        NOTIFICATION.off(GAME_RESTART, this.onGameRestart, this);
           
        NOTIFICATION.off(SCORE_CHANGED, this.onScoreChanged, this);
        NOTIFICATION.off(STAR_DISAPPEARING, this.onTimeFlowing, this);
        NOTIFICATION.off(PROGRESSBAR_FOLLOWSTAR, this.onProgressBarFollowStar, this);        
    },

    onGameStart: function() {
        if (this.startPanel.active === true) {
            this.startPanel.active = false;
        }

        if (this.playingPanel.active === false) {
            this.playingPanel.active = true;
        }
    },

    onGameOver: function(event) {
        if (this.gameOverPanel.active === false) {
            this.gameOverPanel.active = true;
        }
        cc.find("mainWindow/score", this.gameOverPanel).getComponent(cc.Label).string = 'Score: ' + event.score;
    },

    onGamePaused: function() {
        console.log("onGamePaused from UIView.js");
        if (this.pausedPanel.active === false) {
            this.pausedPanel.active = true;
        }
    },

    onGameResume: function() {
        if (this.pausedPanel.active === true) {
            this.pausedPanel.active = false;
        }
    },

    onGameRestart: function() {
        if (this.startPanel.active === true) {
            this.startPanel.active = false;
        }

        if (this.pausedPanel.active === true) {
            this.pausedPanel.active = false;
        }

        if (this.gameOverPanel.active === true) {
            this.gameOverPanel.active = false;
        }
    },

    //  update display string of this.scoreLable
    onScoreChanged: function(event) {
        this.scoreLable.string = 'Score: ' + event.msg;
    },

    //  update progress value of in this.timeBar
    onTimeFlowing: function(event) {
        this.timeBar.progress = event.msg;
    },

    //  update position of this.timeBar, make it follow the current star
    onProgressBarFollowStar: function(event) {
        if(this.timeBar.node.active === false) {
            this.timeBar.node.active = true;
        }
        var offset = cc.p(0, 50);
        var newPos = event.pos.add(offset);
        this.timeBar.node.setPosition(newPos);
    },
});
