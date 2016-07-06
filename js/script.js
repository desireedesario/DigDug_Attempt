
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

    //FIRST FUNCTION CALLED
    function preload() {
        //this is the background image
        this.load.image('background', './img/backgroundDigdug.png');
        this.load.image('winner', './img/youWin.png');
        game.load.spritesheet("pookah", "img/144x144pookahSpriteSheet.png", 72, 72);
        game.load.spritesheet("fygar", "img/144x144fygarSpriteSheet.png", 102, 102);
        game.load.spritesheet("digger", "img/144x144spritesheet2.png", 72, 72); //little digger dude and how big he is ^_^
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




    //second function called after the preload of the game
    function create() {
        //SPRITESHEET(KEY, URL, FRAMEWIDTH, FRAMEHEIGHT, FRAMEMAX, MARGIN, SPACING) → {PHASER.LOADER}
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //CREATE PLAYER
        //(xaxis, y-axis, which image we wish to select)
        this.background = this.game.add.sprite(0, 0, 'background')
            //this is a random guy hanging out in the center of the world

        //  this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'digger')

        //STATIC MONSTERS ON THE X AND Y AXIS
        // var pook = this.game.add.sprite(150, 250, 'pook')
        // this.game.add.sprite(550, 370, 'pookah')
        // this.game.add.sprite(100, 450, 'fygar')
        // this.game.add.sprite(550, 150, 'fygar')
          //var tinyPookah = this.digger.scale.setTo(0.5,0.5);
          //tinyPookah.setTo(-0.5,0.5);



        pookah = game.add.group();
        fygar = game.add.group();
        winner = game.add.group();

        //CONTROLED DIGGER
        digger = game.add.sprite(100, 130, 'digger');
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

        pookah1 = pookah.create(150, 250, 'pookah');
        pookah2 = pookah.create(550, 370, 'pookah');
        pookah3 = pookah.create(500, 500, 'pookah');
        fygar1 = fygar.create(100, 450, 'fygar');
        fygar2 = fygar.create(550, 150, 'fygar');
    }



//DIGGER DUDE CONTROLLED MOVEMENT

    //function called once every frame, ideally 60 times per second
    function update() {
        if (upKey.isDown) {
            digger.animations.play('walk', 5, false);
            if (digger.y > 50)
                digger.y -= speed;
            if (digger.scale.x == -1)
                digger.angle = 90;
            // } if else
            else
                digger.angle = -90;

        } else if (downKey.isDown) {
            digger.animations.play('walk', 5, false);
            if (digger.y < 550)
                digger.y += speed;
            if (digger.scale.x == -1)
                digger.angle = -90;
            else
                digger.angle = 90;

        } else if (leftKey.isDown) {
            digger.animations.play('walk', 5, false);
            if (digger.x > 50)
                digger.x -= speed;
            digger.scale.x = -1;
            digger.angle = 0;

        } else if (rightKey.isDown) {
            digger.animations.play('walk', 5, false);
            if (digger.x < 750)
                digger.x += speed;
            digger.scale.x = 1;
            digger.angle = 0;
        } else {
          digger.animations.stop('stand', 3, true);
        }

        game.physics.arcade.overlap(digger,pookah1, killPookah1,null,this);
        game.physics.arcade.overlap(digger,pookah2, killPookah2,null,this);
        game.physics.arcade.overlap(digger,pookah3, killPookah3,null,this);
        game.physics.arcade.overlap(digger,fygar1, killFygar1,null,this);
        game.physics.arcade.overlap(digger,fygar2, killFygar2,null,this);
    };

function killPookah1(digger, pookah1){
  pookah1.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();	//gets the first element of the sound
    speed = 9;}
}

function killPookah2(digger, pookah2){
  pookah2.kill();
  clear +=  1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

function killPookah3(digger, pookah3){
  pookah3.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

function killFygar1(digger, fygar1){
  fygar1.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9; }
}

function killFygar2(digger, fygar2){
  fygar2.kill();
  clear += 1;
  console.log(clear);
  if (clear.length == 5){
    win = winner.create(100, 100, 'winner');
    // $("#winNoise").get(0).play();
    speed = 9;}
}

//SOUND BITE
// function PlaySound(noise) {
//   var sound = document.getElementById(noise);
//   sound.Play();
// }
