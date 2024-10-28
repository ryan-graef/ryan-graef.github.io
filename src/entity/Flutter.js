Flutter = function(x, y){
	this._create(x, y);
}

Flutter.prototype = {
	sprite: null,
	tweenUp: null,
	tweenDown: null,

	_create: function(x, y){
		this.sprite = game.add.sprite(x, y, 'flutter'+Math.round(Math.random()*5+1));
		this.sprite.animations.add('flutter', [0, 1, 2, 3, 4, 5]);
		this.sprite.animations.play('flutter', 8, true);
		this.sprite.anchor.setTo(0.5);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.tweenUp = game.add.tween(this.sprite).to({y: y-32}, 2000, "Linear");
		this.tweenDown = game.add.tween(this.sprite).to({y: y}, 2000, "Linear");

		this.tweenUp.chain(this.tweenDown);
		this.tweenDown.chain(this.tweenUp);

		this.tweenUp.start();
	},

	update: function(cat, level){
		if(game.physics.arcade.intersects(this.sprite.body, cat.sprite.body)){
			if(!cat.isDieing && !cat.isSpawning){
				cat.despawn(level);
			}
		}
	}
}