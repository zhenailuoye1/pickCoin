var resetGame = false;

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        bonePrefab: {
            default: null,
            type: cc.Prefab
        },
        fishPrefab: {
            default: null,
            type: cc.Prefab
        },
        gameOverNode: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        startGameNode: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.gameOverNode.active = false;
        this.fishPool = new cc.NodePool('Fish');
        this.bonePool = new cc.NodePool('Bone');
        this.fishContainer = [];
        this.boneContainer = [];
        this.fishInterval = 2;
        this.fishTotalTime = 2;
        this.boneInterval = 3;
        this.score = 0;
        this.isPlay = false;
        this.player.getComponent('Player').enabled = false;
        if (resetGame) {
            this.startGame();
        }
        //this.scheduleUpdate();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.fishTotalTime += dt;
        if (this.fishTotalTime >= this.fishInterval && this.isPlay) {
            this.spawnnewFish();
            this.fishTotalTime = 0;
        }
    },

    gameOver: function () {
        // this.currentBone.stopAllActions();
        // this.currentFish.stopAllActions();
        for (var i in this.fishContainer) {
            this.fishContainer[i].stopAllActions();
        }
        for (var i in this.boneContainer) {
            this.boneContainer[i].stopAllActions();
        }
        this.player.getComponent('Player').enabled = false;
        window.sessionStorage.setItem('score',this.score);
        //this.unschedule(this.spawnnewFish);
        this.unschedule(this.spawnnewBone);
        this.gameOverNode.active = true;
    },

    restart: function () {
        resetGame = true;
        cc.director.loadScene('game');
    },

    startGame: function () {
        this.spawnnewBone();
        // this.spawnnewFish();
        //this.schedule(this.spawnnewFish, this.fishInterval);
        this.schedule(this.spawnnewBone, this.boneInterval);
        this.startGameNode.setPositionX(2000);
        this.player.getComponent('Player').enabled = true;
        this.isPlay = true;
    },

    spawnnewBone: function () {
        var newBone = null;
        if (this.bonePool.size() > 0) {
            newBone = this.bonePool.get(this);
        } else {
            newBone = cc.instantiate(this.bonePrefab);
            this.boneContainer.push(newBone);
        }
        this.node.addChild(newBone);
        newBone.setPosition(this.getnewFallPosition());
        newBone.getComponent('Bone').fall(this.randX, this);
    },

    spawnnewFish: function () {
        var newFish = null;
        if (this.fishPool.size() > 0) {
            newFish = this.fishPool.get(this);
        } else {
            newFish = cc.instantiate(this.fishPrefab);
            this.fishContainer.push(newFish);
        }
        this.node.addChild(newFish);
        newFish.setPosition(this.getnewFallPosition());
        newFish.getComponent('Fish').fall(this.randX, this);
    },

    getnewFallPosition: function () {
        this.randX = cc.randomMinus1To1() * cc.winSize.width/2;
        this.randY = cc.winSize.height/2 + 120;
        return cc.p(this.randX, this.randY);
    },
});
