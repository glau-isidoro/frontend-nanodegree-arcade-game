var playerInitX = 202;
var playerInitY = 405;
var enemyInitY = [140, 225, 310];
var rockInitX = [0, 100, 200, 300, 400];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -70;
    this.y = enemyInitY[Math.floor((Math.random() * 3))];
    this.speed = Math.floor((Math.random() * 100) + 10);

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if( this.x < 505) {
      this.x += this.speed * dt * 3;
  } else {
      this.x = -70;
      this.y = enemyInitY[Math.floor((Math.random() * 3))];
      this.speed = Math.floor((Math.random() * 100) + 10);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Our player
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = playerInitX;
    this.y = playerInitY;

    this.sprite = 'images/char-cat-girl.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

    if( this.y < 90 ) {
      this.x = playerInitX;
      this.y = playerInitY;
    } else if( keyCode == 'up' && this.y > 90 ) {
        this.y = this.y - 85;
    } else if( keyCode == 'down' && this.y < 400 ) {
      this.y = this.y + 85;
    } else if( keyCode == 'right' && this.x < 400 ) {
      this.x = this.x + 101;
    } else if( keyCode == 'left' && this.x > 100 ) {
      this.x = this.x - 101;
    }

};


var Rocks = function( pos ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = rockInitX[pos];
    this.y = 55;

    this.sprite = 'images/Rock.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Rocks.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Rocks.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var allRocks = [];
for (var i = 0; i < 5; i++){
    allRocks[i] = new Rocks(i);
}

var allEnemies = [];

for (var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
}

var player = new Player();



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
