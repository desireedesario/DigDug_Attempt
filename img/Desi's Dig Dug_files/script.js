
    //Creates a new game object wth a single state that has three functions
    //Phaser.game is apart if the phaser library, documentation found @:http://phaser.io/docs/2.5.0/Phaser.Game.html

    //first 2 parameters are width and height of the game, the third is a function letting the game run on the internet, and fourth is an empty string to add a background, and the fincal is a parameter are the four essential funtions
    var game = new Phaser.Game(
      800, 600,  //size of game
      Phaser.AUTO, //renders phasers commands
      'gameArea', // The HTML element ID we will connect Phaser to.
       {  // Functions (callbacks) for Phaser to call in
        preload: preload,
        create: create,
        update: update
    });

    var map;
    var layer;

    //FIRST FUNCTION CALLED
    function preload() {
        //this is the background image
        // this.load.image('background', './img/backgroundDigdug.png');
        this.load.image('winner', './img/youWin.png');
        this.load.spritesheet('pump', "./img/pump.png", 284, 45);
        game.load.spritesheet("pookah", "img/144x144pookahSpriteSheet.png", 72, 72);
        game.load.spritesheet("fygar", "img/144x144fygarSpriteSheet.png", 102, 102);
        game.load.spritesheet("digger", "img/144x144spritesheet2.png", 72, 72); //little digger dude and how big he is ^_^


        game.load.tilemap('map13', 'img/map13.csv');
        game.load.image('tiles', 'img/64x63soil.png');
    }

    //global variables creating object
    var digger;
    var pookah;
    var fygar;
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;

    var clear = [];

    //speed of main character
    var speed = 4;

    var pookah1;
    var pookah2;
    var pookah3;
    var fygar1;
    var fygar2;
    var win;

    var trackFacing = [0];



    //second function called after the preload of the game
    function create() {
        //SPRITESHEET(KEY, URL, FRAMEWIDTH, FRAMEHEIGHT, FRAMEMAX, MARGIN, SPACING) → {PHASER.LOADER}
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //CREATE PLAYER
        //(xaxis, y-axis, which image we wish to select)
        // this.background = this.game.add.sprite(0, 0, 'background')
            //tis is a random guy hanging out in the center of the world
            map = game.add.tilemap('map13', 32, 32, 32, 32);
            map.addTilesetImage('tiles');
            layer = map.createLayer(0);
            layer.resizeWorld();
            map.setTileIndexCallback([0, 1, 2, 3], game.digSoil, game);



        pookah = game.add.group();
        fygar = game.add.group();
        winner = game.add.group();

        //CONTROLED DIGGER
        digger = game.add.sprite(100, 116, 'digger');
        digger.animations.add('walk', [2, 3]);
        digger.animations.add('stand', [3]);
        digger.anchor.setTo(0.5, 0.5); //TUNRING RATIO
        //digger.scale.setTo(0.5,0.5);

        digger.enableBody = true;
        pookah.enableBody = true;
        fygar.enableBody = true;
        game.physics.arcade.enable(digger);
        game.physics.arcade.enable(pookah);
        game.physics.arcade.enable(fygar);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        pumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        pookah1 = pookah.create(150, 250, 'pookah');
          pookah1.anchor.setTo(0.5, 0.5);
          pookah1.animations.add('walk', [0,1], 2, true)
          pookah1.animations.play('walk', [0,1], 2, true)
          game.add.tween(pookah1).to({y: pookah1.y + 100},1500,'Linear', true,0,100,true);
        pookah2 = pookah.create(550, 370, 'pookah');
          pookah2.anchor.setTo(0.5, 0.5);
          pookah2.animations.add('walk', [0,1], 2, true)
          pookah2.animations.play('walk', [0,1], 2, true)
          game.add.tween(pookah2).to({y: pookah2.y + 100},1500,'Linear', true,0,100,true);
        pookah3 = pookah.create(500, 500, 'pookah');
          pookah3.anchor.setTo(0.5, 0.5);
          pookah3.animations.add('walk', [0,1], 2, true)
          pookah3.animations.play('walk', [0,1], 2, true)
          game.add.tween(pookah3).to({y: pookah3.y + 100},1500,'Linear', true,0,100,true);
        fygar1 = fygar.create(100, 450, 'fygar');
          fygar1.anchor.setTo(0.5, 0.5);
          fygar1.animations.add('walk', [0,1], 2, true)
          fygar1.animations.play('walk', [0,1], 2, true)
          game.add.tween(fygar1).to({x: fygar1.x + 100},1500,'Linear', true,0,100,true);
        fygar2 = fygar.create(550, 150, 'fygar');
          fygar1.anchor.setTo(0.5, 0.5);
          fygar1.animations.add('walk', [0,1], 2, true)
          fygar1.animations.play('walk', [0,1], 2, true)
          game.add.tween(fygar2).to({x: fygar2.x + 100},1500,'Linear', true,0,100,true);

    }



