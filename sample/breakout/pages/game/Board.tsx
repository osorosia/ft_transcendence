import { useEffect, useRef, useState } from "react";
import data from '../data'


let { ballObj, paddleProps, brickObj, player } = data;

const Board: any = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateDirection = () => {
    // collision to wall
    if (ballObj.x < 0 || 480 < ballObj.x) ballObj.dx *= -1;
    if (ballObj.y < 0 || 640 < ballObj.y) ballObj.dy *= -1;
    // collision to paddle
    if (paddleProps.x <= ballObj.x && ballObj.x <= paddleProps.x + paddleProps.width
      && paddleProps.y <= ballObj.y && ballObj.y <= paddleProps.y + paddleProps.height) {
      ballObj.dy *= -1;
    }
    ballObj.x += ballObj.dx;
    ballObj.y += ballObj.dy;
  }

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(ballObj.x, ballObj.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    updateDirection();
  }

  const drawPaddle = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.rect(paddleProps.x, paddleProps.y, paddleProps.width, paddleProps.height);
    ctx.fillStyle = paddleProps.color;
    ctx.fill();
    ctx.closePath();
  }

  useEffect(() => {
    const render = () => {
      // console.log("called render");
      console.log(window.innerWidth)
      if (canvasRef.current) {
        // console.log("canvasRef.current");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 480, 640);
          drawBall(ctx);
          drawPaddle(ctx);
        }
      }
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        width="480"
        height="640"
        onMouseMove={(event) =>
          (paddleProps.x = event.clientX - 30)
        }
      />
    </div>
  );
}



export default Board;
