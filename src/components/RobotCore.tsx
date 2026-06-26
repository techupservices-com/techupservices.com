"use client";

import { useEffect, useRef } from "react";

type RobotCoreProps = {
  accent: string;
};

type Direction = "center" | "lower-left" | "left" | "upper-left" | "up" | "upper-right" | "right" | "lower-right";

const DIRECTION_PATH = "/images/robot-directions/";
const POINTER_SMOOTHING = 0.34;
const CENTER_DEAD_ZONE = 0.22;
const DIRECTIONS: Array<{ name: Direction; x: number; y: number }> = [
  { name: "lower-left", x: -1, y: 1 },
  { name: "left", x: -1, y: 0 },
  { name: "upper-left", x: -1, y: -1 },
  { name: "up", x: 0, y: -1 },
  { name: "upper-right", x: 1, y: -1 },
  { name: "right", x: 1, y: 0 },
  { name: "lower-right", x: 1, y: 1 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDirectionSrc(direction: Direction) {
  return `${DIRECTION_PATH}${direction}.jpg`;
}

function getNearestDirection(x: number, y: number): Direction {
  const distanceFromCenter = Math.hypot(x, y);
  if (distanceFromCenter < CENTER_DEAD_ZONE) return "center";

  let nearest = DIRECTIONS[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const direction of DIRECTIONS) {
    const distance = Math.hypot(x - direction.x, y - direction.y);
    if (distance < nearestDistance) {
      nearest = direction;
      nearestDistance = distance;
    }
  }

  return nearest.name;
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  const sourceWidth = imageRatio > canvasRatio ? image.naturalHeight * canvasRatio : image.naturalWidth;
  const sourceHeight = imageRatio > canvasRatio ? image.naturalHeight : image.naturalWidth / canvasRatio;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
}

export default function RobotCore({ accent }: RobotCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const directionImagesRef = useRef<Record<Direction, HTMLImageElement | undefined>>({
    center: undefined,
    "lower-left": undefined,
    left: undefined,
    "upper-left": undefined,
    up: undefined,
    "upper-right": undefined,
    right: undefined,
    "lower-right": undefined,
  });
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    smoothX: 0,
    smoothY: 0,
    renderedDirection: null as Direction | null,
    canvasWidth: 0,
    canvasHeight: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const state = stateRef.current;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reducedMotion = mediaQuery.matches;
    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;
    const canvasContext = ctx;

    const directions: Direction[] = ["center", "lower-left", "left", "upper-left", "up", "upper-right", "right", "lower-right"];
    for (const direction of directions) {
      const image = new Image();
      image.decoding = "async";
      image.src = getDirectionSrc(direction);
      image.onload = () => {
        if (direction === "center" || direction === state.renderedDirection) drawDirection(getCurrentDirection());
      };
      directionImagesRef.current[direction] = image;
    }

    function resizeCanvas() {
      const bounds = canvasElement.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      const nextWidth = Math.max(1, Math.round(bounds.width * pixelRatio));
      const nextHeight = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvasElement.width !== nextWidth || canvasElement.height !== nextHeight) {
        canvasElement.width = nextWidth;
        canvasElement.height = nextHeight;
        state.canvasWidth = nextWidth;
        state.canvasHeight = nextHeight;
        state.renderedDirection = null;
        drawDirection(getCurrentDirection());
      }
    }

    function drawDirection(direction: Direction) {
      const image = directionImagesRef.current[direction];
      if (!image?.complete || image.naturalWidth <= 0) return;

      drawCover(canvasContext, image, canvasElement.width, canvasElement.height);
      state.renderedDirection = direction;
    }

    function getCurrentDirection() {
      if (state.reducedMotion) return "center";
      return getNearestDirection(state.smoothX, state.smoothY);
    }

    function syncDirection() {
      if (state.reducedMotion) {
        if (state.renderedDirection !== "center") drawDirection("center");
        return;
      }

      state.smoothX += (state.targetX - state.smoothX) * POINTER_SMOOTHING;
      state.smoothY += (state.targetY - state.smoothY) * POINTER_SMOOTHING;

      const direction = getCurrentDirection();
      if (direction !== state.renderedDirection) drawDirection(direction);
    }

    function tick() {
      syncDirection();
      animationFrameRef.current = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      if (state.reducedMotion || event.pointerType === "touch") return;
      state.targetX = clamp(event.clientX / window.innerWidth, 0, 1) * 2 - 1;
      state.targetY = clamp(event.clientY / window.innerHeight, 0, 1) * 2 - 1;
    }

    function onMotionChange(event: MediaQueryListEvent) {
      state.reducedMotion = event.matches;
      if (event.matches) {
        state.targetX = 0;
        state.targetY = 0;
        state.smoothX = 0;
        state.smoothY = 0;
        drawDirection("center");
      }
    }

    resizeCanvas();
    mediaQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      mediaQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full" style={{ ["--accent" as string]: accent }}>
      <div className="absolute inset-[14%] rounded-pill bg-[color:var(--accent)] opacity-20 blur-[46px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" aria-hidden="true" />
    </div>
  );
}
