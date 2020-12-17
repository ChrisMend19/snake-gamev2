var x = [];
var y = [];
//variables for collison(distance)
var appleX;
var appleY;
var appleRad;
var mouseRad;
var a = b = 200
var life, count, fireW1
count=0
var endGame=true
var earDown = false
var moveEar = true
var rightmove = false
var ret = 20
var catX = 205
var catY = 195
var c = 1
var earR
var catPosX  = 0 
var catPosY = 0
var movecatX = 100
var movecatY = 200
var loc, dir

var animate = false;
var legR;
var legDown = false
var animate = false
var timeCount=false
var timer = 20;
//number of segements 
var bodyNum = 10;
//diameter of each segment
var bodyLength = 10;

//direction the point is facing in the beginning
for (var i = 0; i < bodyNum; i++) 
{
  x[i] = 90
  y[i] = 90 

}


function setup() 
{
  createCanvas(800, 400);
  

  noStroke();
  //apple spawns randomly
  appleX = random(width)
  appleY = random(height)
  mouseRad = 10
  appleRad = 30
  legR = 0

    loc = createVector(10, 320);
    dir = createVector(1,0);

    push()
    fireW1 = new PSys(400, -1000, 100);
    pop()
   
}

function draw() 
{
  
  background(100, 177, 209);
  keys();

   for(var i = 0; i <= height-10; i+=20)
  {
    for (var j = 0; j <= width; j+=5)
    {
      fill('#48DE16')
      triangle(j,i,j+5,i,j+2.5,i-7.5)
    }
  }

  //draws first body segment
  bodySegment(0, a, b);
  //body segment increaser
  for (var i = 0; i < x.length - 1; i++) 
  {
    bodySegment(i + 1, x[i], y[i]);
    //collision based off distance
  }
  //draws apples
  apples();

  if ((circleDistance(a,b,mouseRad,appleX,appleY,appleRad)) < (-appleRad/2)-(mouseRad/2))
  {
 
    appleX = random(width)
    appleY = random(height)
    count = count+1
  }

  if(a > width || a < 0 || b < 0 || b > height)
  {
    GAME_OVER();
    noLoop(); 
  }

if(count==10){
  drawWinScreen()
  endGame=false
  timeCount=false
}

  lifeCounter()


  if(animate)
  {
    moveLegs();
  }

if(timeCount==true){
  if(frameCount % 60 == 0 && timer > 0){
      timer--;
    }
    textSize(36);
    textFont('Helvetica');
    text(String(timer), 745, 40);
  if(timer == 0){
    GAME_OVER();
    noLoop();
  }
}

}

//what draws every single ball
function bodySegment(i, xin, yin) 
{
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - (bodyLength * cos(angle));
  y[i] = yin - (bodyLength * sin(angle));
  segment(x[i], y[i], angle);
  
}

//what makes each individual ball of the body
function segment(x, y, a) 
{
  push();
  translate(x, y);
  rotate(a);
  fill(0,255,0)
  ellipse(0, 0, bodyLength);
  fill(255,0,0)
  ellipse(0,0,bodyLength * .6)
  
  push();
    rotate(legR)
    rect(0,0,5,10)

  pop();

  pop();


}

function apples()
{
  fill('red')
  ellipse(appleX, appleY, appleRad)
}

function keys()
{
  if (keyIsDown(LEFT_ARROW)) {
    a -= 5;
    timeCount=true
  }

  if (keyIsDown(RIGHT_ARROW)) {
    a += 5;
    timeCount=true
  }

  if (keyIsDown(UP_ARROW)) {
    b -= 5;
    timeCount=true
  }

  if (keyIsDown(DOWN_ARROW)) {
    b += 5;
    timeCount=true
  }

//W 
if (keyIsDown(87)) {
    b -= 7;
    timeCount=true
  }
//A
if (keyIsDown(65)) {
    a -= 7;
    timeCount=true
  }
//S
if (keyIsDown(83)) {
    b += 7;
    timeCount=true
  }
//D
if (keyIsDown(68)) {
    a += 7;
    timeCount=true
  }


  

   animate=true
}

function mouseClicked()
{
  Program.restart();
}

function GAME_OVER()
{
  //frameRate(3)
background(255,0,0)


  fill(200)
  rect(10,10,780,380)
//background(0,220,0)     

for(var j=-500;j<780;j+=200){
  
for(var i=-1010;i<1130;i+=200){
  push()
  
  caterpillar(i,j)
  
  
  
  pop() 
}
}
push()
  
fill(255,0,0);
textSize(120)
text('GAMEOVER!', 30, 230);
pop()
  //grass()
  endGame=false
}

function lifeCounter(){
  
if(endGame==true){
  fill(250)
  textSize(25)
  textFont('Georgia')
  text('Score: '  +count+ '/' + '10' , 50, 50)
 }

}

function circleDistance(x1,y1,rad1,Cx,Cy,rad2)
{
  return sqrt((x1-Cx)*(x1-Cx)+(y1-Cy)*(y1-Cy))-rad1-rad2;
}





