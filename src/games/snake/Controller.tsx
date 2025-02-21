import { Badge } from "@adamjanicki/ui";
import { useEffect, useRef, useState, useCallback } from "react";
import Canvas from "src/components/Canvas";
import Snake from "src/games/snake/snake";
import useSettings from "src/games/snake/useSettings";
import { useTheme } from "src/hooks";
import { bound, fpsToMS } from "src/util";
import StatusBadge, { type Status } from "src/components/StatusBadge";

const DIR_MAP = new Map([
  ["ArrowLeft", { x: -1, y: 0 }],
  ["ArrowUp", { x: 0, y: -1 }],
  ["ArrowRight", { x: 1, y: 0 }],
  ["ArrowDown", { x: 0, y: 1 }],
]);

const opposite = (dir1: string, dir2: string) =>
  (dir1 === "ArrowLeft" && dir2 === "ArrowRight") ||
  (dir1 === "ArrowRight" && dir2 === "ArrowLeft") ||
  (dir1 === "ArrowUp" && dir2 === "ArrowDown") ||
  (dir1 === "ArrowDown" && dir2 === "ArrowUp");

export default function Controller() {
  const { settings } = useSettings();
  let { checkWalls, fps, gridSize } = settings;
  fps = bound(fps, 1, 60);
  gridSize = bound(gridSize, 5, 100);

  const interval = fpsToMS(fps);
  const theme = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake = useRef<Snake>(new Snake(gridSize));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0); // To track the last update time
  const [moveLocked, setMoveLocked] = useState(false); // Lock direction change until move completes

  const [isRunning, setIsRunning] = useState(false);
  const [direction, setDirection] = useState<string | null>(null);

  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { gridSize } = snake.current;
    const cellSize = Math.floor(canvas.width / gridSize);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    const apple = snake.current.getApple();
    ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);

    ctx.fillStyle = isDark ? "white" : "black";
    snake.current.toArray().forEach(({ x, y }) => {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    });
  }, [isDark]);

  const resetGameState = useCallback(() => {
    snake.current = new Snake(gridSize);
    setDirection(null);
    setGameOver(false);
    setIsRunning(false);
    setMoveLocked(false);
    setScore(0);
    paintCanvas();
  }, [paintCanvas, gridSize]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (DIR_MAP.has(key) && !gameOver) {
        event.preventDefault();
        if (moveLocked) {
          return;
        }
        setIsRunning(true);
        setDirection((prev) => {
          if (prev && opposite(prev, key)) {
            return prev; // Prevent direction reversal
          }
          setMoveLocked(true); // Lock direction change until next move
          return key;
        });
      } else if (key === "p" && !gameOver) {
        setIsRunning((prev) => !prev);
      } else if (key === "r") {
        resetGameState();
      }
    },
    [moveLocked, gameOver, resetGameState]
  );

  const step = useCallback(
    (timestamp: number) => {
      if (!isRunning) {
        return;
      }

      // Only update the game if enough time has passed since the last update
      const timeSinceLastUpdate = timestamp - lastUpdateTimeRef.current;
      if (timeSinceLastUpdate >= interval && direction) {
        const delta = DIR_MAP.get(direction);
        if (delta) {
          const collision = snake.current.move(delta, checkWalls);
          setScore(snake.current.score);
          paintCanvas();
          if (collision) {
            setGameOver(true);
            setIsRunning(false);
            return;
          }
          setMoveLocked(false); // Unlock movement after completing a move
        }
        lastUpdateTimeRef.current = timestamp; // Update the last update time
      }

      // Continue the game loop
      animationFrameId.current = requestAnimationFrame(step);
    },
    [direction, isRunning, paintCanvas, checkWalls, interval]
  );

  useEffect(() => {
    resetGameState();
  }, [gridSize, resetGameState]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (isRunning) {
      lastUpdateTimeRef.current = performance.now(); // Initialize the timestamp
      animationFrameId.current = requestAnimationFrame(step);
    } else {
      // Initial paint
      paintCanvas();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning, direction, handleKeyDown, step, paintCanvas]);

  let status: Status;
  if (gameOver) {
    status = "gameover";
  } else if (isRunning && direction) {
    status = "ongoing";
  } else if (!direction) {
    status = "awaiting";
  } else {
    status = "paused";
  }

  return (
    <>
      <div
        style={{
          width: "min-content",
        }}
      >
        <div className="flex justify-between">
          <StatusBadge status={status} />
          <Badge type="static">SCORE: {score}</Badge>
        </div>
        <Canvas
          canvasRef={canvasRef}
          className="ba bw1 mv2"
          style={{
            width: "min(55vw, 55vh)",
            height: "min(55vw, 55vh)",
            borderStyle: checkWalls ? "solid" : "dashed",
          }}
          multiplicity={snake.current.gridSize}
        />
      </div>
    </>
  );
}
