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

// Paddle properties
let paddleHeight = 10;
let paddleWidth = 75;
let bottomPaddleX = (canvas.width - paddleWidth) / 2;
let topPaddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 5;  // Adjusted AI speed for better balance

// Scores
let userScore = 0;
let aiScore = 0;


let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);