InstructionsState = function(){ }

InstructionsState.prototype = {
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
            

        this.text1 = game.add.bitmapText(game.world.centerX, 180, 'font', 'Flutter is a game about catching a butterfly.', 18);
        this.text1.anchor.setTo(0.5);
        this.text2 = game.add.bitmapText(game.world.centerX, 210, 'font', 'But, sadly you are a cat who can not jump...', 18);
        this.text2.anchor.setTo(0.5);
        this.text3 = game.add.bitmapText(game.world.centerX, 240, 'font', 'Do not fret!  The forest is full of plants to help you.', 18);
        this.text3.anchor.setTo(0.5);
        this.text4 = game.add.bitmapText(game.world.centerX, 270, 'font', 'Your only input is the two buttons: left and right (arrow keys).', 18);
        this.text4.anchor.setTo(0.5);
        this.text5 = game.add.bitmapText(game.world.centerX, 300, 'font', 'Just walk into seed packets to pick them up.', 18);
        this.text5.anchor.setTo(0.5);
        this.text6 = game.add.bitmapText(game.world.centerX, 330, 'font', 'Then, when you pass over a patch of fertile ground,', 18);
        this.text6.anchor.setTo(0.5);
        this.text7 = game.add.bitmapText(game.world.centerX, 360, 'font', 'You will automatically plant them in the order you picked them up.', 18);
        this.text7.anchor.setTo(0.5);
        this.text9 = game.add.bitmapText(game.world.centerX, 390, 'font', 'If you get stuck, press R, or the back button, any time to restart.', 18);
        this.text9.anchor.setTo(0.5);
        this.text8 = game.add.bitmapText(game.world.centerX, 430, 'font', 'Good luck!.', 28);
        this.text8.anchor.setTo(0.5);
        this.text8 = game.add.bitmapText(game.width - 5, game.height - 5, 'font', 'Note: this game uses Cookies to save your progress. \n If they\'re disabled, you\'ll loose your progress if you refresh the page.', 12);
        this.text8.anchor.setTo(1);

        this.catSprite = game.add.sprite(game.world.centerX - 20, 20, 'animcat');
        this.catSprite.animations.add('idle', [0,1]);
        this.catSprite.animations.play('idle', 0.5, true);
        this.catSprite.scale.x = -1;
        this.flutterSprite = game.add.sprite(game.world.centerX + 20, 70, 'flutter3');
        this.flutterSprite.animations.add('flutter', [0, 1, 2, 3, 4, 5]);
        this.flutterSprite.animations.play('flutter', 4, true);

        this.backButton = game.add.sprite(20, game.height - 128 - 20, 'level');
        this.backButtonArrow = game.add.sprite(this.backButton.x + 36, this.backButton.y + 36, 'back');
        this.backButton.inputEnabled = true;
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
    },

    render: function(){

    },
}