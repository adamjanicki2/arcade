import { Badge, Box } from "@adamjanicki/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import Canvas from "src/components/Canvas";
import StatusBadge from "src/components/StatusBadge";
import useSettings from "src/games/breakout/useSettings";
import { useKeydown, useTheme } from "src/hooks";
import type { Status } from "src/types";
import { bound } from "src/util";

const BRICK_COLORS = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"];
const PADDLE_Y_OFFSET = 30;
const PADDLE_HEIGHT = 10;

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function initBricks(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(true));
}

export default function Controller() {
  const { settings } = useSettings();
  const ballSpeed = bound(settings.ballSpeed, 1, 10);
  const brickRows = bound(settings.brickRows, 2, 8);
  const brickCols = bound(settings.brickCols, 5, 15);
  const paddleWidthPct = bound(settings.paddleWidth, 10, 50) / 100;

  const theme = useTheme();
  const isDark = theme === "dark";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState<Status>("awaiting");
  const statusRef = useRef<Status>("awaiting");

  const ballRef = useRef<Ball>({ x: 0, y: 0, vx: 0, vy: 0 });
  const paddleXRef = useRef(0);
  const bricksRef = useRef<boolean[][]>(initBricks(brickRows, brickCols));
  const remainingBricksRef = useRef(brickRows * brickCols);
  const heldKeys = useRef<Set<string>>(new Set());
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const setStatusSynced = useCallback((s: Status) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const getCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return { width: 0, height: 0 };
    return { width: canvas.width, height: canvas.height };
  }, []);

  const getBallRadius = useCallback(() => {
    const { width } = getCanvasSize();
    return Math.max(5, Math.round(width * 0.015));
  }, [getCanvasSize]);

  const getPaddleWidth = useCallback(() => {
    const { width } = getCanvasSize();
    return Math.round(width * paddleWidthPct);
  }, [getCanvasSize, paddleWidthPct]);

  const getPaddleY = useCallback(() => {
    const { height } = getCanvasSize();
    return height - PADDLE_Y_OFFSET;
  }, [getCanvasSize]);

  const getBrickDimensions = useCallback(() => {
    const { width, height } = getCanvasSize();
    const brickAreaHeight = height * 0.4;
    const padding = Math.round(width * 0.015);
    const brickW = (width - padding * (brickCols + 1)) / brickCols;
    const brickH = (brickAreaHeight - padding * (brickRows + 1)) / brickRows;
    return { brickW, brickH, padding };
  }, [getCanvasSize, brickCols, brickRows]);

  const getBrickRect = useCallback(
    (row: number, col: number) => {
      const { brickW, brickH, padding } = getBrickDimensions();
      const x = padding + col * (brickW + padding);
      const y = padding + row * (brickH + padding);
      return { x, y, w: brickW, h: brickH };
    },
    [getBrickDimensions],
  );

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width } = canvas;
    const paddleW = Math.round(width * paddleWidthPct);
    paddleXRef.current = (width - paddleW) / 2;
    const ballRadius = getBallRadius();
    const paddleY = getPaddleY();
    ballRef.current = {
      x: width / 2,
      y: paddleY - ballRadius - 1,
      vx: 0,
      vy: 0,
    };
    bricksRef.current = initBricks(brickRows, brickCols);
    remainingBricksRef.current = brickRows * brickCols;
    heldKeys.current.clear();
    setStatusSynced("awaiting");
  }, [getBallRadius, getPaddleY, paddleWidthPct, brickRows, brickCols, setStatusSynced]);

  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    // Draw bricks
    const bricks = bricksRef.current;
    for (let r = 0; r < bricks.length; r++) {
      for (let c = 0; c < bricks[r].length; c++) {
        if (!bricks[r][c]) continue;
        const { x, y, w, h } = getBrickRect(r, c);
        ctx.fillStyle = BRICK_COLORS[r % BRICK_COLORS.length];
        ctx.fillRect(x, y, w, h);
      }
    }

    // Draw paddle
    const paddleW = getPaddleWidth();
    const paddleY = getPaddleY();
    ctx.fillStyle = isDark ? "white" : "black";
    ctx.fillRect(paddleXRef.current, paddleY, paddleW, PADDLE_HEIGHT);

    // Draw ball
    const ball = ballRef.current;
    const ballRadius = getBallRadius();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "white" : "black";
    ctx.fill();
  }, [isDark, getBrickRect, getPaddleWidth, getPaddleY, getBallRadius]);

  // Run game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      const currentStatus = statusRef.current;
      if (currentStatus !== "ongoing") return;

      const dt = Math.min(timestamp - lastTimeRef.current, 50); // cap dt
      lastTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const { width, height } = canvas;
      const paddleW = getPaddleWidth();
      const paddleY = getPaddleY();
      const ballRadius = getBallRadius();

      // Move paddle
      const paddleSpeed = 500; // px/s
      if (heldKeys.current.has("ArrowLeft")) {
        paddleXRef.current = Math.max(0, paddleXRef.current - (paddleSpeed * dt) / 1000);
      }
      if (heldKeys.current.has("ArrowRight")) {
        paddleXRef.current = Math.min(width - paddleW, paddleXRef.current + (paddleSpeed * dt) / 1000);
      }

      // Move ball
      const ball = ballRef.current;
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Wall collisions (left/right)
      if (ball.x - ballRadius < 0) {
        ball.x = ballRadius;
        ball.vx = Math.abs(ball.vx);
      } else if (ball.x + ballRadius > width) {
        ball.x = width - ballRadius;
        ball.vx = -Math.abs(ball.vx);
      }

      // Top wall
      if (ball.y - ballRadius < 0) {
        ball.y = ballRadius;
        ball.vy = Math.abs(ball.vy);
      }

      // Paddle collision
      if (
        ball.vy > 0 &&
        ball.y + ballRadius >= paddleY &&
        ball.y + ballRadius <= paddleY + PADDLE_HEIGHT + 5 &&
        ball.x >= paddleXRef.current &&
        ball.x <= paddleXRef.current + paddleW
      ) {
        ball.y = paddleY - ballRadius;
        const hitOffset = (ball.x - (paddleXRef.current + paddleW / 2)) / (paddleW / 2);
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        const angle = hitOffset * (Math.PI / 3); // max 60 degrees
        ball.vx = speed * Math.sin(angle);
        ball.vy = -speed * Math.cos(angle);
      }

      // Brick collisions
      const bricks = bricksRef.current;
      outer: for (let r = 0; r < bricks.length; r++) {
        for (let c = 0; c < bricks[r].length; c++) {
          if (!bricks[r][c]) continue;
          const { x, y, w, h } = getBrickRect(r, c);
          // AABB check
          if (
            ball.x + ballRadius > x &&
            ball.x - ballRadius < x + w &&
            ball.y + ballRadius > y &&
            ball.y - ballRadius < y + h
          ) {
            bricks[r][c] = false;
            remainingBricksRef.current -= 1;

            // Determine which side was hit
            const overlapLeft = ball.x + ballRadius - x;
            const overlapRight = x + w - (ball.x - ballRadius);
            const overlapTop = ball.y + ballRadius - y;
            const overlapBottom = y + h - (ball.y - ballRadius);
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            if (minOverlap === overlapTop || minOverlap === overlapBottom) {
              ball.vy = -ball.vy;
            } else {
              ball.vx = -ball.vx;
            }

            if (remainingBricksRef.current === 0) {
              setStatusSynced("success");
              paintCanvas();
              return;
            }
            break outer;
          }
        }
      }

      // Bottom boundary
      if (ball.y - ballRadius > height) {
        setStatusSynced("gameover");
        paintCanvas();
        return;
      }

      paintCanvas();
      animationFrameId.current = requestAnimationFrame(gameLoop);
    },
    [getPaddleWidth, getPaddleY, getBallRadius, getBrickRect, paintCanvas, setStatusSynced],
  );

  const startLoop = useCallback(() => {
    lastTimeRef.current = performance.now();
    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  const stopLoop = useCallback(() => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "ArrowLeft" || key === "ArrowRight") {
        event.preventDefault();
        heldKeys.current.add(key);
      } else if (key === " ") {
        event.preventDefault();
        if (statusRef.current === "awaiting") {
          // Launch ball
          const canvas = canvasRef.current;
          if (!canvas) return;
          const baseSpeed = (ballSpeed / 10) * 0.5; // px/ms
          const angle = (Math.random() - 0.5) * (Math.PI / 4);
          ballRef.current.vx = baseSpeed * Math.sin(angle);
          ballRef.current.vy = -baseSpeed;
          setStatusSynced("ongoing");
          startLoop();
        }
      } else if (key === "p") {
        const cur = statusRef.current;
        if (cur === "ongoing") {
          stopLoop();
          setStatusSynced("paused");
        } else if (cur === "paused") {
          setStatusSynced("ongoing");
          startLoop();
        }
      } else if (key === "r") {
        stopLoop();
        resetGame();
        setTimeout(() => paintCanvas(), 0);
      }
    },
    [ballSpeed, startLoop, stopLoop, resetGame, paintCanvas, setStatusSynced],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    heldKeys.current.delete(event.key);
  }, []);

  useKeydown(handleKeyDown);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  // Initialize on mount and when settings change
  useEffect(() => {
    stopLoop();
    resetGame();
    setTimeout(() => paintCanvas(), 0);
    return () => stopLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brickRows, brickCols, paddleWidthPct, ballSpeed]);

  // Repaint when theme changes
  useEffect(() => {
    paintCanvas();
  }, [paintCanvas]);

  return (
    <Box vfx={{ axis: "y", gap: "s", width: "min" }}>
      <Box vfx={{ axis: "x", justify: "between" }}>
        <StatusBadge status={status} />
        <Badge type="static">BRICKS: {status === "success" ? 0 : remainingBricksRef.current}</Badge>
      </Box>
      <Canvas
        canvasRef={canvasRef}
        style={{
          width: "min(55vw, 55vh)",
          height: "min(55vw, 55vh)",
          borderColor: "currentColor",
        }}
        vfx={{ border: true, borderStyle: "solid" }}
        multiplicity={1}
      />
    </Box>
  );
}
