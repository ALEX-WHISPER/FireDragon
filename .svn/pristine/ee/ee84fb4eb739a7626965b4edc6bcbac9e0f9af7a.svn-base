cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onClickPlay: function() {
        NOTIFICATION.emit(GAME_START, {msg: 'onClickPlay, trigger to enter game entry'});
    },

    onClickResume: function() {
        NOTIFICATION.emit(GAME_RESUME, {msg: 'onClickResume, trigger to resume the game'});
    },
    
    onClickRestart: function() {
        NOTIFICATION.emit(GAME_RESTART, {msg: 'onClickRestart, trigger to restart the game'});
    },
});
