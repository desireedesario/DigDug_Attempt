/**
 * Creates a new game object with a single state that has three functions.
 *
 * Phaser.Game is part of the Phaser library. First 2 parameters are width and height of the game, 
 * the third is a function letting the game run on the internet, and fourth is an empty string to 
 * add a background, and the fincal is a parameter are the four essential funtions.
 * 
 * @type {Phaser}
 * @see http://phaser.io/docs/2.5.0/Phaser.Game.html
 */
var game = new Phaser.Game(
                800, 1000,      // Size of game
                Phaser.AUTO,    // Renders phasers commands
                'gameArea',     // The HTML element ID we will connect Phaser to.
                
                // Functions (callbacks) for Phaser to call in
                {
                    preload: preload,
                    create: create,
                    update: update
                });

var world = {
    map: null,
    layer: null,

    speed: 4,       // Speed of main character

    pumpExists: false,

    objects: {}     // Sprite groups
};

var controls = {
    upKey: game.input.keyboard.addKey(Phaser.Keyboard.UP),
    downKey: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    leftKey: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    rightKey: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
    pumpButton: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
};

//global variables creating object
var digger;





var win;
var sound;

var trackFacing = 1;

var pump;
var pumps;
face



/**
 * Remove tiles from the game
 */
function digSoil() {
    world.map.putTile(-1, world.layer.getTileX(digger.x), world.layer.getTileY(digger.y));
}

//FIRST FUNCTION CALLED
function preload() {

    //SPRITESHEET(KEY, URL, FRAMEWIDTH, FRAMEHEIGHT, FRAMEMAX, MARGIN, SPACING) → {PHASER.LOADER}
    this.load.image('winner', './assets/img/youWin.png');
    this.load.image('pump', './assets/img/pump.png');

    // LOAD ENEMIES
    // --=  https://www.youtube.com/watch?v=9IclmVdWNbI  =--
    world.objects.pookahs = new Character('pookah', 'assets/img/144x144pookahspriteSheet.png', 72, 72);
    world.objects.fygars = new Character('fygar', 'assets/img/144x144fygarspriteSheet.png', 102, 102);
    
    game.load.spritesheet('digger', 'assets/img/144x144spritesheet2.png', 72, 72); //little digger dude and how big he is ^_^

    // Map
    game.load.tilemap('map13', 'assets/img/map1.csv');
    game.load.image('tiles', 'assets/img/32x32soil.png');
}

//second function called after the preload of the game
function create() {
    //LOAD IN ARCADE PHYSICS
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //remove tiles on world.map
    world.map = game.add.tilemap('map13', 32, 32);
    world.map.addTilesetImage('tiles');
    world.layer = world.map.createworld.layer(0);
    world.layer.resizeWorld();

    world.map.setCollisionBetween(0, 1);
    world.map.setTileIndexCallback(0, this.digSoil, this);

    winner = game.add.group();
    pumps = game.add.group();
    world.objects.pookahs.create();
    world.objects.fygars.create();


    //CONTROLED DIGGER
    digger = game.add.sprite(100, 100, 'digger');
    digger.animations.add('walk', [2, 3]);
    digger.animations.add('stand', [3]);
    digger.anchor.setTo(0.5, 0.5); //TUNRING RATIO
    digger.enableBody = true;
    game.physics.arcade.enable(digger);



    //ENEMIES
    var p = world.objects.pookahs.add(150, 200);
    game.add.tween(p).to({y: p.y + 100}, 1500, 'Linear', true, 0, 100, true);

    p = world.objects.pookahs.add(550, 270);
    game.add.tween(p).to({x: p.x + 100}, 1500, 'Linear', true, 0, 100, true);

    p = world.objects.pookahs.add(500, 500);
    game.add.tween(p).to({y: p.y + 100}, 1500, 'Linear', true, 0, 100, true);

    var f = world.objects.fygars.add(100, 450);
    game.add.tween(f).to({x: f.x + 100}, 1500, 'Linear', true, 0, 100, true);

    f = world.objects.fygars.add(550, 750);
    game.add.tween(f).to({x: f.x + 100}, 1500, 'Linear', true, 0, 100, true);
}

