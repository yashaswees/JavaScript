const WIDTH = 300;
const HEIGHT = 600;
const FPS = 60;
const BLACK = "#000000";
const WHITE = "#ffffff";
const RED = "#ff0000";
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;
const LANE_WIDTH = Math.floor(WIDTH / 3);

// Class for My Car
class PlayerCar {
  constructor(x, y, imageSrc) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  moveLeft() {
    if (this.x > LANE_WIDTH / 2) {
      this.x -= LANE_WIDTH;
    }
  }
  moveRight() {
    if (this.x < WIDTH - LANE_WIDTH / 2 - CAR_WIDTH) {
      this.x += LANE_WIDTH;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x - CAR_WIDTH / 2,
      this.y,
      CAR_WIDTH,
      CAR_HEIGHT
    );
  }
}
// Class for other cars
const carImages = ["car1.png", "car2.png", "car3.png", "car4.png"];
class Car {
  constructor(lane) {
    this.x = lane * LANE_WIDTH + LANE_WIDTH / 2;
    this.y = 0;
    this.speedY = 3;
    this.image = new Image();
    this.image.src = carImages[Math.floor(Math.random() * carImages.length)];
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x - CAR_WIDTH / 2,
      this.y,
      CAR_WIDTH,
      CAR_HEIGHT
    );
  }
  update() {
    this.y += this.speedY;
  }
}
class Bullet {
  constructor(x, y, speed, imageSrc) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = new Image();
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  }
}

class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.myCarLane = 1;
    this.score = 0;
    this.cars = [];
    this.lastCarSpawnTime = 0;
    this.laneImage = new Image();
    this.laneImage.src = "lane.png";
    this.lanePositionY = 0;
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.startButton = document.querySelector(".start");
    this.startButton.addEventListener("click", this.start.bind(this));
    this.bullets = [];
    this.bulletImage = new Image();
    this.bulletImage.src = "bullet.png";
    this.ammo = 0;

    this.playerCar = new PlayerCar(
      this.myCarLane * LANE_WIDTH + LANE_WIDTH / 2,
      HEIGHT - CAR_HEIGHT,
      "myCar.png"
    );
    this.drawInitialFrame();
  }
  drawInitialFrame() {
    const backgroundImage = new Image();
    backgroundImage.src = "poster.png";

    backgroundImage.onload = () => {
      this.ctx.drawImage(backgroundImage, 0, 0, WIDTH, HEIGHT);
      this.playerCar.draw(this.ctx);
    };
  }
  fireBullet() {
    const shot = document.getElementById("shot");

    shot.play();
    const bullet = new Bullet(
      this.playerCar.x - this.bulletImage.width / 2,
      this.playerCar.y,
      5,
      this.bulletImage.src
    );
    this.bullets.push(bullet);
  }
  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.update();

      // Remove the bullet when it goes off-screen
      if (bullet.y < -this.bulletImage.height) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
  }

  drawBullets() {
    for (const bullet of this.bullets) {
      bullet.draw(this.ctx);
    }
  }

  start() {
    this.isGameOver = false; 
    this.score = 0; 
    this.cars = []; 

    // Reset the player's car position
    this.playerCar.x = this.myCarLane * LANE_WIDTH + LANE_WIDTH / 2;
    this.playerCar.y = HEIGHT - CAR_HEIGHT;

    this.lastCarSpawnTime = Date.now(); 

    // Start game loop
    this.run();
  }

  draw() {
    // Draw the lane pattern as an image
    this.ctx.drawImage(this.laneImage, 0, this.lanePositionY, WIDTH, HEIGHT);
    this.ctx.drawImage(
      this.laneImage,
      0,
      this.lanePositionY - HEIGHT,
      WIDTH,
      HEIGHT
    );
    if (this.bullet) {
      this.bullet.draw(this.ctx);
    }

    // Increment the lane position
    this.lanePositionY += 1; // Adjust the lane speed here

    // Reset the lane position when it goes off-screen
    if (this.lanePositionY >= HEIGHT) {
      this.lanePositionY = 0;
    }
    this.drawBullets();

    this.ctx.fillStyle = WHITE;
    this.ctx.textAlign = "start";
    this.ctx.font = "20px bolder";
    this.ctx.fillText("Score: " + this.score, WIDTH / 10, 25);
    this.ctx.fillText("Ammo: " + this.ammo, WIDTH / 2, 25);

    // Draw player car
    this.playerCar.draw(this.ctx);

    // Draw other cars
    for (const car of this.cars) {
      car.draw(this.ctx);
    }
    if (this.isGameOver) {
      this.drawGameOverText();
    }
  }
  // for gameover text
  drawGameOverText() {
    this.ctx.font = "48px bolder";
    this.ctx.fillStyle = WHITE;
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2);
  }

  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      this.playerCar.moveLeft();
    } else if (event.key === "ArrowRight") {
      this.playerCar.moveRight();
    }
    if (event.key === "ArrowUp" && this.ammo >= 1) {
      this.fireBullet();
      this.ammo--;
    }
  }

  spawnCar() {
    const car = new Car(Math.floor(Math.random() * 3));
    this.cars.push(car);
  }

  update() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.lastCarSpawnTime;
    const crash = document.getElementById("crash");

    if (elapsedTime > 2000 - this.score * 30) {
      this.spawnCar();
      this.lastCarSpawnTime = currentTime;
    }

    for (let i = 0; i < this.cars.length; i++) {
      const car = this.cars[i];
      car.update();

      // to remove car
      if (car.y > HEIGHT) {
        this.cars.splice(i, 1);
        i--;
        this.score++;
        if (this.score % 5 === 0) {
          this.ammo++;
          if (this.ammo > 5) {
            this.ammo = 5;
          }
          if (this.ammo < 0) {
            this.ammo = 0;
          }
        }
      }

      for (let j = 0; j < this.bullets.length; j++) {
        const bullet = this.bullets[j];

        if (
          bullet.x < car.x + CAR_WIDTH &&
          bullet.x + bullet.width > car.x &&
          bullet.y < car.y + CAR_HEIGHT &&
          bullet.y + bullet.height > car.y
        ) {
          // Bullet collided with car
          this.bullets.splice(j, 1);
          j--;
          this.cars.splice(i, 1);
          i--;
          this.score++;
          if (this.score % 5 === 0) {
            this.ammo++;
            if (this.ammo > 5) {
              this.ammo = 5;
            }
            if (this.ammo < 0) {
              this.ammo = 0;
            }
          }

          break;
        }
      }

      // collision condition
      if (
        this.playerCar.x < car.x + CAR_WIDTH && //checks if collision is taking between playercar adn
        this.playerCar.x + CAR_WIDTH > car.x &&
        this.playerCar.y < car.y + CAR_HEIGHT &&
        this.playerCar.y + CAR_HEIGHT > car.y
      ) {
        crash.play();
        this.gameOver();
        break;
      }
    }

    this.lanePositionY += 2; // Adjust the lane speed here
    this.updateBullets();
  }

  gameOver() {
    this.stop();
  }

  run() {
    this.lastCarSpawnTime = Date.now();
    const loop = () => {
      this.update();
      this.draw();

      if (!this.isGameOver) {
        requestAnimationFrame(loop);
      }
    };

    loop();
  }

  stop() {
    this.isGameOver = true;
  }
}

// Start the game
new Game();
