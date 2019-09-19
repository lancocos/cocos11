// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        ctx:null,
        pos_start:null,
        HeroPrefab: {
            default: null,
            type: cc.Prefab
        },
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
     	this.ctx = this.node.getComponent(cc.Graphics);
     	if (!this.ctx) this.ctx = this.addComponent(cc.Graphics);
     	var that=this;
        var listener = {
    			event: cc.EventListener.TOUCH_ONE_BY_ONE,
    			onTouchBegan: function (touch, event) {
        			that.pos_start = touch.getLocation();
        			that.pos_start = that.node.parent.convertToNodeSpaceAR(that.pos_start);
        			return true; //这里必须要写 return true
    			},
    			onTouchMoved: function (touch, event) {
       				
       				
    			},
    			onTouchEnded: function (touch, event) {
    				
       					var pos_end = touch.getLocation();
       					pos_end = that.node.parent.convertToNodeSpaceAR(pos_end);
       					
       				
       					
       					that.ctx.clear();
						that.ctx.lineWidth = 5;
						that.ctx.strokeColor = cc.Color.RED;
					
						that.ctx.moveTo(that.pos_start.x,that.pos_start.y);
						that.ctx.lineTo(pos_end.x,pos_end.y);
						
						//cc.log("draw line from:["+parseInt(that.pos_start.x)+","+parseInt(that.pos_start.y)+"] to ["+parseInt(pos_end.x)+","+parseInt(pos_end.y)+"] ok?");
						that.ctx.stroke();    
					
						
						   

    			},
    			onTouchCancelled: function (touch, event) {
       				
    			},
		};
		// 绑定单点触摸事件
		cc.eventManager.addListener(listener, this.node);
		this.spawnNewWords();
    },

    start () {
    	
    },
  
    spawnNewWords:function(){
    	var words = [
    	'hello', 'world','cocos' ,"is","interesting","abc"
    	];
    	for (var i = 5; i >= 0; i--) {
    		var newWords = cc.instantiate(this.HeroPrefab);
    		//this.node.addChild(newWords);
    		newWords.setWords(words[i]);
    	}
    },
   
  
    // update (dt) {},
});
