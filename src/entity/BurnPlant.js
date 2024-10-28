BurnPlant = function(tile, level){
	this._create(tile, level);
}

BurnPlant.prototype = {
	sprite: null,
	isAlive: true,
	tilesToBurn: null,

	_create: function(tile, level){
		this.sprite = game.add.sprite(tile.x*level.tileMap.tileWidth, tile.y*level.tileMap.tileHeight-level.tileMap.tileHeight, 'firegrowth');
		this.sprite.animations.add('grow', [0, 1, 2, 3, 4, 5]).onComplete.add(function(){ this.doBurn(); }, this);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;
		this.sprite.anchor.setTo(0, 0.5);
		this.level = level;
		this.tilesToBurn = [];

		this.sprite.animations.play('grow', 3, false);
	},

	doGrow: function(){
		this.sprite.animations.play('grow', 8, false);
	},

	doShrink: function(){
		this.sprite.animations.play('shrink', 4, false);
	},

	update: function(cat, level){
		for(var i = this.tilesToBurn.length -1; i >= 0; i--){
			var tile = this.tilesToBurn[i];

			if(tile.counter < 100){
				tile.counter++;
			}else{
				level.tileMap.removeTile(tile.x, tile.y, level.mapLayer);
				level.tileMap.removeTile(tile.x, tile.y, level.collisionLayer);
				this.tilesToBurn.splice(i, 1);
			}
		}
	},

	doBurn: function(){
		var left = Utils.getCollidingTileAtPixel(this.sprite.x - this.sprite.width/2 - 5, this.sprite.y - this.sprite.height/2, this.level);
		var right = Utils.getCollidingTileAtPixel(this.sprite.x + this.sprite.width, this.sprite.y - this.sprite.height/2, this.level);

		if(left && left.index == 380){
			this._burn(left, this.level);
		}

		if(right && right.index == 380){
			this._burn(right, this.level);
		}
	},	

	_burn: function(tile, level){
		//WHY DON'T THESE ACCEPT REFERENCES TO THE LAYER???
		var left = level.tileMap.getTileLeft(0, tile.x, tile.y);
		var right = level.tileMap.getTileRight(0, tile.x, tile.y);
		var above = level.tileMap.getTileAbove(0, tile.x, tile.y);
		var below = level.tileMap.getTileBelow(0, tile.x, tile.y);

		tile.counter = 0;

		if(tile.index == 3 || tile.index == 7){
			level.tileMap.putTile(27, tile.x, tile.y, level.mapLayer);
		}

		if(tile.index == 6){
			level.tileMap.putTile(26, tile.x, tile.y, level.mapLayer);
		}

		if(tile.index == 8){
			level.tileMap.putTile(28, tile.x, tile.y, level.mapLayer);
		}

		if(tile.index == 9){
			level.tileMap.putTile(11, tile.x, tile.y, level.mapLayer);
		}

		if(tile.index == 29){
			level.tileMap.putTile(31, tile.x, tile.y, level.mapLayer);
		}

		if(tile.index == 49){
			level.tileMap.putTile(51, tile.x, tile.y, level.mapLayer);
		}

		this.tilesToBurn.push(tile);

		
		fireFx.play();
		var me = this;
		setTimeout(function(){
			if(left && me._isBurnable(left.index)){
				me._burn(left, level);
			}

			if(right && me._isBurnable(right.index)){
				me._burn(right, level);
			}

			if(above && me._isBurnable(above.index)){
				me._burn(above, level);
			}

			if(below && me._isBurnable(below.index)){
				me._burn(below, level);
			}
		}, 300);
	},

	_isBurnable: function(index){
		return index == 3 || index == 6 || index == 7 || index == 8 || index == 26 ||
		 index == 27 || index == 28 || index == 9 || index == 29 || index == 49 ||
		  index == 11 || index == 31 || index == 51;
	}
}