"use client";

import { useEffect, useRef, useState } from "react";

type RobotCoreProps = {
  accent: string;
};

const VIDEO_SRC = "/images/robot.mp4";
const DEFAULT_SCRUB_SETTINGS = {
  scrubSmoothing: 0.82,
  fastScrubSmoothing: 0.98,
  fastScrubDistance: 0.07,
  minSeekDelta: 0.0015,
};

const SCRUB_CONTROLS = [
  {
    key: "scrubSmoothing",
    label: "SCRUB_SMOOTHING",
    helper: "Base cursor smoothing",
    description: "Controls the normal frame-to-frame follow speed. 0 freezes normal smoothing; higher values make the robot track the cursor faster.",
    min: 0,
    max: 1,
    step: 0.005,
  },
  {
    key: "fastScrubSmoothing",
    label: "FAST_SCRUB_SMOOTHING",
    helper: "Large movement catch-up",
    description: "Controls how aggressively the robot catches up after a big left/right mouse move. 0 disables fast catch-up; higher values feel snappier.",
    min: 0,
    max: 1,
    step: 0.001,
  },
  {
    key: "fastScrubDistance",
    label: "FAST_SCRUB_DISTANCE",
    helper: "When fast mode starts",
    description: "Sets how far behind the video must be before fast catch-up starts. 0 triggers fast mode almost immediately; higher values keep more easing.",
    min: 0,
    max: 0.12,
    step: 0.005,
  },
  {
    key: "minSeekDelta",
    label: "MIN_SEEK_DELTA",
    helper: "Smallest seek update",
    description: "Sets the minimum time change before the video seeks again. 0 allows every tiny update; higher values reduce seek frequency.",
    min: 0,
    max: 0.002,
    step: 0.0001,
  },
] as const;

type ScrubSettings = typeof DEFAULT_SCRUB_SETTINGS;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function RobotCore({ accent }: RobotCoreProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const settingsRef = useRef<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const [settings, setSettings] = useState<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const [showTuner, setShowTuner] = useState(true);
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
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("robotTune") === "1") {
        window.localStorage.removeItem("robot-scrub-tuner-disabled");
        setShowTuner(true);
      } else {
        setShowTuner(window.localStorage.getItem("robot-scrub-tuner-disabled") !== "1");
      }
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

  function resetSettings() {
    setSettings(DEFAULT_SCRUB_SETTINGS);
    window.localStorage.removeItem("robot-scrub-settings");
  }

  function disableTuner() {
    window.localStorage.setItem("robot-scrub-tuner-disabled", "1");
    setShowTuner(false);
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
        <aside className="pointer-events-auto fixed right-4 top-24 z-50 hidden max-h-[calc(100dvh-7rem)] w-80 overflow-y-auto rounded-3xl border border-white/15 bg-slate-950/90 p-4 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl lg:block">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">Robot dashboard</p>
              <p className="mt-1 text-sm text-white/70">Tune the hero robot, then save and disable this panel.</p>
            </div>
            <button
              type="button"
              className="min-h-11 rounded-full border border-white/15 px-3 text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              onClick={disableTuner}
            >
              Disable
            </button>
          </div>

          {SCRUB_CONTROLS.map(({ key, label, helper, description, min, max, step }) => (
            <label key={key} className="mb-5 block text-xs text-white/65">
              <span className="mb-2 flex justify-between gap-3">
                <span>
                  <span className="block font-mono text-[0.68rem] text-white/80">{label}</span>
                  <span className="block text-white/45">{helper}</span>
                </span>
                <span className="font-mono text-cyan-100">{settings[key].toFixed(4)}</span>
              </span>
              <span className="mb-2 block leading-relaxed text-white/55">{description}</span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={settings[key]}
                onChange={(event) => updateSetting(key, Number(event.target.value))}
                aria-label={label}
                className="h-11 w-full accent-cyan-300"
              />
              <span className="mt-1 flex justify-between font-mono text-[0.65rem] text-white/35">
                <span>{min}</span>
                <span>{max}</span>
              </span>
            </label>
          ))}

          <div className="mt-5 grid grid-cols-3 gap-2">
            <button
              type="button"
              className="min-h-11 rounded-full bg-cyan-300 px-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              onClick={saveSettings}
            >
              Save
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full border border-white/15 px-3 text-xs font-semibold text-white transition hover:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              onClick={resetSettings}
            >
              Reset
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full border border-white/15 px-3 text-xs font-semibold text-white transition hover:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              onClick={copySettings}
            >
              Copy
            </button>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
