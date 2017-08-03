cc.Class({
    extends: cc.Component,

    properties: {
        fallDuration: 0,
    },

    // use this for initialization
    onLoad: function () {
        //this.fallDuration = 1;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(cc.rectIntersectsRect(this.game.player.getBoundingBox(), this.node.getBoundingBox())){  
            this.game.score += 1;
            // 更新 scoreDisplay Label 的文字
            this.game.scoreDisplay.string = '得分：' + this.game.score.toString();
            this.despawnOwn(null, true);
        }
        // if (this.node.position.y = -cc.winSize.height/2) {
        //     this.despawnFish();
        // }
    },

    fall: function (randX, game) {
        var down = cc.moveTo(this.fallDuration, cc.p(randX, -cc.winSize.height/2 -120)).easing(cc.easeCubicActionIn());
        this.game = game;
        var callback = cc.callFunc(this.despawnOwn, this, false);
        this.node.runAction(cc.sequence(down, callback));
    },

    despawnOwn: function (fish, hasAction) {
        if (hasAction) {
            this.node.stopAllActions();
        }
        this.game.fishPool.put(this.node);
        // this.game.spawnnewFish();
    },
});
