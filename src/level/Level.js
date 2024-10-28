Level = function(tileMapId, main){
	this.tileMapId = tileMapId;
	currentLevelId = tileMapId;
	this.main = main;
	this._create();
}

var currentLevelId = "";
Level.prototype = {
	tileSetID: 'tileSet',
	tileMapId: null,
	tileMap: null,
	collisionLayer: null,
	mapLayer: null,
	spawnsLayer: null,

	plants: null,
	seeds: null,
	bugs: null,
	flutter: null,
	cat: null,

	finished: false,


	_create: function(){
		this.tileMap = game.add.tilemap(this.tileMapId);
		this.tileMap.addTilesetImage('tileset','tileset');
		
		this.plants = [];
		this.seeds = [];
		this.bugs = [];

		this.collisionLayer = this.tileMap.createLayer('collision');
		this.tileMap.setCollisionBetween(1, 500, true, this.collisionLayer);
		this.collisionLayer.alpha = 0;
		this.collisionLayer.resizeWorld();
		this.spawnsLayer = this.tileMap.createLayer('spawns');
		this.spawnsLayer.alpha = 0;
		this.mapLayer = this.tileMap.createLayer('level');
		//this.mapLayer.alpha= 0;
		this.detailLayer = this.tileMap.createLayer('detail');
		//this.detailLayer.alpha= 0;
		this.bridgeLayer = this.tileMap.createLayer('bridges');

		this._parseSpawnLayer();

		this.backbutton = game.add.sprite(10, game.height - 64, 'back');
        this.backbutton.inputEnabled = true;
        this.backbutton.events.onInputDown.add(function(){ game.state.start('SelectState');})

        if(this.tileMapId == "End"){
        	this.superRise = new SuperRisePlant(675,324, this);
        }
	},

	destroy: function(){
		if(this.cat){
			this.cat.destroy();
		}

		if(this.flutter){
			this.flutter.sprite.destroy();
		}

		this.plants.forEach(function(plant){
			plant.sprite.destroy();
		}, this);

		this.seeds.forEach(function(seed){
			seed.destroy();
		}, this);

		this.bugs.forEach(function(bug){
			bug.sprite.destroy();
		}, this);

		if(this.tileMap){
			this.tileMap.destroy();
			this.spawnsLayer.destroy();
			this.detailLayer.destroy();
			this.mapLayer.destroy();
			this.collisionLayer.destroy();
			this.bridgeLayer.destroy();
		}

		this.backbutton.destroy();
	},

	update: function(main){
		this.cat.update(this);

		for(var i = this.bugs.length - 1; i >= 0; i--){
			var bug = this.bugs[i];
			bug.update(this);

			if(!bug.alive){
				this.bugs.splice(i, 1);
			}
		}

		this.seeds.forEach(function(seed){
			game.physics.arcade.collide(seed, this.collisionLayer);
		}, this);

		for(var i = this.plants.length - 1; i >= 0; i--){
			var plant = this.plants[i];
			plant.update(this.cat, this);

			if(!plant.isAlive){
				this.plants.splice(i, 1);
			}
		}

		this.flutter.update(this.cat, this);

		if(!this.cat.isAlive){
			main.gameOver();
		}

		if(this.superRise){
			this.superRise.update(this.cat);
		}

		
	},

	render: function(){

	}, 

	finish: function(){
		this.destroy();
		this.main.nextLevel();
		console.log('level complete!');
	},

	_parseSpawnLayer: function(){
		var tiles = this.spawnsLayer.layer.data;
		var seedSpawnTiles = [];
		var bugSpawnTiles = [];
		var exitTile = null;
		var catSpawnTile = null;

		for(var row = 0; row < tiles.length; row++){
			for(var col = 0; col < tiles[row].length; col++){
				var tile = tiles[row][col];

				if(tile.index >= 395 && tile.index <= 399){
					seedSpawnTiles.push(tile);
				}

				if(tile.index == 394){
					bugSpawnTiles.push(tile);;
				}

				if(tile.index == 393){
					exitSpawnTile = tile;
				}

				if(tile.index == 392){
					catSpawnTile = tile;
				}
			}
		}

		this.flutter = new Flutter(exitSpawnTile.x*this.tileMap.tileWidth, exitSpawnTile.y*this.tileMap.tileHeight);
		this.cat = new Cat(catSpawnTile.x*this.tileMap.tileWidth, catSpawnTile.y*this.tileMap.tileHeight)

		bugSpawnTiles.forEach(function(tile){
			this.bugs.push(new Bug(tile.x*this.tileMap.tileWidth, tile.y*this.tileMap.tileHeight));
		}, this);

		seedSpawnTiles.forEach(function(tile){
			var index = "";
			switch(tile.index){
				case 395:
					index = "riseplant";
				break;
				case 396:
					index = 'burnplant';
				break;
				case 397:
					index = 'eatplant';
				break;
				case 398:
					index = 'boomplant';
				break;
				case 399:
					index = 'bridgeplant';
				break;
			}
			var sprite = game.add.sprite(tile.x*this.tileMap.tileWidth, tile.y*this.tileMap.tileHeight, index);
			game.physics.enable(sprite, Phaser.Physics.ARCADE);
			this.seeds.push(sprite);
		}, this);
		
	},

	_createPlant: function(tile){
		console.log("I want to plant " + tile.hasSeed);

		var plant;
		switch(tile.hasSeed){
			case "riseplant":
				plant = new RisePlant(tile, this);
			break;
			case "burnplant":
				plant = new BurnPlant(tile, this);
			break;
			case "eatplant":
				plant = new EatPlant(tile, this);
			break;
			case "boomplant":
				plant = new BoomPlant(tile, this);
			break;
			case "bridgeplant":
				plant = new BridgePlant(tile, this);
			break;
		}

		this.plants.push(plant);
	}
}