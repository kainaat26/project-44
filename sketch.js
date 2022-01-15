var obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var gameOver;
var restart;

function preload(){
  bgImage = loadImage("bg2.png");
 pikachu_running =   loadAnimation("p1.png","p2.png","p3.png","p4.png");
 pikachu_collided =   loadAnimation("pikachu_end.png")
 obstacle1IMG = loadImage("bomb.png");
 obstacle2IMG = loadImage("image1.png");
 gameOverIMG = loadImage("gameOver.png");
 restartIMG = loadImage("restart.png");
}
function setup() {
  createCanvas(450,200);
 
bg = createSprite(225,100);
bg.addImage(bgImage);

pikachu = createSprite(50,180,20,50);
pikachu.addAnimation("running",pikachu_running);
pikachu.addAnimation("collided",pikachu_collided);
pikachu.scale=0.2;

invisibleGround = createSprite(220,195,450,5);
invisibleGround.visible = false;

gameOver = createSprite(225,100);
  gameOver.addImage(gameOverIMG);
  gameOver.scale = 0.2;

  restart = createSprite(225,150);
  restart.addImage(restartIMG);
 restart.scale = 0.03;

obstacleGroup = new Group();
gameOver.visible = false;
restart.visible = false;
}

function draw() 
{
  background('yellow');
  pikachu.collide(invisibleGround);
  drawSprites();
  
  text("Score: "+ score, 350,50);
  

  if (gameState === PLAY){
  
  spawnObstacles();
  spawnbomb();

  score = score + Math.round(getFrameRate()/60);

  if(keyDown(UP_ARROW) ){
    pikachu.velocityY = -8;  
  }
  if (bg.x <0){
    bg.x = bg.width/2;
  }
  bg.velocityX = -2;

  pikachu.velocityY = pikachu.velocityY + 0.8


  
  
  if(obstacleGroup.isTouching(pikachu)){
    gameState = END;
}
}
else if(gameState === END){

  gameOver.visible = true;
  restart.visible = true;
  pikachu.changeAnimation("collided",pikachu_collided);
invisibleGround.velocityX = 0;
pikachu.velocityY = 0;
bg.velocityX = 0;
obstacleGroup.setVelocityXEach(0);

if(mousePressedOver(restart)){
  reset();
}

}  
}
function spawnObstacles(){
  if(frameCount % 100 === 0) {
    var obstacle1 = createSprite(600,160,10,40);
    //obstacle.debug = true;
    obstacle1.velocityX = -2;
    
    //generate random obstacles
   
    obstacleGroup.add(obstacle1);
    obstacle1.addImage(obstacle2IMG);
    obstacle1.scale = 0.03;
    obstacle1.debug = true;
  }
}

function spawnbomb(){
  if(frameCount % 150 === 0){
    var obstacle2 = createSprite(600,180,10,40);
    obstacle2.velocityX = -2;
    obstacle2.addImage(obstacle1IMG);
obstacle2.scale = 0.07;
obstacleGroup.add(obstacle2);
obstacle2.debug = true;
obstacle2.setCollider("circle",0,0,40);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();

  pikachu.changeAnimation("running",pikachu_running);

  score =0;
}




