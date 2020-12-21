
// this set up the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// this starts a variable to store the mouse x and y cordnats
var mouse = {
  x:undefined,
  y:undefined
}
//
var maxRadius = 45;
// this sets the colors for the circles
var colorArray = [
  '#581845',
  '#900c3f',
  '#c70039',
  '#ff5733',
  '#ffc300',
];
// this gets the mouse cordnats and records them var mouse
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
// this allows the window to be resized and keeps the circles filling the screen
window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

// this is the meat of the code and how the circles are created
function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy =dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function(){
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, Math.PI *2);
    ctx.fillStyle = this.color;
    ctx.fill();

  }

  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){this.dx = -this.dx}
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){this.dy = -this.dy}
    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50
     ){
       if(this.radius < maxRadius){
         this.radius += 1;
       }
    }else if(this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];

function init(){

  circleArray = [];

  for(var i = 0; i < 800; i++){
    var radius = Math.random()* 5 + 1;
    var x = Math.random()*(innerWidth - radius * 2) + radius;
    var y = Math.random()*(innerHeight - radius * 2) + radius;
    var dx = (Math.random() -0.5) *2;
    var dy = (Math.random() -0.5) *2;

    circleArray.push(new Circle(x, y, dx, dy, radius));

  }

}


function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  text();
}
init();
animate();
