"use client";

import { useEffect, useRef } from "react";

type RobotCoreProps = {
  accent: string;
};

const FRAME_COUNT = 68;
const FRAME_PATH = "/images/robot-frames/frame-";
const SCRUB_SETTINGS = {
  scrubSmoothing: 0.82,
  fastScrubSmoothing: 0.98,
  fastScrubDistance: 0.07,
  minSeekDelta: 0.0015,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getFrameSrc(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(3, "0")}.jpg`;
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
  const frameRef = useRef<number | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({
    targetFrame: 0,
    smoothFrame: 0,
    renderedFrame: -1,
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

    const frames = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = "async";
      image.src = getFrameSrc(index);
      image.onload = () => {
        if (index === 0 || index === Math.round(state.smoothFrame)) drawCurrentFrame();
      };
      return image;
    });
    framesRef.current = frames;

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
        state.renderedFrame = -1;
        drawCurrentFrame();
      }
    }

    function drawCurrentFrame() {
      const frameIndex = clamp(Math.round(state.smoothFrame), 0, FRAME_COUNT - 1);
      const image = framesRef.current[frameIndex];
      if (!image?.complete || image.naturalWidth <= 0) return;

      drawCover(canvasContext, image, canvasElement.width, canvasElement.height);
      state.renderedFrame = frameIndex;
    }

    function syncFrame() {
      if (state.reducedMotion) return;

      const distance = state.targetFrame - state.smoothFrame;
      const smoothing = Math.abs(distance) > SCRUB_SETTINGS.fastScrubDistance
        ? SCRUB_SETTINGS.fastScrubSmoothing
        : SCRUB_SETTINGS.scrubSmoothing;
      const nextFrame = clamp(state.smoothFrame + distance * smoothing, 0, FRAME_COUNT - 1);
      const nextFrameIndex = Math.round(nextFrame);

      if (Math.abs(nextFrame - state.smoothFrame) > SCRUB_SETTINGS.minSeekDelta || nextFrameIndex !== state.renderedFrame) {
        state.smoothFrame = nextFrame;
        drawCurrentFrame();
      }
    }

    function tick() {
      syncFrame();
      frameRef.current = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      if (state.reducedMotion || event.pointerType === "touch") return;
      const x = clamp(event.clientX / window.innerWidth, 0, 1);
      state.targetFrame = (1 - x) * (FRAME_COUNT - 1);
    }

    function onMotionChange(event: MediaQueryListEvent) {
      state.reducedMotion = event.matches;
      if (event.matches) {
        state.targetFrame = 0;
        state.smoothFrame = 0;
        drawCurrentFrame();
      }
    }

    resizeCanvas();
    mediaQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      mediaQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resizeCanvas);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full" style={{ ["--accent" as string]: accent }}>
      <div className="absolute inset-[14%] rounded-pill bg-[color:var(--accent)] opacity-20 blur-[46px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" aria-hidden="true" />
    </div>
  );
}
