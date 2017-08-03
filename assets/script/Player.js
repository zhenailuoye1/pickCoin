cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.destinationX = 0;
        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.destinationX > cc.winSize.width/2 - this.node.width/2) {
            this.destinationX = cc.winSize.width/2 - this.node.width/2
        } else if (this.destinationX < -cc.winSize.width/2 + this.node.width/2) {
            this.destinationX = -cc.winSize.width/2 + this.node.width/2;
        }
        this.node.x = this.destinationX;
    },

    setInputControl: function () {
        var self = this;

        // touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                if (touchLoc.x >= cc.winSize.width/2) {
                    self.destinationX =  touchLoc.x/2;
                } else {
                    self.destinationX =  touchLoc.x - cc.winSize.width/2;
                }
                // don't capture the event
                return true;
            },
            onTouchMoved: function(touch, event) {
                var touchLoc = touch.getLocation();
                self.destinationX =  touchLoc.x - cc.winSize.width/2;
                // don't capture the event
                return true;
            },
            onTouchEnded: function(touch, event) {
                
            }
        }, self.node);
    },

});
