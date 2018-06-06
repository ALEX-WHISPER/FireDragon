var Flags = require("GameFlags");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onHitMainButton: function() {
        NOTIFICATION.emit(Flags.GAME_HIT_MAIN);
    },

    onReCharge: function() {
        NOTIFICATION.emit(Flags.GAME_2_MALL);
    },

    onMagAdd: function() {
        NOTIFICATION.emit(Flags.MAG_ADD);
    },

    onMagMinus: function() {
        NOTIFICATION.emit(Flags.MAG_MINUS);        
    },
});
