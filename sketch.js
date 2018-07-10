
var planets=[];
var c;

function setup(){
  frameRate(120);
  createCanvas(600, 600);
  c = createInput();
  c.attribute("placeholder", "Eccentricity");
  c.attribute("value", "0.9");
  c.position(150, 20);

  ch = createElement("h2", "Eccentricity");
  ch.position(20, 1);
}

function draw(){
  background(0);
  ellipse(300,300,10,10);
  planets.forEach(function(planet){
    planet.render();
  });
  if(planets.length>0)
    if(frameCount-planets[0].i>=900)
      planets.shift();
}

var Planet = function(x, y){
  this.i=frameCount;
  this.sign = Math.sign(x);
  this.distance = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
  this.theta = Math.atan(y/ x);
  this.w=this.distance/10;
  this.r=this.distance;

  this.points=[];

  this.x=this.sign*this.r*cos(this.theta);
  this.y=this.sign*this.r*sin(this.theta);

  this.c = parseFloat(c.value());
  this.c = random()>0.5?this.c:1/this.c;

  this.speed=random(40,120);
  this.rgb = [ random(50, 255), random(50, 255), random(50, 255)];
  this.render=function(){
    push();
    translate(300, 300);
    this.update();
    
    this.points.push([this.x, this.y]);
    fill(this.rgb[0], this.rgb[1], this.rgb[2], 60000/(frameCount-this.i));
    // noStroke();
    
    //beginShape();
    for(let i=0; i<this.points.length; i++){
      
      stroke(this.rgb[0], this.rgb[1], this.rgb[2],i/this.points.length*255);
      point(this.points[i][0], this.points[i][1]);
      
    }
    // endShape();
    ellipse(this.x, this.y, this.w, this.w);
    pop();
  };
  this.update = function(){
    this.x=this.sign*this.r*cos((frameCount-this.i)/this.speed+this.theta)*this.c;
    this.y=this.sign*this.r*sin((frameCount-this.i)/this.speed+this.theta)*1/this.c;
  };
};


function mouseReleased(){
  let newPlanet = new Planet(map(mouseX,0,600,-300,300), map(mouseY,0,600,-300,300));
  planets.push(newPlanet);
}