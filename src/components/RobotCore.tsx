"use client";

import { useEffect, useRef, useState } from "react";

type RobotCoreProps = {
  accent: string;
};

const VIDEO_SRC = "/images/robot.mp4";
const DEFAULT_SCRUB_SETTINGS = {
  scrubSmoothing: 0.9,
  fastScrubSmoothing: 0.995,
  fastScrubDistance: 0.04,
  minSeekDelta: 0.001,
};

type ScrubSettings = typeof DEFAULT_SCRUB_SETTINGS;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function RobotCore({ accent }: RobotCoreProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const settingsRef = useRef<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const [settings, setSettings] = useState<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const [showTuner, setShowTuner] = useState(false);
  const stateRef = useRef({
    targetTime: 0,
    smoothTime: 0,
    duration: 0,
    reducedMotion: false,
  });

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("robotTune") !== "1") return;

    setShowTuner(true);

    try {
      const savedSettings = window.localStorage.getItem("robot-scrub-settings");
      if (savedSettings) {
        setSettings({ ...DEFAULT_SCRUB_SETTINGS, ...JSON.parse(savedSettings) });
      }
    } catch {
      setSettings(DEFAULT_SCRUB_SETTINGS);
    }
  }, []);

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
      if (!player || state.reducedMotion || state.duration <= 0) return;

      const distance = state.targetTime - state.smoothTime;
      const currentSettings = settingsRef.current;
      const smoothing = Math.abs(distance) > currentSettings.fastScrubDistance
        ? currentSettings.fastScrubSmoothing
        : currentSettings.scrubSmoothing;
      state.smoothTime += distance * smoothing;
      const nextTime = clamp(state.smoothTime, 0, state.duration);

      if (Math.abs(nextTime - player.currentTime) > currentSettings.minSeekDelta) {
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
      player.pause();
      player.currentTime = 0;
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
    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      mediaQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function updateSetting(key: keyof ScrubSettings, value: number) {
    setSettings((currentSettings) => ({ ...currentSettings, [key]: value }));
  }

  function saveSettings() {
    window.localStorage.setItem("robot-scrub-settings", JSON.stringify(settings));
  }

  function copySettings() {
    const constants = `const DEFAULT_SCRUB_SETTINGS = {\n  scrubSmoothing: ${settings.scrubSmoothing},\n  fastScrubSmoothing: ${settings.fastScrubSmoothing},\n  fastScrubDistance: ${settings.fastScrubDistance},\n  minSeekDelta: ${settings.minSeekDelta},\n};`;
    void navigator.clipboard?.writeText(constants);
  }

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
      {showTuner ? (
        <div className="fixed right-4 top-24 z-50 w-72 rounded-3xl border border-white/15 bg-slate-950/90 p-4 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">Robot tuner</p>
              <p className="mt-1 text-sm text-white/70">Use `?robotTune=1`; remove it to hide.</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/15 px-2 py-1 text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-white"
              onClick={() => setShowTuner(false)}
            >
              Hide
            </button>
          </div>

          {([
            ["scrubSmoothing", "Smooth", 0.5, 1, 0.005],
            ["fastScrubSmoothing", "Fast", 0.8, 1, 0.001],
            ["fastScrubDistance", "Fast threshold", 0.005, 0.2, 0.005],
            ["minSeekDelta", "Seek delta", 0.0005, 0.01, 0.0005],
          ] as const).map(([key, label, min, max, step]) => (
            <label key={key} className="mb-3 block text-xs text-white/65">
              <span className="mb-1 flex justify-between gap-3">
                <span>{label}</span>
                <span className="font-mono text-cyan-100">{settings[key].toFixed(4)}</span>
              </span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={settings[key]}
                onChange={(event) => updateSetting(key, Number(event.target.value))}
                className="w-full accent-cyan-300"
              />
            </label>
          ))}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-full bg-cyan-300 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200"
              onClick={saveSettings}
            >
              Save local
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-cyan-300/50"
              onClick={copySettings}
            >
              Copy values
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
