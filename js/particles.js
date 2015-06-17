//make point source emitters, diffuse

var sketch= function( p ) {
  var w = 1000;
  var h = 400;
  var density = 2;
  var shimmering= [];
  var logo = p.loadImage("img/embedly.png");
  var scale = 0.4;
  var start = new Date().getTime();
  var maxlen = 250;
  col = 50;

  p.setup = function() {
    p.colorMode(p.HSB, 1, 1, 1);
    p.angleMode(p.DEGREES)
      p.rectMode(p.CENTER)
      p.frameRate(40);
    p.createCanvas(w, h);
    p.background(1);

  };

  p.draw = function() {
    p.background(1);

    col +=0.1;
    col%=100;

    for(var i=0;i<shimmering.length; i++){
      var b = shimmering[i];
      b.update();
      b.render();
    }

    var rem = [];
    for (var i = 0; i < shimmering.length; i++) {
      if(shimmering[i].radius> shimmering[i].maxsize){
        rem.push(i);

      }
    }

    if(rem.length>0){
      rem.forEach(function(a){
        shimmering.splice(a,1);
      });
    }

    //draw shimmers
    var period = 3000;
    var end = new Date().getTime();
    var elapsed = end-start;
    elapsed %= period;

    var ang = p.map(elapsed, 0,period,0,359);
    var rad = 45;
    var ang = p.random(0,359);

    if(p.frameCount%2 ==0){
    createShimmer(p.width/2 +rad*p.cos(ang), p.height/2 + rad*p.sin(ang), density, ang);
    }

    //draw logo
   // p.tint([0.55 + 0.05*p.sin(ang),1,1,200+60*(p.cos(ang))]);

    p.tint([col/100,1,4]);
    p.image(logo,p.width/2 - (scale*logo.width/2),p.height/2 - (scale*logo.height/2), scale* logo.width, (scale* logo.height));


  };

  p.mouseDragged = function(){

    var build = 1;

    if(build==1){
      createShimmer(p.mouseX, p.mouseY, density, p.random(0,360));
    }

  }

  var createShimmer = function(x,y,dens, ang){

     while(shimmering.length > maxlen){
      shimmering.shift();
    console.log(shimmering.length);
     }

     for(var i = 0; i< dens ; i++){
      var b = new Shimmer(x, y, ang);
      shimmering.push(b);
      }
  }

  //shimmers
  function Shimmer(x,y, ang){
    this.x = x;
    this.y = y;
    this.maxsize = 100;
    this.radius = 5;
    this.orbit = 5;
    this.breath_length = p.random(100,360);
    this.breath=p.random(this.breath_length);
    this.angle = ang;
    this.speed = p.random(0.2,2);
    this.speed_rotate= 0;
    this.col = col/100;

    this.update = function(){
      this.breath +=10;
      this.breath %= 360;

      this.radius+=0.5;

      this.x += this.speed*p.cos(this.angle);
      this.y += this.speed*p.sin(this.angle);

  //    this.x%= w;
//      this.y%= h;

    }

    this.render = function(){
      p.push();
      p.translate(this.x,this.y);
      p.noStroke();
      p.fill(this.col,p.min(this.borderDist(), 1-(this.radius / this.maxsize)),1);
      p.ellipse(0,0,this.radius,this.radius);
      p.pop();
    }

    this.borderDist = function(){
      var offset = 50;
      var m = (p.min(100,this.x-offset, w-this.x-offset, this.y-offset, h-this.y-offset))/100;
      return m
    }
  }

};


//connect
var myp5 = new p5(sketch, 'canvas');


