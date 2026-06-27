"use client";

import { useEffect, useRef } from "react";

type RobotCoreProps = {
  accent: string;
};

type Direction = "center" | "lower-left" | "left" | "upper-left" | "up" | "upper-right" | "right" | "lower-right";

const DIRECTION_PATH = "/images/robot-directions/";
const POINTER_SMOOTHING = 0.42;
const CENTER_DEAD_ZONE = 0.16;
const TRANSITION_MS = 180;
const DIRECTIONS: Direction[] = ["center", "lower-left", "left", "upper-left", "up", "upper-right", "right", "lower-right"];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDirectionSrc(direction: Direction) {
  return `${DIRECTION_PATH}${direction}.jpeg`;
}

function getNearestDirection(x: number, y: number): Direction {
  const distanceFromCenter = Math.hypot(x, y);
  if (distanceFromCenter < CENTER_DEAD_ZONE) return "center";

  if (y < -0.28) {
    if (x < -0.22) return "upper-left";
    if (x > 0.22) return "upper-right";
    return "up";
  }

  if (y > 0.42) {
    if (x < -0.24) return "lower-left";
    if (x > 0.24) return "lower-right";
  }

  if (x < -0.2) return "left";
  if (x > 0.2) return "right";

  return "center";
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function drawContain(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const isNarrow = width < 768;
  const maxHeight = height * (isNarrow ? 1.04 : 0.7);
  const maxWidth = width * (isNarrow ? 1.9 : 0.42);
  const drawHeight = Math.min(maxHeight, maxWidth / imageRatio);
  const drawWidth = drawHeight * imageRatio;
  const drawX = (width - drawWidth) / 2;
  const drawY = isNarrow ? height - drawHeight : height - drawHeight * 0.92;

  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
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
    fromDirection: "center" as Direction,
    toDirection: "center" as Direction,
    renderedDirection: "center" as Direction,
    transitionStartedAt: 0,
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

    for (const direction of DIRECTIONS) {
      const image = new Image();
      image.decoding = "async";
      image.src = getDirectionSrc(direction);
      image.onload = () => {
        if (direction === "center" || direction === state.toDirection) drawStaticDirection(getCurrentDirection());
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
        drawStaticDirection(getCurrentDirection());
      }
    }

    function drawFrame(direction: Direction, alpha: number) {
      const image = directionImagesRef.current[direction];
      if (!image?.complete || image.naturalWidth <= 0) return;

      canvasContext.globalAlpha = alpha * 0.96;
      drawContain(canvasContext, image, canvasElement.width, canvasElement.height);
      canvasContext.globalAlpha = 1;
    }

    function drawStaticDirection(direction: Direction) {
      const image = directionImagesRef.current[direction];
      if (!image?.complete || image.naturalWidth <= 0) return;

      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
      drawFrame(direction, 1);
      state.fromDirection = direction;
      state.toDirection = direction;
      state.renderedDirection = direction;
      state.transitionStartedAt = performance.now();
    }

    function drawTransition(now: number) {
      const elapsed = now - state.transitionStartedAt;
      const progress = clamp(elapsed / TRANSITION_MS, 0, 1);
      const eased = easeOutCubic(progress);

      canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
      drawFrame(state.fromDirection, 1);
      drawFrame(state.toDirection, eased);

      if (progress >= 1) {
        state.fromDirection = state.toDirection;
        state.renderedDirection = state.toDirection;
      }
    }

    function startTransition(direction: Direction) {
      if (direction === state.toDirection) return;
      state.fromDirection = state.toDirection;
      state.toDirection = direction;
      state.transitionStartedAt = performance.now();
    }

    function getCurrentDirection() {
      if (state.reducedMotion) return "center";
      return getNearestDirection(state.smoothX, state.smoothY);
    }

    function syncDirection() {
      const now = performance.now();

      if (state.reducedMotion) {
        if (state.renderedDirection !== "center") drawStaticDirection("center");
        return;
      }

      state.smoothX += (state.targetX - state.smoothX) * POINTER_SMOOTHING;
      state.smoothY += (state.targetY - state.smoothY) * POINTER_SMOOTHING;

      const direction = getCurrentDirection();
      startTransition(direction);
      drawTransition(now);
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
        drawStaticDirection("center");
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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" aria-hidden="true" />
    </div>
  );
}
