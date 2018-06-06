
cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,

        game: {
            default: null,
            serializable: false
        }
    },

    //  get the distance between star and player
    getPlayerDistance: function() {
        return cc.pDistance(this.node.position, this.game.player.getPosition());
    },

    //  get called when the distance is close enough
    onPickedup: function() {
        this.game.starSpawner();    //  instantiate a new star
        this.game.gainScore();
        this.node.destroy();
    },

    //  detect the distance every frame
    update: function() {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPickedup();  //  pick this star
            return;
        }

        var opacityRatio = 1 - this.game.elapsedTime / this.game.starLifeTime;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
});
