cc.Class({
    extends: cc.Component,

    onEnable: function() {
        NOTIFICATION.on(GAME_START, this.onGameStart, this);
    },

    onDisable: function() {
        NOTIFICATION.off(GAME_START, this.onGameStart, this);       
    },

    onGameStart: function() {
        this.setPlayerInputControl();
    },

    setPlayerInputControl: function() {
        var self = this.getComponent('Player');

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
            switch(event.keyCode) {
                case cc.KEY.left:
                    self.accLeft = true;
                    self.accRight = false;
                    break;
                case cc.KEY.right:
                    self.accLeft = false;
                    self.accRight = true;
                    break;
                case cc.KEY.escape:
                    NOTIFICATION.emit(GAME_PAUSED, {msg: 'hit Esc to pause the game'});
                    break;                    
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event) {
            switch(event.keyCode) {
                case cc.KEY.left:
                    self.accLeft = false;
                    break;
                case cc.KEY.right:
                    self.accRight = false;
                    break;
            }
        });
    },
});
