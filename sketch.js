
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "nice try";

function preload(){
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
bananaImage = loadImage("banana.png");  
obstacleImage = loadImage("obstacle.png");  

  
 
}


function setup() {
  createCanvas(600,600);
//creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x);
  
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,360,900,10);
  invisibleGround.visible = false;

   fill = green
  
  
}


function draw() {
  background("lightblue");

  //when we press space the monkey will jump upwards.
  if(keyDown("space")&& monkey.y >= 200)
     {
     monkey.velocityY=-10;
     }
   
  monkey.velocityY = monkey.velocityY+0.8;
  
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }

  food();
  spawnRocks();

  if(gamestate===PLAY){
    gameover.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+2;
    score = score+1 ;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gamestate===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover : " + gameover,180,200);
    
  
    }
    
  //this is to help display the survival time text on the canvas. 
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,200,50);
  
 
  
  //monkey.setCollider  = 0,0,monkey.height,monkey.height;
  monkey.debug = true ; 
  

  monkey.collide( invisibleGround);
  drawSprites();
   
}

     
function food(){
  //this is to make sure the banana appears for every 80 frames.
   if(World.frameCount%60==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
      
  }
}
function spawnRocks(){
  // this is to make sure the obstacle appears after every 300 frames.
  if(World.frameCount%60==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
  
  function reset(){
    
    
  }
}