//DIGGER DUDE CONTROLLED MOVEMENT

    //function called once every frame, ideally 60 times per second
    function update() {
        if (upKey.isDown) {
            trackFacing = [0];
            digger.animations.play('walk', 5, false);
            if (digger.y > 50)
                digger.y -= speed;
            if (digger.scale.x == -1)
                digger.angle = 90;
            else
                digger.angle = -90;

        } else if (downKey.isDown) {
            trackFacing = [1];
            digger.animations.play('walk', 5, false);
            if (digger.y < 550)
                digger.y += speed;
            if (digger.scale.x == -1)
                digger.angle = -90;
            else
                digger.angle = 90;

        } else if (leftKey.isDown) {
            trackFacing = [2];
            digger.animations.play('walk', 5, false);
            if (digger.x > 50)
                digger.x -= speed;
            digger.scale.x = -1;
            digger.angle = 0;

        } else if (rightKey.isDown) {
            trackFacing = [3];
            digger.animations.play('walk', 5, false);
            if (digger.x < 750)
                digger.x += speed;
            digger.scale.x = 1;
            digger.angle = 0;
        } else {
            digger.animations.stop('stand', 3, true);
        };

        if (trackFacing[0] == 0) {
          if (pumpButton.isDown) {
            var pump = game.add.sprite(digger.x, digger.y, 'pump');
            pump.enableBody = true;
            game.physics.arcade.enable(pump);
            pump.body.velocity.y = -1000;
            pump.angle = -90;
            game.physics.arcade.overlap(pump, pookah1, killPookah1);
            game.physics.arcade.overlap(pump, pookah2, killPookah2);
            game.physics.arcade.overlap(pump, pookah3, killPookah3);
            game.physics.arcade.overlap(pump, fygar1, killFygar1);
            game.physics.arcade.overlap(pump, fygar2, killFygar2);
          } else {

          }
        };

        if (trackFacing[0] == 1) {
          if (pumpButton.isDown) {
            var pump = game.add.sprite(digger.x, digger.y, 'pump');
            pump.enableBody = true;
            game.physics.arcade.enable(pump);
            pump.body.velocity.y = 1000;
            pump.angle = 90;
            game.physics.arcade.overlap(pump, pookah1, killPookah1);
            game.physics.arcade.overlap(pump, pookah2, killPookah2);
            game.physics.arcade.overlap(pump, pookah3, killPookah3);
            game.physics.arcade.overlap(pump, fygar1, killFygar1);
            game.physics.arcade.overlap(pump, fygar2, killFygar2);
          }
        }

        if (trackFacing[0] == 2) {
          if (pumpButton.isDown) {
            var pump = game.add.sprite(digger.x, digger.y, 'pump');
            pump.enableBody = true;
            game.physics.arcade.enable(pump);
            pump.body.velocity.x = -1000;
            pump.angle = 180;
            game.physics.arcade.overlap(pump, pookah1, killPookah1);
            game.physics.arcade.overlap(pump, pookah2, killPookah2);
            game.physics.arcade.overlap(pump, pookah3, killPookah3);
            game.physics.arcade.overlap(pump, fygar1, killFygar1);
            game.physics.arcade.overlap(pump, fygar2, killFygar2);
          }
        }

        if (trackFacing[0] == 3) {
          if (pumpButton.isDown) {
            var pump = game.add.sprite(digger.x, digger.y, 'pump');
            pump.enableBody = true;
            game.physics.arcade.enable(pump);
            pump.body.velocity.x = 1000;
            game.physics.arcade.overlap(pump, pookah1, killPookah1);
            game.physics.arcade.overlap(pump, pookah2, killPookah2);
            game.physics.arcade.overlap(pump, pookah3, killPookah3);
            game.physics.arcade.overlap(pump, fygar1, killFygar1);
            game.physics.arcade.overlap(pump, fygar2, killFygar2);
          }
        }

    };

function killPookah1(){
  pookah1.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();	//gets the first element of the sound
    speed = 9;}
}

function killPookah2(){
  pookah2.kill();
  clear +=  1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

function killPookah3(){
  pookah3.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

function killFygar1(){
  fygar1.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9; }
}

function killFygar2(){
  fygar2.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

function digSoil(){
  map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
}

//SOUND BITE
// function PlaySound(noise) {
//   var sound = document.getElementById(noise);
//   sound.Play();
// }