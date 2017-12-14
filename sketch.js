var serial, inData, spr, spr2, spr3, spr4, spr5, spr6, vis2, vis3, gameVar;
var pot, switch0, switch1, switch2, switch3, switch4;
var left_bg, right_bg, middle_bg;
// spr 1 - 6 are the sprites
// spr is reserved for the player sprite
// spr 2 - 6 are the walls
// the vis variables are "visibility" variables and are used to toggle walls on or off
// gameVar is used to check whether or not the game is accessing a level for the first time
var levelone = false, levelzero = true, leveltwo = false, endlevel = false;
var portName = 'COM4';
var doorway, left_side, right_side, middle_path, walking_up, walking_down, standing;
var bottom_doorBG, top_doorBG, bottom_door, top_door;
var end_animation;
//149 x 600
function preload() {
  doorway = loadImage("img/assets/doors/door_close.png");
  left_side = loadImage("img/assets/sides_n_floors/left_side.png");
  right_side = loadImage("img/assets/sides_n_floors/right_side.png");
  middle_path = loadImage("img/assets/sides_n_floors/middle_path.png");
  walking_up = loadAnimation("img/game_character/back_facing_character/1.png", "img/game_character/back_facing_character/2.png", "img/game_character/back_facing_character/3.png", "img/game_character/back_facing_character/4.png");
  walking_down = loadAnimation("img/game_character/front_facing_character/1.png", "img/game_character/front_facing_character/2.png", "img/game_character/front_facing_character/3.png", "img/game_character/front_facing_character/4.png");
  standing = loadImage("img/game_character/front_facing_character/1.png");
  bottom_doorBG = loadImage("img/assets/doorways/downwards_bottom_doorway.png");
  top_doorBG = loadImage("img/assets/doorways/upwards_top_doorway.png");
}

function setup() {
  var canvas = createCanvas(450, 600);
  serial = new p5.SerialPort();
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  canvas.parent("canvas");
  gameVar = 0;
  vis2 = true;
  vis3 = true;
  left_bg = createSprite(0, 0, 149, 600);
  middle_bg = createSprite(149, 0, 110, 600);
  right_bg = createSprite(259, 0, 149, 600);
  left_bg.addImage(left_side);
  middle_bg.addImage(middle_path);
  right_bg.addImage(right_side);
  top_door = createSprite(0, 0, 50, 50);
  bottom_door = createSprite(0, 0, 50, 50);
  top_door.addImage(top_doorBG);
  bottom_door.addImage(bottom_doorBG);
  spr = createSprite(width/2, 0, 40, 40);
  spr.shapeColor = color(250);
  spr.addImage("stand", standing);
  spr.addAnimation("walk-up", walking_up);
  spr.addAnimation("walk-down", walking_down);
  pot = 0;
  serial.open(portName);
}
function draw() {
  background(50);
  left_bg.position.x = (width/2)-149;
  middle_bg.position.x = width/2;
  right_bg.position.x = (width/2)+149;
  left_bg.position.y = height/2;
  middle_bg.position.y = height/2;
  right_bg.position.y = height/2;
  top_door.position.x = width/2;
  top_door.position.y = 0;
  bottom_door.position.x = width/2;
  bottom_door.position.y = height;
  var y = Math.round(pot);
  // var y = Math.round(mouseY);
  var temp = (y-spr.position.y)*0.2;
  if (temp > 30 || temp < -30) { 
    if (temp > 30) { temp = 30 }
    else temp = -30
  } 
  // console.log(temp);
  //velocity cannot be greater than 30 or else the sprite will phase through the wall
  spr.velocity.y = temp;
  if (spr.velocity.y > 1) { spr.changeAnimation("walk-down"); }
  else if (spr.velocity.y < -1) { spr.changeAnimation("walk-up"); }
  else spr.changeAnimation("stand");
  if (levelzero == true) { LEVEL0(); }
  if (levelone == true) { LEVEL1(); }
  if (leveltwo == true) { LEVEL2(); }
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
    if (leveltwo == true) {
      gameVar = 0;
      console.log("level 2 completed!")
      leveltwo = false;
      levelthree = true;
      spr2.remove();
      spr3.remove();
      spr4.remove();
      spr5.remove();
      spr6.remove();
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
      spr2.position.y = height/3;
      spr3.position.y = height*(2/3);
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
      spr2.position.y = height/6;
      spr3.position.y = height*(2/6);
      spr4.position.y = height*(3/6);
      spr5.position.y = height*(4/6);
      spr6.position.y = height*(5/6);
      vis2 = true;
    }
  }
}
function LEVEL0() {
  if (gameVar == 0) {
    spr2 = createSprite(width/2, height/3, width, 30);
    spr3 = createSprite(width/2, height*(2/3), width, 30);
    // spr2.shapeColor = color(250);
    // spr3.shapeColor = color(250);
    spr2.addImage(doorway);
    spr3.addImage(doorway);
  }

  gameVar += 1;
  spr.collide(spr2);
  spr.collide(spr3);
  if (switch1 == 1) {
    spr2.position.y = -10000;
  } else if (switch1 == 0) {
    spr2.position.y = height/3;
  }
  if (switch3 == 1) {
    spr3.position.y = -10000;
  } else if (switch3 == 0) {
    spr3.position.y = height*(2/3);
  }
}