//function called once every frame, ideally 60 times per second
function update() {

    //removing world.layers on world.map function
    world.map.setTileIndexCallback(0, this.digSoil, this);

    //DIGGER DUDE CONTROLLED MOVEMENT
    if (controls.upKey.isDown) {
        trackFacing = 0;
        digger.animations.play('walk', 5, false);
        digSoil();
        digger.y -= speed;
        if (trackFacing === 0) {
            digger.angle = -90;
        }

    } else if (controls.downKey.isDown) {
        trackFacing = 2;
        digger.animations.play('walk', 5, false);
        digSoil();
        digger.y += speed;
        if (trackFacing == 2) {
            digger.angle = 90;
        }
    } else if (controls.leftKey.isDown) {
        trackFacing = 3;
        digger.animations.play('walk', 5, false);
        digSoil();
        digger.x -= speed;
        if (trackFacing == 3) {
            digger.scale.y = -1;
            digger.angle = 180;
        }
    } else if (controls.rightKey.isDown) {
        trackFacing = 1;
        digger.animations.play('walk', 5, false);
        digSoil();
        digger.x += speed;
        if (trackFacing == 1) {
            digger.scale.y = 1;
            digger.angle = 0;
        }
    } else {
        digger.animations.stop('stand', 3, true);
    }

    if (trackFacing === 0) {
        if (controls.pumpButton.isDown) {
            if (!world.pumpExists) {
                	$('#pump').get(0).play(); //gets the first element of the sound
                pump = pumps.create(digger.x, digger.y, 'pump');
                pump.angle = -90;
                pump.enableBody = true;
                game.physics.arcade.enable(pump);
                pump.physicsBodyType = Phaser.Physics.ARCADE;
                pump.body.velocity.y = -1000;
                world.pumpExists = true;
                game.time.events.add(Phaser.Timer.SECOND * 1, reload);
            }
        }
    }

    if (trackFacing == 1) {
        if (controls.pumpButton.isDown) {
            if (!world.pumpExists) {
                	$('#pump').get(0).play(); //gets the first element of the sound
                pump = pumps.create(digger.x, digger.y, 'pump');
                pump.enableBody = true;
                game.physics.arcade.enable(pump);
                pump.physicsBodyType = Phaser.Physics.ARCADE;
                pump.body.velocity.x = 1000;
                world.pumpExists = true;
                game.time.events.add(Phaser.Timer.SECOND * 1, reload);
            }
        }
    }

    if (trackFacing == 2) {
        if (controls.pumpButton.isDown) {
            if (!world.pumpExists) {
                	$('#pump').get(0).play(); //gets the first element of the sound
                pump = pumps.create(digger.x, digger.y, 'pump');
                pump.angle = 90;
                pump.enableBody = true;
                game.physics.arcade.enable(pump);
                pump.physicsBodyType = Phaser.Physics.ARCADE;
                pump.body.velocity.y = 1000;
                world.pumpExists = true;
                game.time.events.add(Phaser.Timer.SECOND * 1, reload);
            }
        }
    }

    if (trackFacing == 3) {
        if (controls.pumpButton.isDown) {
            if (!world.pumpExists) {
                	$('#pump').get(0).play(); //gets the first element of the sound
                pump = pumps.create(digger.x, digger.y, 'pump');
                pump.angle = 180;
                pump.enableBody = true;
                game.physics.arcade.enable(pump);
                pump.physicsBodyType = Phaser.Physics.ARCADE;
                pump.body.velocity.x = -1000;
                world.pumpExists = true;
                game.time.events.add(Phaser.Timer.SECOND * 1, reload);
            }
        }
    }

    world.objects.pookahs.checkCollisions(pumps);
    world.objects.fygars.checkCollisions(pumps);

    if (isGameOver()) {    
        win = winner.create(100, 100, 'winner');
        $('#win').get(0).play(); //gets the first element of the sound
        speed = 9;
        game.paused = true;
    }

    function digSoil() {
        world.map.putTile(-1, world.layer.getTileX(digger.x), world.layer.getTileY(digger.y));
    }

    function reload() {
        world.pumpExists = false;
    }

    //this function will pass the sound to your event when it is clicked
    //(must have jquery library script linked)
    function PlaySound(soundObj) {
    sound = document.getElementById(soundObj);
    sound.Play();
    }
}

function isGameOver() {
    return world.objects.pookahs.instances.length === 0 && world.objects.fygars.instances.length === 0;
}

/**
 * Represents a character in the game.
 *
 * @constructor
 * 
 * @param {String} name         A unique name for the character type
 * @param {String} spritesheet  Path to the spritesheet file for this character type
 * @param {Number} width        Width of a single frame of the spritesheet
 * @param {Number} height       Height of a single frame of the spritesheet
 */
function Character(name, spritesheet, width, height) {

    // Set properties
    this.name = name;
    this.spritesheet = spritesheet;
    this.width = width;
    this.height = height;

    // Load spritesheet
    game.load.spritesheet(this.name, this.spritesheet, this.width, this.height);

    this.instances = [];
    this.animations = {};

    // Default anchor values
    this.anchorX = 0.5;
    this.anchorY = 0.5;
}

Character.prototype = {
    constructor: Character,

    create: function() {
        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.ARCADE;
    },

    /** 
     * Function for creating a new character in this group.
     * CALL THIS FUNCTION IN PHASER CREATE STAGE!       
     */
    add: function(x, y) {
        var newCharacter = this.group.create(x, y, this.name);
        newCharacter.anchor.setTo(this.anchorX, this.anchorY);

        // Loop through and add each animation
        Object.keys(this.animations).forEach(function(k) {
            newCharacter.animations.add(
                this.animations[k].name,
                this.animations[k].frames,
                this.animations[k].frameRate,
                this.animations[k].loop
            );
        });

        this.instances.push(newCharacter);

        return newCharacter;
    },

    addAnimation: function(name, frames, frameRate, loop) {
        this.animations[name] = {name: name, frames: frames, frameRate: frameRate, loop: loop};
    },

    playAnimation: function(name) {
        this.group.callAll('animations.play', null, name);
    },

    checkCollisions: function(colliderGroup) {
        for (var i=0, len = this.instances.length; i < len; i++) {
            game.physics.arcade.overlap(colliderGroup, this.instances[i], this.kill, null, this);
        }
    },

    kill: function(sprite, group) {
        sprite.kill();
        this.instances.splice(this.instances.indexOf(sprite), 1);
    }

    //setMovement: function(direction, )
};
