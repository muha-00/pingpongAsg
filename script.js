let canvas = document.getElementById('pingPongCanvas');
let ctx = canvas.getContext('2d');


let isGameRunning = false;

// Ball properties
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 3, 
  dy: 2,  
};