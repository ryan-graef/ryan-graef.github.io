Config = {
    name: "Flutter",
    version: "1.0.0",
    retries: 0,
    unlockedLevels: null,
    sprites: [
        //{key: "SpriteKey", imagePath: "path/to/image"}
        {key: "cat", imagePath: "res/img/cat.png"},
        {key: "bug", imagePath: "res/img/bug.png"},
        {key: "cloud1", imagePath: "res/img/cloud.png"},
        {key: "cloud2", imagePath: "res/img/cloud2.png"},
        {key: "cloud3", imagePath: "res/img/cloud3.png"},
        {key: "cloud4", imagePath: "res/img/cloud4.png"},
        {key: "cloud5", imagePath: "res/img/cloud5.png"},
        {key: "level", imagePath: "res/img/level.png"},
        {key: "back", imagePath: "res/img/backarrow.png"},
        {key: "backdrop", imagePath: "res/img/background.png"},
        {key: "burnplant", imagePath: "res/img/burnplant.png"},
        {key: "boomplant", imagePath: "res/img/boomplant.png"},
        {key: "bridgeplant", imagePath: "res/img/bridgeplant.png"},
        {key: "eatplant", imagePath: "res/img/eatplant.png"},
        {key: "riseplant", imagePath: "res/img/riseplant.png"},
        {key: "tileset", imagePath: "res/img/tileset.png"}
    ],
    animSprites: [
        //{key: "SpriteKey", imagePath: "path/to/image", jsonPath: "path/to/json"}
        {key: "risegrowth", imagePath: "res/img/risegrowth.png", jsonPath: "res/img/risegrowth.json"},
        {key: "animcat", imagePath: "res/img/blackandwhite.png", jsonPath: "res/img/blackandwhite.json"},
        {key: "flutter1", imagePath: "res/img/flutter1.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter-all", imagePath: "res/img/flutter_all.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter2", imagePath: "res/img/flutter2.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter3", imagePath: "res/img/flutter3.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter4", imagePath: "res/img/flutter4.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter5", imagePath: "res/img/flutter5.png", jsonPath: "res/img/flutter.json"},
        {key: "flutter6", imagePath: "res/img/flutter6.png", jsonPath: "res/img/flutter.json"},
        {key: "hornets", imagePath: "res/img/hornets.png", jsonPath: "res/img/hornets.json"},
        {key: "trapgrowth", imagePath: "res/img/venusflytrap.png", jsonPath: "res/img/venusflytrap.json"},
        {key: "firegrowth", imagePath: "res/img/fireplant.png", jsonPath: "res/img/fireplant.json"},
        {key: "bombgrowth", imagePath: "res/img/bombplant.png", jsonPath: "res/img/bombplant.json"},
        {key: "jumpgrowth", imagePath: "res/img/growing.png", jsonPath: "res/img/growing.json"},
        {key: "giantjumpgrowth", imagePath: "res/img/giant-growing.png", jsonPath: "res/img/giant-growing.json"}
    ],
    //tilemaps are assumed to be Tiled JSON.
    tileMaps: [
        //{key: "MapKey", jsonPath: "path/to/json"}
        //{key: "test", jsonPath: "res/level/test.json"},
        {key: "Fall", jsonPath: "res/level/beginning.json"},
        {key: "Rise", jsonPath: "res/level/2.json"},
        {key: "Jump", jsonPath: "res/level/3.json"},
        {key: "Hop", jsonPath: "res/level/4.json"},
        {key: "Avoid", jsonPath: "res/level/5.json"},
        {key: "Eat", jsonPath: "res/level/6.json"},
        {key: "Order", jsonPath: "res/level/7.json"},
        {key: "Burn", jsonPath: "res/level/8.json"},
        {key: "Doors", jsonPath: "res/level/9.json"},
        {key: "Gap", jsonPath: "res/level/10.json"},
        {key: "Bridges", jsonPath: "res/level/11.json"},
        {key: "Boom", jsonPath: "res/level/12.json"},
        {key: "Process", jsonPath: "res/level/13.json"},
        {key: "Climb", jsonPath: "res/level/14.json"},
        {key: "End", jsonPath: "res/level/15.json"}
    ],
    fonts: [
        //{key: "FontKey", imagePath: "path/to/image", xmlPath: "path/to/XML"}
        {key: "font", imagePath: "res/font/font.png", xmlPath: "res/font/font.xml"}
    ],
    sfx: [
        //{key: "SfxKey", filePath: "path/to/audiofile"}
        {key: "jump", filePath: "res/audio/jump.wav"},
        {key: "hurt", filePath: "res/audio/hurt.wav"},
        {key: "advance", filePath: "res/audio/advance.wav"},
        {key: "fire", filePath: "res/audio/fire.wav"},
        {key: "spawn", filePath: "res/audio/spawn.wav"},
        {key: "step", filePath: "res/audio/step.wav"},
        {key: "eat", filePath: "res/audio/eat.wav"},
        {key: "bridge", filePath: "res/audio/bridge.wav"},
        {key: "explode", filePath: "res/audio/explosion.wav"},
    ],
    //music loops by default
    music: [
        //{key: "MusicKey", filePath: "path/to/audiofile"}
        {key: "bgm", filePath: "res/audio/bgm.ogg"}
    ]
}