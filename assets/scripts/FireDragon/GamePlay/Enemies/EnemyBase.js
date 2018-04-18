cc.Class({
    extends: cc.Component,

    properties: {
        enemyName: '',
        cardinalNum: 0,

        spawningRate: {
            get: function() {
                return this._spawningRate;
            },

            set: function(value) {
                this._spawningRate = value;
            }
        },

        killMsg: '金币: + ',
    },

    onGetCatched: function() {
        
    },
});
