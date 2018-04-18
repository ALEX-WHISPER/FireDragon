cc.Class({
    extends: cc.Component,

    properties: {
        game: {
            default: null,
            type: cc.Node
        },

        xPosMax: 0,
        xPosMin: 0,
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,

        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

//#region Life cycle
    onLoad: function() {
        this.startPos = this.node.position;

        // set jump action on load
        this.jumpAction = this.setJumpAction();

        // accle toggle
        this.accLeft = false;
        this.accRight = false;

        // cur x speed
        this.xSpeed = 0;
    },

    // called every frame
    update: function (dt) {
        // update x speed
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        // limit the max horizontal move speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * Math.sign(this.xSpeed);
        }

        // update player's x pos
        this.node.x += this.xSpeed * dt;

        if (this.node.x <= this.xPosMin) {
            this.node.x = this.xPosMin;
            this.xSpeed = 0;
        } else if (this.node.x >= this.xPosMax) {
            this.node.x = this.xPosMax;
            this.xSpeed = 0;
        }
    },
//#endregion

    onGameStart: function() {
        this.node.runAction(this.jumpAction);
    },

    onGamePaused: function() {
        this.accLeft = this.accRight = false;
        this.xSpeed = 0;

        this.node.stopAction(this.jumpAction);
    },

    onGameResume: function() {
        this.node.y = this.startPos.y;
        this.node.runAction(this.jumpAction);
    },

    onGameOver: function() {
        this.accLeft = this.accRight = false;
        this.xSpeed = 0;

        this.node.stopAllActions();
    },

    setJumpAction: function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // call back: play jump sound
        var callback = cc.callFunc(this.playJumpSound, this);

        //  the player will jump up and down forever. And after falling back to ground, invoke the callback
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    playJumpSound: function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },
});
