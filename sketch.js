
var planets=[];

function setup(){
  createCanvas(600, 600);
}

function draw(){
  background(0);
  planets.forEach(function(planet){
    planet.render();
  });
}

var Planet = function(x, y){
  this.x=x;
  this.y=y;
  this.w=random(10, 30);
  this.r=random(1.5, 3.5);
  this.speed=6*(Math.pow(10, random(1,2)));
  this.render=function(){
    push();
    this.update();
    fill(255);
    stroke(255);
    ellipse(this.x, this.y, this.w, this.w);
    pop();
  };
  this.update = function(){
    this.x+=this.r*cos(frameCount/this.speed);
    this.y+=this.r*sin(frameCount/this.speed);
  };
};


function mouseReleased(){
  let newPlanet = new Planet(mouseX, mouseY);
  planets.push(newPlanet);
}