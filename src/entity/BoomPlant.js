BoomPlant = function(tile, level){
	this._create(tile, level);
}

BoomPlant.prototype = {
	sprite: null,
	isAlive: true,

	_create: function(tile, level){
		this.sprite = game.add.sprite(tile.x*level.tileMap.tileWidth, tile.y*level.tileMap.tileHeight-level.tileMap.tileHeight, 'bombgrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3, 4, 5, 6, 7]).onComplete.add(function(){this.explode(level, level.cat)}, this);

		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;
		this.sprite.anchor.setTo(0, 0.5);
		this.doGrow();
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 2, false);
	},

	explode: function(level, cat){
		var xLeft = this.sprite.x - this.sprite.width/2 - 5;
		var xRight = this.sprite.x + this.sprite.width + 5;
		var y = this.sprite.y + this.sprite.height/2 + 5;
		var left = Utils.getMapTileAtPixel(xLeft, y, level);
		var right = Utils.getMapTileAtPixel(xRight, y, level);
		var below = Utils.getMapTileAtPixel(this.sprite.x + 5, y, level);

		if(left){
			level.tileMap.removeTile(left.x, left.y, level.mapLayer);
			level.tileMap.removeTile(left.x, left.y, level.collisionLayer);
		}

		if(right){
			level.tileMap.removeTile(right.x, right.y, level.mapLayer);
			level.tileMap.removeTile(right.x, right.y, level.collisionLayer);
		}

		if(below){
			level.tileMap.removeTile(below.x, below.y, level.mapLayer);
			level.tileMap.removeTile(below.x, below.y, level.collisionLayer);
		}

		this.isAlive = false;
		this.sprite.destroy();
		explodeFx.play();

		var dx = cat.sprite.x - this.sprite.x + 16;
		var dy = cat.sprite.y - this.sprite.y;
		var d = Math.sqrt((dx*dx + dy*dy));
		if(d < 75){
			cat._die();
		}
	},

	update: function(cat, level){

	},

	_grow: function(x, y, level){

	}
}