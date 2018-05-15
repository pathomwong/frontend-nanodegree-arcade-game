const LEFT = 0;
const	TOP = 20;
const	RIGHT = 390;
const	BOTTOM = 390;
const ENEMY_START_Y = [60,145,225];
const ENEMY_MAX_SPEED = 300;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = this.genStartY();
    this.speed = this.genSpeed();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();
    this.x = this.x + (this.speed * dt);
    if(this.x > (RIGHT+150)){
      this.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision
Enemy.prototype.checkCollisions = function() {
    if(player.x < this.x + 75 &&
       player.x > this.x - 75 &&
       player.y < this.y + 55 &&
       player.y > this.y - 55
    ){
      player.reset();
    }
};

//reuse enemy
Enemy.prototype.restart = function() {
    this.x = 0;
};

// Generate the random speen
Enemy.prototype.genSpeed = function() {
    return Math.floor(Math.random() * ENEMY_MAX_SPEED) + 50;
};

// Generate the random start point Y
Enemy.prototype.genStartY = function() {
    return ENEMY_START_Y[Math.floor(Math.random() * 3)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{

  constructor(){
      this.sprite = 'images/char-boy.png';
      this.x = 0;
      this.y = 390;
      this.goal = false;
  }

  update(){
      this.getGoal();
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.goal){
      ctx.font = "bolder 30px Arial";
      ctx.fillStyle="#FF0000";
      ctx.fillText("You Got It, Try Again!", 100, 100);
    }
  }

  handleInput(keyPressed){
      this.goal = false;
      switch(keyPressed){
        case 'left': this.moveLeft();break;
        case 'right': this.moveRight();break;
        case 'up': this.moveUp();break;
        case 'down': this.moveDown();break;
      }
  }

  moveLeft(){
    if(this.x > LEFT){
      this.x -= 102;
    }
  }

  moveRight(){
    if(this.x  < RIGHT){
      this.x += 102;
    }
  }

  moveUp(){
    if(this.y > TOP){ // this cheching is no needed, but just in case
      this.y -= 83;
    }
  }

  moveDown(){
    if(this.y < BOTTOM){
      this.y += 83;
    }
  }

  getGoal(){
    if(this.y <= 0){
      this.goal = true;
      this.reset();
    }
  }

  reset(){
    this.x = 0;
    this.y = 390;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();
for(let i=0;i < 6;i++){
  allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
