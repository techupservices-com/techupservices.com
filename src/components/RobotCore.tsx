"use client";

import { useEffect, useRef, useState } from "react";

type RobotCoreProps = {
  accent: string;
};

const FRAME_COUNT = 68;
const FRAME_PATH = "/images/robot-frames/frame-";
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
    helper: "Smallest redraw update",
    description: "Sets the minimum frame movement before canvas redraws. 0 allows every tiny update; higher values reduce redraw frequency.",
    min: 0,
    max: 0.002,
    step: 0.0001,
  },
] as const;

type ScrubSettings = typeof DEFAULT_SCRUB_SETTINGS;

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
  const settingsRef = useRef<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [settings, setSettings] = useState<ScrubSettings>(DEFAULT_SCRUB_SETTINGS);
  const [showTuner, setShowTuner] = useState(true);
  const stateRef = useRef({
    targetFrame: 0,
    smoothFrame: 0,
    renderedFrame: -1,
    canvasWidth: 0,
    canvasHeight: 0,
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
      const currentSettings = settingsRef.current;
      const smoothing = Math.abs(distance) > currentSettings.fastScrubDistance
        ? currentSettings.fastScrubSmoothing
        : currentSettings.scrubSmoothing;
      const nextFrame = clamp(state.smoothFrame + distance * smoothing, 0, FRAME_COUNT - 1);
      const nextFrameIndex = Math.round(nextFrame);

      if (Math.abs(nextFrame - state.smoothFrame) > currentSettings.minSeekDelta || nextFrameIndex !== state.renderedFrame) {
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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" aria-hidden="true" />
      {showTuner ? (
        <aside className="pointer-events-auto fixed right-4 top-24 z-50 hidden max-h-[calc(100dvh-7rem)] w-80 overflow-y-auto rounded-3xl border border-white/15 bg-slate-950/90 p-4 text-white shadow-2xl shadow-cyan-500/10 backdrop-blur-xl lg:block">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">Robot dashboard</p>
              <p className="mt-1 text-sm text-white/70">Tune the canvas frame sequence, then save and disable this panel.</p>
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
