const Width = 360;
const Height = 640;
const gravity = 0.09;
const birdHeight = 40;
const birdWidth = 50;
const obstacleWidth = 80;
const WHITE = "#ffffff";
const BLACK = "#000000";
const obstacleGap = 250; // Gap between upper obstacle and lower obstacle
const obstacleInterval = 2500; // Time between two obstacles = 2.5s
class Bird {
  constructor(x, y, imageSrc, game) {
    this.x = x;
    this.y = y;
    this.velocityY = 0;
    this.image = new Image();
    this.image.onload = () => {
      game.draw();
    };
    this.image.src = imageSrc;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, birdWidth, birdHeight);
  }

  moveUp() {
    this.velocityY = -5;
  }
}

class Obstacle {
  constructor(x, y, height, upperImageSrc, lowerImageSrc) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.upperImage = new Image();
    this.upperImage.src = upperImageSrc;
    this.lowerImage = new Image();
    this.lowerImage.src = lowerImageSrc;
  }

  draw(ctx) {
    // Draw upper obstacle
    ctx.drawImage(this.upperImage, this.x, this.y, obstacleWidth, this.height);
    // Draw lower obstacle
    ctx.drawImage(
      this.lowerImage,
      this.x,
      this.y + this.height + obstacleGap,
      obstacleWidth,
      Height - this.height - obstacleGap
    );
  }

  move() {
    this.x -= 1; // Moves obstacle from right to left
  }
}

class Game {
  constructor() {
    this.isGameOver = false;
    this.bird = new Bird(30, Height / 2, "./flappy-bird.png", this);
    this.obstacles = [];
    this.score = 0;
    this.scoreboard = document.getElementById("scoreboard");
    this.ctx = null;
  }

  start() {
    this.resetGame();
    this.generateObstacles();
    this.ctx = board.getContext("2d");
    this.run();
  }

  generateObstacles() {
    setInterval(() => {
      const minHeight = 150;
      const maxHeight = Height - obstacleGap - minHeight;
      const randomHeight = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      const upperImageSrc = "./upper-pipe.png"; // Provide the correct path for the upper obstacle image
      const lowerImageSrc = "./bottom-pipe.png"; // Provide the correct path for the lower obstacle image
      const upperObstacle = new Obstacle(
        Width,
        0,
        randomHeight,
        upperImageSrc,
        lowerImageSrc
      );
      const lowerObstacle = new Obstacle(
        Width,
        randomHeight + obstacleGap,
        Height - randomHeight - obstacleGap,
        lowerImageSrc,
        lowerImageSrc
      );
      this.obstacles.push(upperObstacle, lowerObstacle);
    }, obstacleInterval);
  }
  checkCollision() {
    const birdLeft = this.bird.x;
    const birdRight = this.bird.x + birdWidth;
    const birdTop = this.bird.y;
    const birdBottom = this.bird.y + birdHeight;

    for (let i = 0; i < this.obstacles.length - 1; i += 2) {
      const upperObstacle = this.obstacles[i];
      const lowerObstacle = this.obstacles[i + 1];

      const upperObstacleBottom = upperObstacle.y + upperObstacle.height;
      const lowerObstacleTop = lowerObstacle.y;

      // Check collision with upper obstacle
      if (
        birdRight > upperObstacle.x &&
        birdLeft < upperObstacle.x + obstacleWidth &&
        birdBottom > upperObstacle.y &&
        birdTop < upperObstacleBottom
      ) {
        this.gameOver();
        break;
      }

      // Check collision with lower obstacle
      if (
        birdRight > lowerObstacle.x &&
        birdLeft < lowerObstacle.x + obstacleWidth &&
        birdTop < lowerObstacle.y + Height &&
        birdBottom > lowerObstacleTop
      ) {
        this.gameOver();
        break;
      }
    }
  }

  draw() {
    const context = board.getContext("2d");
    context.clearRect(0, 0, Width, Height); // Remove bird in the first frame
    this.bird.draw(context); // Add bird in the second frame
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.draw(context);
    }
  }
  drawGameOverText() {
    const canvas = document.getElementById("board");
    this.ctx = canvas.getContext("2d");
    this.ctx.font = "48px bolder";
    this.ctx.fillStyle = BLACK;
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", Width / 2, Height / 2 + 16);
  }

  update() {
    updateScore(this.score);
    this.bird.velocityY += gravity; // Apply gravity to the velocity
    this.bird.y += this.bird.velocityY; // Update the bird's position using the velocity
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // Remove obstacles that are off the screen
      if (obstacle.x + obstacleWidth < 0) {
        this.obstacles.splice(i, 1);
        i--;
        this.score += 0.5;
        updateScore(this.score);
        break;
      }
    }
    if (this.bird.y > Height - 100 || this.bird.y < 0) {
      this.gameOver();
    }
    this.checkCollision();
  }

  handleEvent(event) {
    if (event.key === "ArrowUp") {
      const jump = document.getElementById("jump");
      jump.play();
      this.bird.moveUp();
      this.draw();
    }
  }
  gameOver() {
    setTimeout(() => {
      this.drawGameOverText();
    }, 100); // Adjust the delay as needed
    this.stop();
  }

  run() {
    const loop = () => {
      if (!this.isGameOver) {
        this.update();
        this.draw();
        requestAnimationFrame(loop);
      }
    };

    loop();
  }

  stop() {
    this.isGameOver = true;
  }

  resetGame() {
    console.log("inreset");
    this.isGameOver = false;
    this.obstacles = [];
    this.score = 0;
    updateScore(this.score);

    const highScoreElement = document.getElementById("highScore");
    const currentHighScore = parseInt(localStorage.getItem("highScore")) || 0;
    highScoreElement.textContent = "High Score: " + currentHighScore;
  }
}

const game = new Game();

function updateScore(score) {
  const scoreboard = document.getElementById("scoreboard");
  const highScoreElement = document.getElementById("highScore");

  const currentHighScore = parseInt(localStorage.getItem("highScore")) || 0;
  const updatedHighScore = isNaN(currentHighScore) ? 0 : currentHighScore;
  const newHighScore = Math.max(score, updatedHighScore);

  highScoreElement.textContent = "High Score: " + newHighScore;

  localStorage.setItem("highScore", newHighScore.toString());

  scoreboard.textContent = "Score: " + score;

  // Display constant high score from the beginning
  if (score === 0) {
    highScoreElement.textContent = "High Score: " + currentHighScore;
  }
}

window.onload = function () {
  const board = document.getElementById("board");
  board.height = Height;
  board.width = Width;
  const startButton = document.querySelector(".start");
  let game = null;

  startButton.addEventListener("click", function () {
    if (game) {
      game.stop(); // Stop the current game if it's running
    }
    game = new Game(); // Create a new game instance
    game.start();
  });

  window.addEventListener("keydown", function (event) {
    if (game) {
      game.handleEvent(event);
    }
  });
};
