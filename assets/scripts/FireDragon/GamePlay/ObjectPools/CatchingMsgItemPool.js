cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: cc.Prefab,
        maxCount: 30,

        itemPool: {
            get: function() {
                return this._itemPool;
            },

            set: function(value) {
                this._itemPool = value;
            },

            visible: false
        }
    },

    onLoad: function() {
        this.poolInit();
    },

    poolInit: function() {
        this.itemPool = new cc.NodePool();

        for (let i = 0; i < this.maxCount; i++) {
            let item = cc.instantiate(this.itemTemplate);
            this.itemPool.put(item);
        }
    }
});
