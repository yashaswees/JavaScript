let score=0;

class Ant {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
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
    antElement.addEventListener("click", () => this.killAnt(ant))// calls killAnt method
    this.container.appendChild(antElement);
    ant.element = antElement;
  }


  moveAnt(ant) {
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const antSize = 45;

    ant.x += ant.dx;
    ant.y += ant.dy;

    // Check for collision with container boundaries
    if (ant.x + 24 >= containerWidth) {
      ant.x = containerWidth - antSize; // Set ant at right boundary
      ant.dx *= -1; // Reverse direction
    } else if (ant.x < 0) {
      ant.x = 0; // Set position at left boundary(to make boundary condition efficient)
      ant.dx *= -1; // Reverse direction
    }

    if (ant.y + 40 >= containerHeight) {
      ant.y = containerHeight - antSize; // Set ant at bottom boundary
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
      console.log("collision detected");
      return true; 
    } 
    else 
    return false;
  }

  handleCollision(antA, antB) {
    // Reverse the direction of both ants
    const tempDx = antA.dx; // temporary var for swapping
    const tempDy = antA.dy;
    antA.dx = antB.dx;
    antA.dy = antB.dy;
    antB.dx = tempDx;
    antB.dy = tempDy;
    console.log("collision handled");
  }

  updateCollisions() {
    for (let i = 0; i < this.ants.length; i++) {
      const antA = this.ants[i];
      for (let j = i + 1; j < this.ants.length; j++) {
        const antB = this.ants[j];
        if (this.detectCollision(antA, antB)) {
          this.handleCollision(antA, antB);
          console.log("collision updated");
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
      const dx = this.randomValue(-2, 2);
      const dy = this.randomValue(-2, 2);
      const newAnt = new Ant(x, y, dx, dy);
      this.ants.push(newAnt);

      this.drawAnt(newAnt);
    }

    setInterval(() => {
      // Move ants with bouncing effect
      this.ants.forEach((ant) => this.moveAnt(ant));

      // Update collisions
      this.updateCollisions();
    }, 50);
  }
 
  killAnt(ant) {
    
    
    for (let i = 0; i < this.ants.length; i++) {
      const currentAnt = this.ants[i];
      if (currentAnt === ant) {
        this.ants.splice(i, 1); // Remove the ant from the array
        this.container.removeChild(ant.element); 
        score++;
        scoreBoard();
        console.log(score);
        // Remove the ant element from the container
        break;
      }
    }
  }
}

function scoreBoard(){
  const antsKilledElement = document.getElementById('killed');
  antsKilledElement.innerHTML = `Ants Killed: ${score}`;
  // console.log(antsKilledElement);
}

const antGame = new Game(10);
antGame.init();
