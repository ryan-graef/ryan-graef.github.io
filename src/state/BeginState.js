BeginState = function(){ }

BeginState.prototype = {
    preload: function(){

    },

    create: function(){
        game.stage.backgroundColor = '#96fffc'
        this.effects = [];

        backdrop = game.add.sprite(0, 0, 'backdrop');
        //game.stage.backgroundColor = '#96fffc'

        for(var i = 0; i < 10; i++){
            var yPos = Math.random()*game.height/2.2 - 100;
            var xPos = Math.random()*(game.width + 200);
            var velocity = Math.random()*1;
            var effect = game.add.sprite(xPos, yPos, 'cloud'+(Math.round(Math.random()*4)+1));
            effect.velocity = velocity;
            effect.scale.setTo(0.5);
            this.effects.push(effect);
        }

        this.titleText = game.add.bitmapText(game.world.centerX, 50, 'font', 'Flutter', 38);
        this.titleText.anchor.setTo(0.5);
        this.titleText.inputEnabled = true;
        this.titleText.alpha = 0;
           
        this.tileMap = game.add.tilemap('flat');
        this.tileMap.addTilesetImage('tileset','tileset');
        this.mapLayer = this.tileMap.createLayer('level');
        this.detailLayer = this.tileMap.createLayer('detail');

        this.catSprite = game.add.sprite(-120, 435, 'animcat');
        this.catSprite.scale.setTo(0.4);
        this.catSprite.scale.x = -0.4;
        this.catSprite.animations.add('walk', [2, 3,4,5]);
        this.catSprite.animations.play('walk', 3, true);

        this.flutter = game.add.sprite(-60, 435, 'flutter2');
        this.flutter.animations.add('flutter', [0, 1, 2, 3, 4, 5]);
        this.flutter.animations.play('flutter', 3, true);
        this.tweenUp = game.add.tween(this.flutter).to({y: 435-32}, 2000, "Linear");
        this.tweenDown = game.add.tween(this.flutter).to({y: 435}, 2000, "Linear");

        this.tweenUp.chain(this.tweenDown);
        this.tweenDown.chain(this.tweenUp);

        this.tweenUp.start();

        if(!bgm){
            bgm = game.add.audio('bgm');
        }
        if(window.location.href.indexOf("silence") != -1){
            bgmMuted = true;
        }
        if(!bgmMuted && !bgm.isPlaying){
           bgm.play('', 0, 1, true);
        }

    },

    update: function(){
        this.catSprite.x += 2;
        this.flutter.x += 2;

        if(this.catSprite.x > game.width+60){
            if(this.mapLayer.alpha > 0){
                this.mapLayer.alpha -= 0.02;
                this.detailLayer.alpha -= 0.02;
            }else{
                game.state.start('SelectState');
            }
        }

        if(this.catSprite.x > game.world.centerX){
            if(this.titleText.alpha < 1){
                this.titleText.alpha += 0.02;
            }
        }

        this.effects.forEach(function(effect){
            effect.x -= effect.velocity;

            if(effect.x < -200){
                effect.y = Math.random()*game.height/2;
                effect.velocity = Math.random()*2;
                effect.x = game.width + 200;
            }
        }, this);
    },

    render: function(){

    },
}