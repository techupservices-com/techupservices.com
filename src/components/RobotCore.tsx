"use client";

import { useEffect, useRef } from "react";

type RobotCoreProps = {
  accent: string;
};

const VIDEO_SRC = "/images/robot_video.mp4";
const SCRUB_SMOOTHING = 0.13;
const MIN_SEEK_DELTA = 0.018;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function RobotCore({ accent }: RobotCoreProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const stateRef = useRef({
    targetTime: 0,
    smoothTime: 0,
    duration: 0,
    isSeeking: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const state = stateRef.current;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    state.reducedMotion = mediaQuery.matches;

    video.muted = true;
    video.pause();

    function syncSeek() {
      const player = videoRef.current;
      if (!player || state.reducedMotion || state.isSeeking || state.duration <= 0) return;

      state.smoothTime += (state.targetTime - state.smoothTime) * SCRUB_SMOOTHING;
      const nextTime = clamp(state.smoothTime, 0, state.duration);

      if (Math.abs(nextTime - player.currentTime) > MIN_SEEK_DELTA) {
        state.isSeeking = true;
        player.currentTime = nextTime;
      }
    }

    function tick() {
      syncSeek();
      frameRef.current = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      if (state.reducedMotion || event.pointerType === "touch" || state.duration <= 0) return;
      const x = clamp(event.clientX / window.innerWidth, 0, 1);
      state.targetTime = (1 - x) * state.duration;
    }

    function onLoadedMetadata() {
      const player = videoRef.current;
      if (!player) return;
      state.duration = Number.isFinite(player.duration) ? player.duration : 0;
      state.targetTime = 0;
      state.smoothTime = 0;
      state.isSeeking = false;
      player.pause();
      player.currentTime = 0;
    }

    function onSeeked() {
      state.isSeeking = false;
    }

    function onMotionChange(event: MediaQueryListEvent) {
      const player = videoRef.current;
      if (!player) return;
      state.reducedMotion = event.matches;
      if (event.matches) {
        state.targetTime = 0;
        state.smoothTime = 0;
        player.pause();
        player.currentTime = 0;
      }
    }

    mediaQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      mediaQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full" style={{ ["--accent" as string]: accent }}>
      <div className="absolute inset-[14%] rounded-pill bg-[color:var(--accent)] opacity-20 blur-[46px]" />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
