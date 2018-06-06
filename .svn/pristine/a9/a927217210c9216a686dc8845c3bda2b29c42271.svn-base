cc.Class({
    extends: cc.Component,

    properties: {
        fadeInDuration: 1,
        existDuration: 2,
        fadeOutDuration: 1,

        hintItemArray:[cc.String],
        label_miniHint: cc.Label,
    },

    onLoad: function() {
        this.initItemTempArray();
    },

    start: function() {
        this.showNextHint();
        this.label_miniHint.node.runAction(this.setFadingAction());
    },

    initItemTempArray: function() {
        this.hintItemTempArray = [];
        for (let i = 0; i < this.hintItemArray.length; i++) {
            this.hintItemTempArray = cc.js.array.copy(this.hintItemArray);
        }
    },

    setFadingAction: function() {
        this.label_miniHint.node.opacity = 0;
        let fadeIn = cc.fadeIn(this.fadeInDuration);
        let delay = cc.delayTime(this.existDuration);
        let fadeOut = cc.fadeOut(this.fadeOutDuration);

        return cc.repeatForever(cc.sequence(fadeIn, delay, fadeOut, cc.callFunc(this.showNextHint.bind(this))));
    },

    showNextHint: function() {
        if (this.hintItemTempArray.length <= 0) {
            this.initItemTempArray();
        }
        let randomIndex = Math.floor(Math.random() * this.hintItemTempArray.length);
        this.label_miniHint.string = this.hintItemTempArray[randomIndex];
        cc.js.array.removeAt(this.hintItemTempArray, randomIndex);
    }
});
