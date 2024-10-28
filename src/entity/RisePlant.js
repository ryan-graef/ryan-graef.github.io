RisePlant = function(tile, level){
	this._create(tile, level);
}

RisePlant.prototype = {
	sprite: null,
	isAlive: true,
	isReady: false,

	_create: function(tile, level){
		this.sprite = game.add.sprite(tile.x*level.tileMap.tileWidth, tile.y*level.tileMap.tileHeight-level.tileMap.tileHeight, 'jumpgrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3, 4, 5]).onComplete.add(function(){this.isReady = true}, this);
		this.sprite.animations.add('jump', [3,4,5]);
		this.sprite.anchor.setTo(0, 0.25);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.setSize(16, 1, 8, 30);
		this.sprite.body.allowGravity = false;
		this.doGrow();
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 3, false);
	},

	doShrink: function(){
		
	},

	update: function(cat){
		if(this.isReady){
			if(game.physics.arcade.intersects(this.sprite.body, cat.sprite.body)){
				if(!cat.isDieing){
					this.sprite.animations.play('jump', 4, false);
					cat.sprite.body.velocity.y = -400;
					if(!jmpFx.isPlaying){
						jmpFx.play();
					}
				}
			}
		}
	}
}