//make point source emitters, diffuse

var sketch= function( p ) {
  var w = 300;
  var h = 300;
  var density = 5;
  var shimmering= [];
  var logo = p.loadImage("img/embedly.png");
  var scale = 0.5;
  var start = new Date().getTime();

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

    for(var i=0;i<shimmering.length; i++){
      var b = shimmering[i];
      b.update();
      b.render();
    }

    var rem = [];
    for (var i = 0; i < shimmering.length; i++) {
      if(shimmering[i].radius< 5){
        rem.push(i);
      }
    }

    if(rem.length>0){
      rem.forEach(function(a){
        shimmering.splice(a,1);
      });
    }

    //draw shimmers
    var period = 1000;
    var end = new Date().getTime();
    var elapsed = end-start;
    elapsed %= period;

    var ang = p.map(elapsed, 0,period,0,359);
    var rad = 65;

    createShimmer(p.width/2 +rad*p.cos(ang), p.height/2 + rad*p.sin(ang), density);

    //draw logo
    p.tint([0.55 + 0.05*p.sin(ang),1,1,200+60*(p.cos(ang))]);
    p.image(logo,p.width/2 - (scale*logo.width/2),p.height/2 - (scale*logo.height/2), scale* logo.width, (scale* logo.height));

  };

  p.mouseDragged = function(){

    var build = 1;

    if(build==1){
      createShimmer(p.mouseX, p.mouseY, density);
    }

  }

  var createShimmer = function(x,y,dens){
     for(var i = 0; i< dens ; i++){
      var b = new Shimmer(x, y);
      shimmering.push(b);
      }
  }

  //shimmers
  function Shimmer(x,y){
    this.x = x;
    this.y = y;
    this.maxsize = 20;
    this.radius = p.random(10,this.maxsize);
    this.orbit = 5;
    this.breath_length = p.random(100,360);
    this.breath=p.random(this.breath_length);
    this.angle = p.random(0,360);
    this.speed = p.random(0,1);
    this.speed_rotate= 0;

    this.update = function(){
      this.breath +=10;
      this.breath %= 360;

      this.radius-=0.1;

      this.x += this.speed*p.cos(this.angle);
      this.y += this.speed*p.sin(this.angle);

      this.x%= w;
      this.y%= h;

    }

    this.render = function(){
      p.push();
      p.translate(this.x,this.y);
      p.noStroke();
      p.fill(0.6,this.radius/this.maxsize,1);
      p.ellipse(0,0,this.radius,this.radius);
      p.pop();
    }
  }

};


//connect
var myp5 = new p5(sketch, 'canvas');


