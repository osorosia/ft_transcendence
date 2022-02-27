import { useEffect, useRef, useState } from "react";
import data from '../data';
import Button from '@material-ui/core/Button';

let { ballObj, paddleProps, brickObj, player } = data;
let finishFlag = false;

const Board: any = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  const updateDirection = () => {
    // collision to wall
    if (ballObj.x < 0 || 480 < ballObj.x) ballObj.dx *= -1;
    if (ballObj.y < 0) ballObj.dy *= -1;
    if (640 < ballObj.y) {
      setIsFinished(true);
      finishFlag = true;
      console.log(ballObj.y)
    }
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
  }

  const drawPaddle = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.rect(paddleProps.x, paddleProps.y, paddleProps.width, paddleProps.height);
    ctx.fillStyle = paddleProps.color;
    ctx.fill();
    ctx.closePath();
  }

  useEffect(() => {
    ballObj.x = 0;
    ballObj.y = 0;
    console.log("__________________");
    finishFlag = false;

    const render = () => {
      // console.log("called render");
      // console.log(window.innerWidth)
      if (canvasRef.current) {
        // console.log("canvasRef.current");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 480, 640);
          drawBall(ctx);
          drawPaddle(ctx);
          updateDirection();
        }
      }

      if (!finishFlag)
        requestAnimationFrame(render);
      // else
      //   setIsFinished(true);
    };
    if (!isFinished)
      render();
  }, [isFinished]);

  return (
    <div>
      {isFinished ? <Button onClick={() => { setIsFinished(false); finishFlag = false; }}>Retry</Button> : null}
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
