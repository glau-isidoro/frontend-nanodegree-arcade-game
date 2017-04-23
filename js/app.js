var playerInitX = 202;
var playerInitY = 405;
var enemyInitY = [140, 225, 310];
var rockInitX = [0, 101, 202, 303, 404];
var tinyHeartInitX = [1, 20, 40, 60, 80];
var allRocks = [];
var allEnemies = [];
var player;
var placarVida = [];
var placarLevel;

function resetGame() {
  allRocks = [];
  for( var i = 0; i < 5; i++ ){
      allRocks[i] = new Rocks(i);
  }

  allEnemies = [];
  for( var i = 0; i < 2; i++ ){
      allEnemies[i] = new Enemy();
  }

  player = new Player();

  placarVida = [];
  for( var i = 0; i < 5; i++ ){
      placarVida[i] = new PlacarVida(i);
  }

  placarLevel = new PlacarLevel();

}

// Enemies
var Enemy = function() {

    this.x = -70;
    this.y = enemyInitY[Math.floor((Math.random() * 3))];
    this.cabecinha = this.x + 101;
    this.speed = Math.floor((Math.random() * 100) + 10);
    this.pause = false;

    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {

  if(!this.pause) {
      if( this.x < 505) {
          this.x += this.speed * dt * 3;
          this.cabecinha = this.x + 101;
      } else {
          this.x = -70;
          this.y = enemyInitY[Math.floor((Math.random() * 3))];
          this.cabecinha = this.x + 101;
          this.speed = Math.floor((Math.random() * 70) + 10);
      }
      if(this.y == player.y - 10) {
          if(
              ( this.cabecinha >= player.orelhaE && this.cabecinha <= player.orelhaD ) ||
              ( this.x >= player.orelhaE && this.x <= player.orelhaD )
            ) {
                allEnemies.forEach(function(enemy) {
                    enemy.pause = true;
                    enemy.x = -110;
                    setTimeout(function(){ enemy.pause = false; }, 500);
                });
                player.life--;
                player.sprite = 'images/char-death.png';
                placarVida.pop();
                setTimeout(function(){ player.reset(); }, 500);
          }
      }
  }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function() {

    this.x = playerInitX;
    this.y = playerInitY;

    this.orelhaE = this.x + 18;
    this.orelhaD = this.x + 84;

    this.level = 1;
    this.life = 5;

    this.sprite = 'images/char-cat-girl.png';
};
Player.prototype.update = function(dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = playerInitX;
    this.y = playerInitY;
    if(this.level == 6 || this.life == 0) {
        resetGame();
    } else {
      placarLevel.sprite = 'images/level-' + this.level + '.png';
    }

};
Player.prototype.handleInput = function(keyCode) {

    if( this.sprite == 'images/char-cat-girl.png' ) {
        if( keyCode == 'up' && this.y > 90 ) {
            this.y = this.y - 85;

            if( this.y < 90 ) {

              var column = this.x / 101;
              if( allRocks[column] ) {
                  this.level++;
                  allEnemies.push( new Enemy() );
                  setTimeout(function(){ delete allRocks[column]; }, 500);
              } else {
                  this.life--;
                  this.sprite = 'images/bubbles.png';
                  placarVida.pop();
              }

              setTimeout(function(){ player.reset(); }, 500);

            }

        } else if( keyCode == 'down' && this.y < 400 ) {
            this.y = this.y + 85;
        } else if( keyCode == 'right' && this.x < 400 ) {
            this.x = this.x + 101;
            this.orelhaE = this.x + 18;
            this.orelhaD = this.x + 84;
        } else if( keyCode == 'left' && this.x > 100 ) {
            this.x = this.x - 101;
            this.orelhaE = this.x + 18;
            this.orelhaD = this.x + 84;
        }
    }

};

// Pedras
var Rocks = function( pos ) {
    this.x = rockInitX[pos];
    this.y = 55;

    this.sprite = 'images/Rock.png';
};
Rocks.prototype.update = function(dt) {

};
Rocks.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Placares
var PlacarVida = function(index) {

    this.x = tinyHeartInitX[index];
    this.y = 50;

    this.sprite = 'images/tiny-Heart.png';
}
PlacarVida.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
PlacarVida.prototype.update = function(dt) {

};

var PlacarLevel = function(index) {

    this.x = 424;
    this.y = 55;

    this.sprite = 'images/level-1.png';
}
PlacarLevel.prototype.update = function(dt) {

};
PlacarLevel.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Instantiate objects.
resetGame();


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
