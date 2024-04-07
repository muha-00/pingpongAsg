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

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPaddles() {
    ctx.beginPath();
    ctx.rect(bottomPaddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  
    ctx.beginPath();
    ctx.rect(topPaddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "#DD9500";
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("User: " + userScore, 8, 20);
    ctx.fillStyle = "#DD9500";
    ctx.fillText("AI: " + aiScore, canvas.width - 65, 20);
  }
  
  function moveBall() {
    if (!isGameRunning) return;
  
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
  
    if (ball.y + ball.radius > canvas.height) {
      aiScore++;
      if (aiScore >= 20) {  // Correcting the condition to 20
        endGame('AI');
      } else {
        resetBall();
      }
    } else if (ball.y - ball.radius < 0) {
      userScore++;
      if (userScore >= 20) {  // Correcting the condition to 20
        endGame('User');
      } else {
        resetBall();
      }
    }
  
    if ((ball.y + ball.radius > canvas.height - paddleHeight && ball.x > bottomPaddleX && ball.x < bottomPaddleX + paddleWidth) ||
        (ball.y - ball.radius < paddleHeight && ball.x > topPaddleX && ball.x < topPaddleX + paddleWidth)) {
      ball.dy = -ball.dy;
    }
  }
  
  function movePaddles() {
    if (rightPressed && bottomPaddleX < canvas.width - paddleWidth) {
      bottomPaddleX += paddleSpeed;
    } else if (leftPressed && bottomPaddleX > 0) {
      bottomPaddleX -= paddleSpeed;
    }
  
    if (ball.dx > 0 && topPaddleX + paddleWidth / 2 < ball.x) {
      topPaddleX += paddleSpeed - 1;  // AI is slightly slower
    } else if (ball.dx > 0 && topPaddleX + paddleWidth / 2 > ball.x) {
      topPaddleX -= paddleSpeed - 1;
    }
  }