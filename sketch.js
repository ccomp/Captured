var spr, spr2, spr3, spr4, spr5, spr6, vis2, vis3, gameVar;
// spr 1 - 6 are the sprites
// spr is reserved for the player sprite
// spr 2 - 6 are the walls
// the vis variables are "visibility" variables and are used to toggle walls on or off
// gameVar is used to check whether or not the game is accessing a level for the first time
var levelone = false, levelzero = true, leveltwo = false;
function setup() {
  var canvas = createCanvas(768, 1024);
  canvas.parent("canvas");
  gameVar = 0;
  vis2 = true;
  vis3 = true;
  spr = createSprite(width/2, 0, 40, 40);
  spr.shapeColor = color(250);
}
function draw() {
  background(50);
  var temp = (mouseY-spr.position.y)*0.2;
  if (temp > 30 || temp < -30) { 
    if (temp > 30) { temp = 30 }
    else temp = -30
  } //velocity cannot be greater than 30 or else the sprite will phase through the wall
  spr.velocity.x = (mouseX-spr.position.x)*0.2;
  spr.velocity.y = temp;
  if (levelzero == true) { LEVEL0(); }
  if (levelone == true) { LEVEL1(); }
  drawSprites();
  if (spr.position.y > (height-90)) {
    if (levelzero == true) {
      gameVar = 0;
      console.log("level 0 completed!");
      levelzero = false;
      levelone = true;
      spr2.remove();
      spr3.remove();
    }
  } else if (spr.position.y < 90) {
    if (levelone == true) {
      gameVar = 0;
      console.log("level 1 completed!");
      levelone = false;
      leveltwo = true;
      spr2.remove();
      spr3.remove();
      spr4.remove();
      spr5.remove();
      spr6.remove();
    }
  }
}
function mousePressed() {
  if (levelzero == true) {
    if (vis2 == true) {
      spr2.position.y = -10000;
      spr3.position.y = -10000;
      vis2 = false;
    } else {
      spr2.position.y = 300;
      spr3.position.y = 600;
      vis2 = true;
    }
  }
  if (levelone == true) {
    if (vis2 == true) {
      spr2.position.y = -10000;
      spr3.position.y = -10000;
      spr4.position.y = -10000;
      spr5.position.y = -10000;
      spr6.position.y = -10000;
      vis2 = false;
    } else {
      spr2.position.y = 300;
      spr3.position.y = 400;
      spr4.position.y = 500;
      spr5.position.y = 600;
      spr6.position.y = 700;
      vis2 = true;
    }
  }
}
function LEVEL0() {
  if (gameVar == 0) {
    spr2 = createSprite(width/2, 300, width, 60);
    spr3 = createSprite(width/2, 600, width, 60);
    spr2.shapeColor = color(250);
    spr3.shapeColor = color(250);
  }
  gameVar += 1;
  spr.collide(spr2);
  spr.collide(spr3);
}

function LEVEL1() {
	if (gameVar == 0) {
    spr2 = createSprite(width/2, 300, width, 30);
    spr3 = createSprite(width/2, 400, width, 30);
    spr4 = createSprite(width/2, 500, width, 30);
    spr5 = createSprite(width/2, 600, width, 30);
    spr6 = createSprite(width/2, 700, width, 30);
    spr2.shapeColor = color(250);
    spr3.shapeColor = color(250);
    spr4.shapeColor = color(250);
    spr5.shapeColor = color(250);
    spr6.shapeColor = color(250);
  }
  gameVar += 1;
  spr.collide(spr2);
  spr.collide(spr3);
  spr.collide(spr4);
  spr.collide(spr5);
  spr.collide(spr6);
}