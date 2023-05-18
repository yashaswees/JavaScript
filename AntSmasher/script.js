class Ant {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
  rotate() {
    const angle = Math.atan2(this.dy, this.dx);
    const degrees = (angle * 180) / Math.PI;
    this.rotation = degrees;
  }
}

class Game {
  constructor(num) {
    this.ants = [];
    this.container = null;
    this.canvasWidth = 400;
    this.canvasHeight = 400;
    this.num = num;
  }

  randomValue(minWidth, maxWidth) {
    //Math.random generates random number between 0 and 1
    return Math.random() * (maxWidth - minWidth) + minWidth;
  }

  drawAnt(ant) {
    const antElement = document.createElement("div");
    antElement.classList.add("ant");
    antElement.style.left = ant.x + "px";
    antElement.style.top = ant.y + "px";
    antElement.addEventListener("click", () => this.killAnt(ant)); // calls killAnt method
    this.container.appendChild(antElement);
    ant.element = antElement;
  }

  moveAnt(ant) {
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const ANTSIZE = 45;

    ant.x += ant.dx;
    ant.y += ant.dy;

    // Check for collision with container boundaries
    if (ant.x + 24 >= containerWidth) {
      ant.x = containerWidth - ANTSIZE; // Set ant at right boundary
      ant.dx *= -1; // Reverse direction
    } else if (ant.x < 0) {
      ant.x = 0; // Set position at left boundary(to make boundary condition efficient)
      ant.dx *= -1; // Reverse direction
    }

    if (ant.y + 40 >= containerHeight) {
      ant.y = containerHeight - ANTSIZE; // Set ant at bottom boundary
      ant.dy *= -1; // Reverse direction
    } else if (ant.y < 0) {
      ant.y = 0; // Set position at top boundary(to make boundary condition efficient)
      ant.dy *= -1; // Reverse direction
    }

    // Update ant position
    ant.element.style.left = ant.x + "px";
    ant.element.style.top = ant.y + "px";
  }

  detectCollision(antA, antB) {
    const dx = antA.x - antB.x;
    const dy = antA.y - antB.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 30) {
      return true;
    } else {
      return false;
    }
  }

  handleCollision(antA, antB) {
    const angleA = antA.rotate();
    const angleB = antB.rotate();

    // Reverse the direction of both ants
    const tempDx = antA.dx; // temporary var for swapping
    const tempDy = antA.dy;
    antA.dx = antB.dx;
    antA.dy = antB.dy;
    antB.dx = tempDx;
    antB.dy = tempDy;

    //change degree of rotation of ant
    antA.element.style.transform = `rotate(${antA.rotation}deg)`;
    antB.element.style.transform = `rotate(${antB.rotation}deg)`;
    return { angleA, angleB };
  }

  updateCollisions() {
    for (let i = 0; i < this.ants.length; i++) {
      const antA = this.ants[i];
      for (let j = i + 1; j < this.ants.length; j++) {
        const antB = this.ants[j];
        if (this.detectCollision(antA, antB)) {
          this.handleCollision(antA, antB);
        }
      }
    }
  }

  init() {
    this.container = document.querySelector(".container");
    // Generate and add ants
    for (let i = 0; i < this.num; i++) {
      const x = this.randomValue(0, 390);
      const y = this.randomValue(0, 390);
      const dx = this.randomValue(-1, 3);
      const dy = this.randomValue(-1, 3);
      const newAnt = new Ant(x, y, dx, dy);
      this.ants.push(newAnt);

      this.drawAnt(newAnt);
    }

    //moving and updating collision
    setInterval(() => {
      // bouncing ants
      this.ants.forEach((ant) => this.moveAnt(ant));

      // Update collisions
      this.updateCollisions();
    }, 9);
  }

  killAnt(ant) {
    for (let i = 0; i < this.ants.length; i++) {
      const currentAnt = this.ants[i];
      if (currentAnt === ant) {
        const killSound = document.getElementById("killSound"); // play squish sound when killed
        killSound.play();
        this.ants.splice(i, 1); // Remove the ant
        const bloodyElement = document.createElement("div");
        bloodyElement.classList.add("bloody");

        bloodyElement.style.left = ant.x + "px"; // so that blood is seen at the position where the ant is killed
        bloodyElement.style.top = ant.y + "px";

        // Append the bloody element to the container
        this.container.appendChild(bloodyElement);
        this.container.removeChild(ant.element);
        setTimeout(() => {
          this.container.removeChild(bloodyElement);
        }, 2000);
        score++;
        scoreBoard();
        break;
      }
    }
  }
}

let score = 0;

function scoreBoard() {
  const antsKilledElement = document.getElementById("killed");
  const gameOverElement = document.getElementById("gameOver");

  antsKilledElement.style.marginLeft = "50%";
  gameOverElement.style.marginLeft = "50%";
  antsKilledElement.textContent = `Ants Killed: ${score}`;

  if (score == 10) {
    gameOverElement.innerHTML = "Ant Over";
  } else {
    gameOverElement.innerHTML = "";
  }
}

const antGame = new Game(10);
antGame.init();
