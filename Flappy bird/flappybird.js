const Width = 360;
const Height = 640;
const gravity = 0.09;
const birdHeight = 40;
const birdWidth = 50;
const obstacleWidth = 80;
const obstacleGap = 300; // Gap between upper obstacle and lower obstacle
const obstacleInterval = 2500; // Time between two obstacles = 3s

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
    this.bird = new Bird(30, Height/2, "./flappy-bird.png", this);
    this.obstacles = [];
    this.score=0;
  }
  start() {
    console.log("reached start");
    this.generateObstacles();
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
        upperImageSrc
      );
      this.obstacles.push(upperObstacle, lowerObstacle);
    }, obstacleInterval);
  }
  checkCollision() {
    const birdLeft = this.bird.x;
    const birdRight = this.bird.x + birdWidth;
    const birdTop = this.bird.y;
    const birdBottom = this.bird.y + birdHeight;
    let collisionDetected=false; //variable for increasing score when collision doesn't take place
  
    for (let i = 0; i < this.obstacles.length; i += 2) {
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
        collisionDetected=true;
        console.log('collision detected upper');
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
        collisionDetected=true;
        console.log('collision detected lower');
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

  update() {
    this.bird.velocityY += gravity; // Apply gravity to the velocity
    this.bird.y += this.bird.velocityY; // Update the bird's position using the velocity
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // Remove obstacles that are off the screen
      if (obstacle.x + obstacleWidth < 0) {
        this.obstacles.splice(i, 1);
        i--;
        this.score +=0.5;
        console.log(this.score);
      } 
    }
    if (this.bird.y > Height - 100 || this.bird.y < 0) {
      this.gameOver();
    }
    this.checkCollision();
  }

  handleEvent(event) {
    if (event.key === "ArrowUp") {
      this.bird.moveUp();
      this.draw();
    }
  }

  gameOver() {
    console.log("gameover");
    this.isGameOver = true;
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
}

const game = new Game();

window.onload = function () {
  const board = document.getElementById("board");
  board.height = Height;
  board.width = Width;
  game.draw();
  game.start();

  window.addEventListener("keydown", function (event) {
    game.handleEvent(event);
  });
};
