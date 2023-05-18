class Ball {
    constructor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
    }
  }
  
  class Game {
    constructor(num) {
      this.balls = [];
      this.container = null;
      this.canvasWidth = 400;
      this.canvasHeight = 400;
      this.num = num;
    }
  
    randomValue(minWidth, maxWidth) {
      return Math.random() * (maxWidth - minWidth) + minWidth;
    }
  
    drawBall(ball) {
      const ballElement = document.createElement("div");
      ballElement.classList.add("ball");
      ballElement.style.left = ball.x + "px";
      ballElement.style.top = ball.y + "px";
      this.container.appendChild(ballElement);
      ball.element = ballElement;
    }
  
    removeBall(ball) {
      this.container.removeChild(ball.element);
    }
  
    moveBall(ball) {
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const ballSize = 23;
      
        ball.x += ball.dx;
        ball.y += ball.dy;
      
        // Check for collision with container boundaries
        if (ball.x + ballSize >= containerWidth) {
          ball.x = containerWidth - ballSize; // Set ball at right boundary
          ball.dx *= -1; // Reverse direction
        } else if (ball.x < 0) {
          ball.x = 0; // Set position at left boundary(to make boundary condition efficient)
          ball.dx *= -1; // Reverse direction
        }
      
        if (ball.y + ballSize >= containerHeight) {
          ball.y = containerHeight - ballSize; // Set ball at bottom boundary
          ball.dy *= -1; // Reverse direction
        } else if (ball.y < 0) {
          ball.y = 0; // Set position at top boundary(to make boundary condition efficient)
          ball.dy *= -1; // Reverse direction
        }
      
        // Update ball position
        ball.element.style.left = ball.x + "px";
        ball.element.style.top = ball.y + "px";
      }
      
  
    detectCollision(ballA, ballB) {
      const dx = ballA.x - ballB.x;
      const dy = ballA.y - ballB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      console.log("collision detected"); 
      return distance < 20; // Adjust the value to set the collision threshold
      
    }
  
    handleCollision(ballA, ballB) {
      // Reverse the direction of both balls
      const tempDx = ballA.dx;//temporary var for swapping
      const tempDy = ballA.dy;
      ballA.dx = ballB.dx;
      ballA.dy = ballB.dy;
      ballB.dx = tempDx;
      ballB.dy = tempDy;
      console.log('collision handled')
    }
  
    updateCollisions() {
      for (let i = 0; i < this.balls.length; i++) {
        const ballA = this.balls[i];
        for (let j = i + 1; j < this.balls.length; j++) {
          const ballB = this.balls[j];
          if (this.detectCollision(ballA, ballB)) {
            this.handleCollision(ballA, ballB);
          }
        }
      }
      console.log("collision updated");
    }
  
    init() {
      this.container = document.querySelector(".container");
      // Generate and add balls

      for (let i = 0; i < this.num; i++) {
        const x = this.randomValue(10, 390);
        const y = this.randomValue(10, 390);
        console.log(x,y);
        const dx = this.randomValue(-2, 2);
        const dy = this.randomValue(-2, 2);
  
        this.balls.push(new Ball(x, y, dx, dy));
      }
  
      // Draw first state of balls
      this.balls.forEach((ball) => this.drawBall(ball));
  
      setInterval(() => {
        // Move balls with bouncing effect
        this.balls.forEach((ball) => this.moveBall(ball));
  
        // Update collisions
        this.updateCollisions();
      }, 5);
    }
  }
  
  const num = 10;
  const ballGame = new Game(num);
  ballGame.init();
  