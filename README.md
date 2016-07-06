#This is a basic javascript arcade game

#creating digDug from scratch
##Set MVP:
	- we are making the arcade game Dig Dug
	- 2 players
    - (reset the board for the next player)
        aka re-render board, but update above whose turn it is
	- keep score
    at top
    BONUS
    number of lives (array of three pictures)
	- and then compare the score to see who won. (maybe on time basis?)


STEPS
- create a basic file structure
- add a readme.md
- make a git and github repo
- render the board
  -minimum styling with CSS

  ????

- make dig dug!

---

##Domain Modeling
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