function LEVEL1() {
	if (gameVar == 0) {
    spr2 = createSprite(width/2, height/6, width, 30);
    spr3 = createSprite(width/2, height*(2/6), width, 30);
    spr4 = createSprite(width/2, height*(3/6), width, 30);
    spr5 = createSprite(width/2, height*(4/6), width, 30);
    spr6 = createSprite(width/2, height*(5/6), width, 30);
    spr2.addImage(doorway);
    spr3.addImage(doorway);
    spr4.addImage(doorway);
    spr5.addImage(doorway);
    spr6.addImage(doorway);
  }
  gameVar += 1;
  spr.collide(spr2);
  spr.collide(spr3);
  spr.collide(spr4);
  spr.collide(spr5);
  spr.collide(spr6);
  if (switch0 == 1) {
    spr4.position.y = -10000;
  } else if (switch0 == 0) {
    spr4.position.y = height/6;
  }
  if (switch1 == 1) {
    spr2.position.y = height*(2/6);
  } else if (switch1 == 0) {
    spr2.position.y = -10000;
  }
  if (switch2 == 1) {
    spr5.position.y = -10000;
  } else if (switch2 == 0) {
    spr5.position.y = height*(3/6);
  }
  if (switch3 == 1) {
    spr6.position.y = height*(4/6);
  } else if (switch3 == 0) {
    spr6.position.y = -10000;
  }
  if (switch4 == 1) {
    spr3.position.y = -10000;
  } else if (switch4 == 0) {
    spr3.position.y = height*(5/6);
  }
}

function LEVEL2() {
  if (gameVar == 0) {
    spr2 = createSprite(width/2, height/6, width, 30);
    spr3 = createSprite(width/2, height*(2/6), width, 30);
    spr4 = createSprite(width/2, height*(3/6), width, 30);
    spr5 = createSprite(width/2, height*(4/6), width, 30);
    spr6 = createSprite(width/2, height*(5/6), width, 30);
    spr2.addImage(doorway);
    spr3.addImage(doorway);
    spr4.addImage(doorway);
    spr5.addImage(doorway);
    spr6.addImage(doorway);
  }
  gameVar += 1;
  spr.collide(spr2);
  spr.collide(spr3);
  spr.collide(spr4);
  spr.collide(spr5);
  spr.collide(spr6);
  if (switch0 == 1) {
    spr4.position.y = height/6;
  } else if (switch0 == 0) {
    spr4.position.y = -10000;
  }
  if (switch1 == 1) {
    spr2.position.y = -10000;
  } else if (switch1 == 0) {
    spr2.position.y = height*(2/6);
  }
  if (switch2 == 1) {
    spr5.position.y = height*(3/6);
  } else if (switch2 == 0) {
    spr5.position.y = -10000;
  }
  if (switch3 == 1) {
    spr6.position.y = -10000;
  } else if (switch3 == 0) {
    spr6.position.y = height*(4/6);
  }
  if (switch4 == 1) {
    spr3.position.y = height*(5/6);
  } else if (switch4 == 0) {
    spr3.position.y = -10000;
  }
}

function serverConnected() {
  console.log('connected to the server');
}

function portOpen() {
  console.log('port opened');
}

function serialEvent() {
  inData = serial.readLine();
  if (inData.length > 0) {
    var controllerData = split(inData, ',');
    pot = Number(controllerData[0]);
    pot = map(pot, 0, 255, 0, height);
    switch0 = Number(controllerData[1]);
    switch1 = Number(controllerData[2]);
    switch2 = Number(controllerData[3]);
    switch3 = Number(controllerData[4]);
    switch4 = Number(controllerData[5]);
  }
}

function serialError(err) {
  console.log('something went wrong with the port. ' + err);
}


