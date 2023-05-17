class Ball { // this constructor represents one ball
    constructor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
    }
  }
  
  class Game {// this constructor represents the game
    constructor(num) {
      this.balls = [];
      this.container = null;
      this.canvasWidth = 400; 
      this.canvasHeight = 400; 
      this.num=num;
    }
  
    getRandomValue(minWidth, maxWidth) {
      return Math.random() * (maxWidth - minWidth) + minWidth;
    }
        //method1 to draw each ball and erase previous one
    drawBall(ball) {
      const ballElement = document.createElement("div");
      ballElement.classList.add("ball");
      ballElement.style.left = ball.x + "px";
      ballElement.style.top = ball.y + "px";
      this.container.appendChild(ballElement);
    }
        // method2 to make the balls moving
    moveBall(ball) { 
      this.container.removeChild(document.querySelector(".ball"));
      ball.x += ball.dx;
      ball.y += ball.dy;
      this.drawBall(ball);
      if (ball.x + 20 >= this.canvasWidth || ball.x < 0) {
        ball.dx *= -1;
      }
      if (ball.y + 20 >= this.canvasHeight || ball.y < 0) {
        ball.dy *= -1;
      }
    }
        //method3 for game 
    startGame() { 
      this.container = document.querySelector(".container");
      for (let i = 0; i < this.num; i++) {
        const x = this.getRandomValue(0, (this.canvasWidth-20)); //for random generation of starting coordinates
        const y = this.getRandomValue(0, (this.canvasHeight-20));//-20 because i dont want any ball stuck at border
        const dx = this.getRandomValue(0, 4);// for different inclinations
        const dy = this.getRandomValue(0, 4);
        this.balls.push(new Ball(x, y, dx, dy));
      }
      //drawing and moving each ball until number of balls =num
      this.balls.forEach((ball) => this.drawBall(ball));
      setInterval(() => {this.balls.forEach((ball) => this.moveBall(ball));}, 10); 
    }
  }
  const num=10;
  const ballGame = new Game(num);
  ballGame.startGame();
  