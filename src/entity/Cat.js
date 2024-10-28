Cat = function(x, y){

	this._create(x, y);
}

Cat.prototype = {
	sprite: null,
	maxSpeed: 200,
	friction: 20, //maxspeed/10
	seeds: null,
	isAlive: true,
	dieTween: null,
	isDieing: false,
	isSpawning: true,

	_create: function(x, y){
		this.sprite = game.add.sprite(x, y, 'animcat');
		this.sprite.anchor.setTo(0.5);
		this.sprite.scale.setTo(0.001);
		this.sprite.animations.add('idle', [0,1]);
		this.sprite.animations.add('walk', [2, 3,4,5]);
		this.sprite.animations.add('fall', [6]);

		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.allowGravity = false;
		this.sprite.body.setSize(150 - 32, 120 - 16, 0, 0)
		this.seeds = [];

		this.dieTween = game.add.tween(this.sprite.scale);
		this.dieTween.to({x: 10*(this.sprite.scale.x < 0 ? 1 : -1), y: 10}, 300, Phaser.Easing.Linear.None);
		
		this.dieTween.onComplete.add(function(){ this.isAlive = false;}, this);

		this.spawnTween = game.add.tween(this.sprite.scale);
		this.spawnTween.to({x: 0.4, y: 0.4}, 350, Phaser.Easing.Linear.None);
		this.spawnTween.onComplete.add(function(){ if(this.sprite.alive){this.isSpawning = false; this.sprite.body.allowGravity = true;}}, this);
		this.spawnTween.start();
		spawnFx.play();
	},

	update: function(currentLevel){
		if(!this.isDieing && !this.isSpawning){
			game.physics.arcade.collide(this.sprite, currentLevel.collisionLayer, this._levelCollisionHandler, null, this);

			if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
				this.sprite.scale.x = 0.4;
				if(this.sprite.body.velocity.x > -this.maxSpeed){
					this.sprite.body.velocity.x -= this.friction;
				}
			}else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
				this.sprite.scale.x = -0.4;
				if(this.sprite.body.velocity.x < this.maxSpeed){
					this.sprite.body.velocity.x += this.friction;
				}
			}else{
				if(this.sprite.body.velocity.x > 0){
					this.sprite.body.velocity.x -= this.friction;
				}else if(this.sprite.body.velocity.x < 0){
					this.sprite.body.velocity.x += this.friction;
				}
			}

			if(this.sprite.body.velocity.x == 0){
				this.sprite.animations.play('idle', 2, false);
			}else{
				this.sprite.animations.play('walk', 8, false);
			}

			if(!this.sprite.body.onFloor()){
				this.sprite.animations.play('fall', 2, false);
			}

			currentLevel.bugs.forEach(function(bug){
				game.physics.arcade.collide(this.sprite, bug.sprite, this._bugCollisionHandler, null, this);
			}, this);

			currentLevel.seeds.forEach(function(seed){
				game.physics.arcade.collide(this.sprite, seed, this._seedCollisionHandler, null, this);
			}, this);

			this._tryToPlantSeeds(currentLevel);
		}
	},

	_tryToPlantSeeds: function(currentLevel){
		var mapTile = Utils.getMapTileAtPixel(this.sprite.x - this.sprite.width/3, this.sprite.y + this.sprite.height/2, currentLevel);
		if(mapTile && mapTile.index == 2 && this.seeds.length > 0 && !mapTile.hasSeed){
			var seed = this.seeds.splice(0, 1)[0];
			this._drawSeeds();
			mapTile.hasSeed = seed.key;
			seed.destroy();
			currentLevel._createPlant(mapTile);
			stepFx.play();
		}
	},

	despawn: function(level){
		this.despawnTween = game.add.tween(this.sprite.scale);
		this.despawnTween.to({x: 0.01, y: 0.01}, 700, Phaser.Easing.Linear.None);
		this.despawnTween.onComplete.add(function(){level.finish()}, this);
		this.despawnTween.start();
		this.sprite.body.allowGravity = false;
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;
		this.isSpawning = true;
		advanceFx.play();
	},

	_die: function(){
		this.sprite.animations.play('fall', 2, true);
		this.dieTween.start();
		this.isDieing = true;
		this.sprite.body.allowGravity = false;
		hurtFx.play();
		this.sprite.bringToTop();
		Config.retries++;
	},

	_levelCollisionHandler: function(cat, tile){
		if(tile && tile.index == 380){
			this._die();
			EventTracking.logEvent('die-to-thorns', 'Level: '+currentLevelId);
		}
	},

	_bugCollisionHandler: function(cat, bug){
		if(!bug.animations._anims.die.isPlaying){
			this._die();
			EventTracking.logEvent('die-to-bees', 'Level: '+currentLevelId);
		}
	},

	_seedCollisionHandler: function(cat, seed){
		this.seeds.push(game.add.sprite(84 + (seed.width + 20) * this.seeds.length, game.height - seed.height - 20, seed.key));
		seed.destroy();
		stepFx.play();
	},

	_drawSeeds: function(){
		this.seeds.forEach(function(seed, index){
			seed.x = 84 + (seed.width + 20) * index;
			seed.y = game.height - seed.height - 20;
		}, this);
	},

	destroy: function(){
		this.seeds.forEach(function(seed){
			seed.destroy();
		}, this);

		this.seeds = [];

		this.sprite.destroy();
	}
}