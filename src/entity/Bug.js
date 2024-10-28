Bug = function(x, y){

	this._create(x, y);
}

Bug.prototype = {
	sprite: null,
	direction: 0,
	maxSpeed: 80,
	friction: 8,
	alive: true,
	isDieing: false,

	_create: function(x, y){
		this.sprite = game.add.sprite(x, y, 'hornets');
		this.sprite.anchor.setTo(0.5);
		this.sprite.scale.setTo(0.4);
		this.sprite.animations.add('fly', [0,1,2,3,2,1]);
		this.sprite.animations.add('die', [4,5,6,7]).onComplete.add(function(){
			this.sprite.destroy();
			this.alive = false;
		}, this);
		this.direction = (Math.random()*2 -1) >= 0 ? 1 : -1;
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.bounce.setTo(0.3);
	},

	update: function(currentLevel){
		game.physics.arcade.collide(this.sprite, currentLevel.collisionLayer, this._levelCollisionHandler, null, this);

		if(this.alive && !this.isDieing){

			this.sprite.scale.x = this.direction*0.3;
			if(this.direction == -1){
				if(this.sprite.body.velocity.x > -this.maxSpeed){
					this.sprite.body.velocity.x -= this.friction;
				}

				if(!Utils.getCollidingTileAtPixel(this.sprite.x - currentLevel.tileMap.tileWidth, this.sprite.y + this.sprite.height/2, currentLevel)){
					this.direction = 1;
				}
			}else{
				if(this.sprite.body.velocity.x < this.maxSpeed){
					this.sprite.body.velocity.x += this.friction;
				}

				if(!Utils.getCollidingTileAtPixel(this.sprite.x + currentLevel.tileMap.tileWidth, this.sprite.y + this.sprite.height/2, currentLevel)){
					this.direction = -1;
				}
			}	

			this.sprite.animations.play('fly', Math.random()*2 +1, false);
		}	
	},

	_levelCollisionHandler: function(me, level){
		if(me.body.blocked.right){
			this.direction = -1;
		}else if(me.body.blocked.left){
			this.direction = 1;
		}
	},

	kill: function(){
		this.sprite.animations.play('die', 4, false);
		this.isDieing = true;
		this.sprite.body.velocity.x = 0;
		this.sprite.body.setSize(0, 0, 0, 0);
	}
}
