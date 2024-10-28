SelectState = function(){ }

var bgm = null;
var bgmMuted = false;
var jmpFx = null;
var hurtFx = null;
var fireFx = null;
var advanceFx = null;
var spawnFx = null;
var stepFx = null;
var eatFx = null;
var bridgeFx = null;
var explodeFx = null;
SelectState.prototype = {
    effects: null,
    text: null,
    levels: null,

    preload: function(){

    },

    create: function(){
        game.stage.backgroundColor = '#96fffc'
        this.effects = [];
        this.text = {};
        this.levels = [];

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

        //remove this line if not using lighting effects
        game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        if(!bgm){
            bgm = game.add.audio('bgm');
        }
        if(window.location.href.indexOf("silence") != -1){
            bgmMuted = true;
        }
        if(!bgmMuted && !bgm.isPlaying){
           bgm.play('', 0, 1, true);
        }



        if(!jmpFx){
            jmpFx = game.add.audio('jump', 0.5);
        }

        if(!hurtFx){
            hurtFx = game.add.audio('hurt');
        }

        if(!fireFx){
            fireFx = game.add.audio('fire', 0.5);
        }

        if(!advanceFx){
            advanceFx = game.add.audio('advance', 0.2);
        }

        if(!spawnFx){
            spawnFx = game.add.audio('spawn', 0.2);
        }

        if(!stepFx){
            stepFx = game.add.audio('step');
        }

        if(!eatFx){
            eatFx = game.add.audio('eat');
        }

        if(!bridgeFx){
            bridgeFx = game.add.audio('bridge');
        }

        if(!explodeFx){
            explodeFx = game.add.audio('explode');
        }

        text.titleText = game.add.bitmapText(game.world.centerX, 50, 'font', 'Flutter', 38);
        text.titleText.anchor.setTo(0.5);
        text.titleText.inputEnabled = true;
        //cheat code for debugging, or well, cheating.
        text.titleText.events.onInputDown.add(function(){
            Config.unlockedLevels.forEach(function(level){
                level.unlocked = true;
            }, this);
            Utils.createCookie("flutter-game-save-data", JSON.stringify(Config.unlockedLevels));
            EventTracking.logEvent('dirty-cheater', 'unlocked-levels');
            game.state.start('SelectState');
        });
        text.infoText = game.add.bitmapText(game.world.centerX, 100, 'font', 'A game created in 72 hours for Ludum Dare 34.', 24);
        text.infoText.anchor.setTo(0.5);
        text.infoText.alpha = 0;
        text.creatorText = game.add.bitmapText(game.world.centerX, 130, 'font', 'Code and Sound by Cudabear. Art by Melda Silas.', 20);
        text.creatorText.anchor.setTo(0.5);
        text.creatorText.alpha = 0;

        this.instructionLink = game.add.sprite(this.game.width - 128 - 50, 175 + 128, 'level');
        this.instructionText = game.add.bitmapText(this.instructionLink.x + this.instructionLink.width/2,
         this.instructionLink.y + this.instructionLink.height/2, 'font', 'Help', 14);
        this.instructionLink.alpha =0;
        this.instructionText.alpha = 0;
        this.instructionText.anchor.setTo(0.5);
        this.instructionLink.inputEnabled = true;
        this.instructionLink.events.onInputDown.add(function(){
            game.state.start('InstructionState');
        }, this);

        this.eraseLink = game.add.sprite(this.game.width - 128 - 50, 175 + 2*128, 'level');
        this.eraseText = game.add.bitmapText(this.eraseLink.x + this.eraseLink.width/2,
         this.eraseLink.y + this.eraseLink.height/2, 'font', 'Erase\n Data', 14);
        this.eraseLink.alpha = 0;
        this.eraseText.alpha = 0;
        this.eraseText.anchor.setTo(0.5);
        this.eraseLink.inputEnabled = true;
        this.eraseLink.events.onInputDown.add(function(){
            var r = window.confirm("Are you sure you want to erase your data?\n THIS ACTION CANNOT BE UNDONE!");
            if(r){
                Utils.eraseCookie("flutter-game-save-data");
                game.state.start('SelectState');
            }
        }, this);

        this.muteMusicLink = game.add.sprite(this.game.width - 128 - 50, 175, 'level');
        this.muteMusicText = game.add.bitmapText(this.muteMusicLink.x + this.muteMusicLink.width/2,
         this.muteMusicLink.y + this.muteMusicLink.height/2, 'font', bgmMuted ? 'Play\nMusic' : 'Mute\nMusic', 14);
        this.muteMusicLink.alpha = 0;
        this.muteMusicText.alpha = 0;
        this.muteMusicText.anchor.setTo(0.5);
        this.muteMusicLink.inputEnabled = true;
        this.muteMusicLink.events.onInputDown.add(function(){
            if(bgm.isPlaying){
                bgm.stop();
                this.muteMusicText.setText('Play\nMusic');
                bgmMuted = true;
            }else{
                bgm.play('', 0, 1, true);
                this.muteMusicText.setText('Mute\nMusic');
                bgmMuted = false;
            }
        }, this);

        var data = Utils.readCookie("flutter-game-save-data");
        if(!data){
            Config.unlockedLevels = [];
            Config.tileMaps.forEach(function(map){
                Config.unlockedLevels.push({'key': map.key, 'unlocked': false});
            }, this);

            Utils.createCookie("flutter-game-save-data", JSON.stringify(Config.unlockedLevels));
        }else{
            Config.unlockedLevels = JSON.parse(data);
        }

        Config.unlockedLevels[0].unlocked = true;

        this.createLevelLinks();
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

        this.levels.forEach(function(level){
            if(level.alpha < 1){
                level.alpha += 0.02;
                if(!level.unlocked){
                    level.titleText.alpha += 0.002;
                }else{
                    level.titleText.alpha += 0.02;
                }
            }
        }, this);

        if(text.titleText.alpha < 1){
            text.titleText.alpha += 0.02;
        }

        if(text.infoText.alpha < 1){
            text.infoText.alpha += 0.02;
        }

        if(text.creatorText.alpha < 1){
            text.creatorText.alpha += 0.02;
        }

        if(this.muteMusicLink.alpha < 1){
            this.muteMusicLink.alpha += 0.02;
            this.muteMusicText.alpha += 0.02;
        }

        if(this.instructionLink.alpha < 1){
            this.instructionLink.alpha += 0.02;
            this.instructionText.alpha += 0.02;
        }

        if(this.eraseLink.alpha < 1){
            this.eraseLink.alpha += 0.02;
            this.eraseText.alpha += 0.02;
        }
    },

    render: function(){

    },



    createLevelLinks: function(){
        Config.tileMaps.forEach(function(map){
            var key = map.key;
            var level = game.add.sprite(50+(this.levels.length%5)*128, 175 + Math.floor(this.levels.length/5)*128, 'level');
            level.titleText = game.add.bitmapText(level.x + level.width/2, level.y + level.height/2, 'font', key, 14);
            level.titleText.anchor.setTo(0.5);
            level.inputEnabled = true;
            level.levelKey = key;
            var unlocked = this.isLevelUnlocked(key);
            level.alpha = 0;
            level.titleText.alpha = 0;

            if(unlocked){
                level.events.onInputDown.add(function(){
                    Config.currentLevel = this.levelKey;
                    game.state.start('MainState');
                }, level)
                level.unlocked = true;
            }else{
                level.titleText.alpha = 0.2;
                level.titleText.setText("???");
            }
            
            this.levels.push(level);


        }, this);
    },

    isLevelUnlocked: function(key){
        var retVal = false;
        Config.unlockedLevels.forEach(function(level){
            if(level.key == key && level.unlocked == true){
                retVal = true;
            }
        }, this);

        return retVal;
    }
}