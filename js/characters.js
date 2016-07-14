/**
 * characters.js
 * 
 * A class-like framework to facilitate creation of characters in Phaser.
 * 
 *
 * - - - W O R K    I N    P R O G R E S S - - -
 *
 */

/**
 * name:            A unique name for the character group (used as key when referencing a cahced image)
 * spritesheet:     The path to the spritesheet file for characters within this group
 * width:           The width of a single frame of the spritesheet
 * height:          The height of a single frame of the spritesheet
*/
function Character(name, spritesheet, width, height) {
    this.name = name;
    this.spritesheet = spritesheet;
    this.width = width;
    this.height = heigth;
    this.group = game.create.group();
    this.instances = [];

    // Default anchor values
    this.anchorX = 0.5;
    this.anchorY = 0.5;
}

Character.prototype = {
    constructor: Character,

    /** 
     * Function for preloading the spritesheet.
     * CALL THIS FUNCTION IN PHASER PRELOAD STAGE!
     */
    load: function() {
        game.load.spritesheet(this.name, this.spritesheet, this.width, this.height);
    },

    /** 
     * Function for creating a new character in this group.
     * CALL THIS FUNCTION IN PHASER CREATE STAGE!       
     */
    create: function(x, y) {
        var newCharacter = this.group.create(x, y, this.name);
        newCharacter.anchor.setTo(this.anchorX, this.anchorY);

        // TODO: Add animations

        return newCharacter;
    }
}