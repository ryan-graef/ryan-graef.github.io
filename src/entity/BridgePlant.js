BridgePlant = function(tile, level){
	this._create(tile, level);
}

BridgePlant.prototype = {
	sprite: null,
	isAlive: true,
	spriteIndex: 0,

	_create: function(tile, level){
		this.sprite = game.add.sprite(tile.x*level.tileMap.tileWidth, tile.y*level.tileMap.tileHeight-level.tileMap.tileHeight, 'risegrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3]).onComplete.add(function(){this.doShrink()}, this);
		this.sprite.animations.add('shrink', [3, 2, 1, 0]);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 8, false);
	},

	doShrink: function(){
		this.sprite.animations.play('shrink', 4, false);
	},

	update: function(cat, level){
		var xLeft = this.sprite.x - this.sprite.width/2 - 5;
		var xRight = this.sprite.x + this.sprite.width*1 + 5
		var y = this.sprite.y + this.sprite.height + 5
		var left = Utils.getCollidingTileAtPixel(xLeft, y, level);
		var right = Utils.getCollidingTileAtPixel(xRight, y, level);

		if(!left){
			this._grow(Math.floor(xLeft/level.tileMap.tileWidth), Math.floor(y/level.tileMap.tileHeight), level);
		}

		if(!right){
			this._grow(Math.floor(xRight/level.tileMap.tileWidth), Math.floor(y/level.tileMap.tileHeight), level);
		}
	},

	_grow: function(x, y, level){
		//WHY DON'T THESE ACCEPT REFERENCES TO THE LAYER???
		var left = level.tileMap.getTileLeft(3, x, y);
		var right = level.tileMap.getTileRight(3, x, y);
		this.spriteIndex++;

		level.tileMap.putTile((this.spriteIndex % 2 == 1 ? 4 : 5), x, y, level.bridgeLayer);
		if(!level.tileMap.getTile(x, y, level.mapLayer)){
			level.tileMap.putTile(283, x, y, level.mapLayer);
		}
		level.tileMap.putTile(400, x, y, level.collisionLayer);
		this.doGrow();
		bridgeFx.play();

		var me = this;
		setTimeout(function(){
			if(left.index == -1){
				me._grow(x-1, y, level);
			}

			if(right.index == -1){
				me._grow(x+1, y, level);
			}
		}, 400);
	}
}