CreditState = function(){ }

CreditState.prototype = {
    preload: function(){

    },

    create: function(){
        game.stage.backgroundColor = '#96fffc'
        this.effects = [];

        for(var i = 0; i < 20; i++){
            var yPos = Math.random()*game.height - 100;
            var xPos = Math.random()*(game.width + 200);
            var velocity = Math.random()*1;
            var effect = game.add.sprite(xPos, yPos, 'cloud'+(Math.round(Math.random()*4)+1));
            effect.velocity = velocity;
            effect.scale.setTo(0.5);
            this.effects.push(effect);
        }

        this.catSprite = game.add.sprite(game.world.centerX + 20, game.world.centerY, 'animcat');
        this.catSprite.animations.add('fall', [7]);
        this.catSprite.animations.play('fall', 0.5, true);
        this.catSprite.scale.x = -1;
        this.catSprite.anchor.setTo(0.5);

        this.flutterGroup = game.add.group();
        this.flutterGroup.create(game.world.centerX, game.world.centerY - 120, 'flutter-all');
        this.flutterGroup.create(game.world.centerX, game.world.centerY + 120, 'flutter-all');
        this.flutterGroup.create(game.world.centerX - 120, game.world.centerY, 'flutter-all');
        this.flutterGroup.create(game.world.centerX + 120, game.world.centerY, 'flutter-all');
        //this.flutterGroup.anchor.setTo(0.5);
        this.flutterGroup.callAll('animations.add', 'animations', 'flutter', [0,1,2,3,4,5], 3, true, true);
        this.flutterGroup.callAll('play', null, 'flutter');
        this.flutterGroup.forEach(function(flutter){
            var time = Math.random()*1000 + 1000
            var a = game.add.tween(flutter).to({y: flutter.y - 32}, time, "Linear");
            var b = game.add.tween(flutter).to({y: flutter.y}, time, "Linear");
            a.chain(b);
            b.chain(a);
            a.start();
        }, this);  

            var a = game.add.tween(this.catSprite).to({y: this.catSprite.y - 32}, 1800, "Linear");
            var b = game.add.tween(this.catSprite).to({y: this.catSprite.y}, 1800, "Linear");
            a.chain(b);
            b.chain(a);
            a.start();

        this.text = [];
        var text = game.add.bitmapText(game.world.centerX, game.height, 'font', 'Thanks for playing!', 36);
        text.anchor.setTo(0.5);
        text.originalY = text.y - game.height;
        this.text.push(text);
        var text = game.add.bitmapText(game.world.centerX, game.height+50, 'font', 'You managed to beat the game with only '+ Config.retries+' retries!', 22);
        text.anchor.setTo(0.5);
        this.text.push(text);
        text.originalY = text.y - game.height;
        var text = game.add.bitmapText(game.world.centerX, game.height+90, 'font', 'This game was created in 72 hours by a team of two', 22);
        text.anchor.setTo(0.5);
        this.text.push(text);
        text.originalY = text.y - game.height;
        var text = game.add.bitmapText(game.world.centerX, game.height+130, 'font', 'For Ludum Dare 34: Growing | Two button input.', 22);
        text.anchor.setTo(0.5);
        text.originalY = text.y - game.height;
        this.text.push(text);

        this.backButton = game.add.sprite(20, game.height - 128 - 20, 'level');
        this.backButtonArrow = game.add.sprite(this.backButton.x + 36, this.backButton.y + 36, 'back');
        this.backButton.inputEnabled = true;
        this.backButton.alpha = 0;
        this.backButtonArrow.alpha = 0;
        this.backButton.events.onInputDown.add(function(){
            game.state.start('SelectState');
        }, this);
    },

    update: function(){
        this.effects.forEach(function(effect){
            effect.x -= effect.velocity;

            if(effect.x < -200){
                effect.y = Math.random()*game.height/2;
                effect.velocity = Math.random()*2;
                effect.x = game.width + 200;
            }
        }, this);

        this.text.forEach(function(text){
            if(text.y > game.world.centerY - 100 + text.originalY){
                text.y -= 0.75;
            }else{
                if(this.backButton.alpha < 1){
                    this.backButton.alpha += 0.002;
                    this.backButtonArrow.alpha += 0.002;
                }
            }
        }, this);
    },

    render: function(){

    },
}