var enemyBase = require("EnemyBase");

cc.Class({
    extends: enemyBase,    

    properties: {

    },

    onGetCatched: function() {
        enemyBase.prototype.onGetCatched.call(this);
    }
});
