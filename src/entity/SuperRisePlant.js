SuperRisePlant = function(x, y, level){
	this._create(x, y, level);
}

SuperRisePlant.prototype = {
	sprite: null,
	isAlive: true,
	isReady: false,

	_create: function(x, y, level){
		this.sprite = game.add.sprite(x, y, 'giantjumpgrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3, 4, 5]).onComplete.add(function(){this.isReady = true}, this);
		this.sprite.animations.add('jump', [3,4,5]);
		this.sprite.anchor.setTo(0.5, 0.25);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.setSize(128, 256, 64, 96);
		this.sprite.body.allowGravity = false;
		this.doGrow();
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 1, false);
	},

	doShrink: function(){
		
	},

	update: function(cat){
		if(this.isReady){
			if(game.physics.arcade.intersects(this.sprite.body, cat.sprite.body)){
				if(!cat.isDieing){
					this.sprite.animations.play('jump', 4, false);
					cat.sprite.body.velocity.y = -1000;
					if(!jmpFx.isPlaying){
						jmpFx.play();
					}
				}
			}
		}
	}
}