function Particle(x , y) 
{
   // the data associated with a particle
   this.accelY = 0.005; //gravity
   this.velX = random(-1, 1);
   this.velY = random(.5, 1.3);

   // note this particle only can vary its blue color 
   // - change this to include red and green
   this.pcolorB = random(255);
   this.locX = x;
   this.locY = y;
   this.r = 30.0;
   this.life = 100;
  
   // a function to update the particle each frame
   this.updateP = function()
   {
      this.velY += this.accelY;
      this.locX += this.velX;
      this.locY += this.velY;
      this.life -= 1;
   };
  
   // function to draw a particle
   this.renderP = function() 
   {
      noStroke();
      push();
         fill(random(0,255),random(0,255),random(0,255));
         translate(this.locX, this.locY);
         ellipse(0, 0, this.r, this.r);
      pop();
   };
} //end of particle object definition


// define a group of particles as a particleSys
function PSys(sX, sY, num)
{
   // the data - lots of particles
   this.particles = [];
   for (var i=0; i < 100; i++) 
   {
      this.particles.push(new Particle(sX, sY));
   }
  
   // function defining what to do each frame
   this.run = function() 
   {
      for (var i=0; i < this.particles.length; i++) 
      {
         //update each particle per frame
         this.particles[i].updateP();
         this.particles[i].renderP();
      }
   }
}





function drawWinScreen(){
  
//frameRate(3)
background(255)

fill(0,200,200)
rect(15,15,765,375)

fill(0,200,0)
rect(0,365,800,375)

push()
translate(380,210)
//rotate(PI/20)
fill(0)
rect(0,0, 120,1200)
pop()

push()
translate(384,213)
//rotate(PI/20)
fill(255)
rect(0,0, 112,1200)
pop()

//background(0,220,0)     


caterpillar()
{
  if(loc.x<450)
  moveCat()

if(loc.x==450)
  c=.01
  

}


//loc.x+=dir.x
  
fireW1.run();   
    


push()
  
fill('yellow');
textSize(120)
text('WINNER!', 140, 170);
pop()
  //grass()
}



function moveCat(){
loc.add(dir)
}

function caterpillar(catPosX,catPosY){



//ret=20
push()
    noStroke()
    translate(loc.x,loc.y)
    scale(c)
    translate(catPosX,catPosY)

  push()
    fill('#003600')
    ellipse(-29,65.5,10,20)
    ellipse(-5,60.5,10,20)
  pop()
  
  push()
    fill("#91F11D")
    ellipse(-25,25,80)
  pop()

  push()
    fill("#91F11D")
    ellipse(5,-5,80)
  pop()
  
  push()
    noStroke()
    fill('black')
    translate(270,105)
    rotate(-PI/10)
    translate(-220,-195)
    ellipse(5,0,7,15)
    ellipse(20,0,7,15)
    fill(0)
    arc(12.5,25,13,8,0,PI)
  pop()

  push()
    noStroke()
    fill("#91F11D")
    translate(-25,-32)
    scale(.5)
    rotate(earR)
    translate(-337,-163)
    beginShape()
    curveVertex(349,163)
    curveVertex(349,163)
    curveVertex(340,100)
    curveVertex(348,47)
    curveVertex(350,47)
    curveVertex(350,100)
    curveVertex(360,159)
    curveVertex(370,163)
    endShape()
  pop()

  push()
    noStroke()
    fill("#91F11D")
    translate(9,-25)
    scale(.4)
    rotate(earR)
    translate(-337,-163)
    beginShape()
    curveVertex(349,163)
    curveVertex(349,163)
    curveVertex(340,100)
    curveVertex(348,47)
    curveVertex(350,47)
    curveVertex(350,100)
    curveVertex(360,159)
    curveVertex(370,163)
    endShape()
  pop()

  push()
    fill(0)
    ellipse(20,-70,13,14)
    ellipse(-10,-90,13,14)
  pop()
  
  push()
    fill(0)
    translate(-362,-264)
    beginShape()
    curveVertex(326,257)
    //curveVertex(326,260)
    curveVertex(326.5,257)
    curveVertex(327.5,257)
    curveVertex(334.5,275)
    curveVertex(343,291)
    curveVertex(370.5,299.5)
    curveVertex(370,307)
    curveVertex(342,299.5)
    curveVertex(336,292)
    curveVertex(331,281.2)
    curveVertex(327.5,269)
    curveVertex(325,254)
    curveVertex(324,250)
    curveVertex(324,250)
    endShape()
  pop()

  push()
    fill('#D1D303')
    ellipse(-45,5,10,15)
    ellipse(-40,30.5,10,15)
    ellipse(-25,50,10,15)
  pop()
pop()
  }


function moveCat() 
{
   // update the ducks global location
   loc.add(dir);
}

function moveLegs()
{
  if(legR < -PI/10)
  {
    legDown = false
  }
  if(legR > PI/10)
  {
    legDown = true
  }
  if(legDown == true)
  {
    legR -= PI/100
  }
  else
  {
    legR += PI/100
  }

}
