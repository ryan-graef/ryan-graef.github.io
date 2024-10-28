EatPlant = function(tile, level){
	this._create(tile, level);
}

EatPlant.prototype = {
	sprite: null,
	isAlive: true,
	isReadyToEat: false,

	_create: function(tile, level){
		this.sprite = game.add.sprite(tile.x*level.tileMap.tileWidth, tile.y*level.tileMap.tileHeight-level.tileMap.tileHeight*2, 'trapgrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3, 4, 5, 6]).onComplete.add(function(){ this.isReadyToEat = true;}, this);
		this.sprite.animations.add('eat', [7, 6, 7, 6]);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.doGrow();
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 3, false);
	},

	doEat: function(){
		this.sprite.animations.play('eat', 4, false);
	},

	update: function(cat, level){
		if(this.isReadyToEat){
			level.bugs.forEach(function(bug){
				if(game.physics.arcade.intersects(this.sprite.body, bug.sprite.body)){
					if(bug.alive && !bug.isDieing){
						this.doEat();
						bug.kill()
						eatFx.play();
					}
				}
			}, this);
		}
	}
}