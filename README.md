#A Basic Javascript Arcade Game

#Creating digDug From Scratch

####Link to Trello board: https://trello.com/b/sSWL5ba5/project-1

#####Dig Dug, dressed in white and blue and able to dig tunnels through destructible environments, is ridding the Earth of the destructive Pookahs and Fygars! Help defeat these mysterious enemies and save the world from destruction!

#RULES OF THE GAME:
- kill all the enemies on the board!
- Use your shooter (Spacebar) to defeat your enemies.
- Destroy all enemies to win.

##Controls

- Left Arrow - Left
- Right Arrow - Right
- Down Arrow - Down
- Up Arrow - Up
- SpaceBar - Pump

###WireFrames

- Hitting the Monster
![Hitting The Monster](assets/img/hitMonster.jpeg)
- How I will organize my functions
![How I will organize my functions](assets/img/howToOrganizeFunctions.jpeg)
- How the mainscreen will look
![How the mainscreen will look](assets/img/MainScreenNotes.jpeg)
- Monster Movement
![Monster Movement](assets/img/monsterMovement.jpeg)
- (Maybe) add timer counting up
![Maybe add timer counting up](assets/img/timeCounter.jpeg)
- Setting a Win Logic
![Setting a Win Logic](assets/img/winLogic.jpeg)

###Technologies Used
- HTML/CSS/JavaScript
- jQuery
- Phaser.io


STEPS
- create a basic file structure
- add a readme.md
- make a git and github repo
- render the board
  -minimum styling with CSS

  ????

- make dig dug!

---

##Approach Taken: Domain Modeling
OBJECT ORIENTED DESIGN: everything in digdug will be an object

###MOVING OBJECTS
####Dig dug guy (Hori Taizo)
    - walk
    - shoot
    - pump
    - dig through soil
####Monsters
    - Fygars (dragons)
      - walk
      - (eyes) travel through soil
      - kill digdug (when digdug touches them)
      - inflate (when pumped by digdug)
      - prep fire (light up different colors)
      - breath fire
    - Pookahs (red puff balls)
      - walk
      - (eyes) travel through soil
      - kill digdug (when digdug touches them)
      - inflate (when pumped by digdug)

###NON MOVING OBJECTS
####Rocks
    - fall
      - kill monsters if monster is under when they fall
      - kill digdug if digdug is under when they fall
    - break when they get to the bottom of the board
####Soil
    - excavates

##EVENT ACTIONS

The objective of the game is to pump up each monster until all are dead.

start with digdug's event actions
- excavates the soil as he moves around
- pumps up and kills the Monsters
- makes rocks fall



###Installation/StartUp Instructions
The game requires you to download the file in a local web server. If you're making a static html web page then you can drag this file into your browser and see the end results. But not with DigDugAttempt.

The game is going to need to load resources: images, audio files, JSON data, maybe other JavaScript files. And in order to do this it needs to run unhindered by the browser security shackles. It needs http:// access to the game files. And for that you need a web server.

####(Set MVP for future notice):
	- we are making the arcade game Dig Dug
	- 2 players
    - (reset the board for the next player)
        aka re-render board, but update above whose turn it is
	- keep score
    at top
    BONUS
    number of lives (array of three pictures)
	- and then compare the score to see who won. (maybe on time basis?)
