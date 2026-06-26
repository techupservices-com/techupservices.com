"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type RobotCoreProps = {
  accent: string;
};

type Cursor = { x: number; y: number };
type RobotAssetMode = "layered" | "angles" | "glb";

const ROBOT_ASSET_MODE: RobotAssetMode = "angles";
const BODY_TEXTURE = "/images/robot_body.png";
const HEAD_TEXTURE = "/images/robot_head.png";
const GLB_HEAD_MODEL = "/models/robot-head.glb";
const ROBOT_SCALE = 2.58;
const HEAD_PIVOT_Y = 0.3;
const ANGLE_FRAMES = [
  { value: -1, path: "/images/robot-angles/head-left-45.png" },
  { value: -0.66, path: "/images/robot-angles/head-left-30.png" },
  { value: -0.33, path: "/images/robot-angles/head-left-15.png" },
  { value: 0, path: "/images/robot-angles/head-front.png" },
  { value: 0.33, path: "/images/robot-angles/head-right-15.png" },
  { value: 0.66, path: "/images/robot-angles/head-right-30.png" },
  { value: 1, path: "/images/robot-angles/head-right-45.png" },
] as const;

function useWindowCursor() {
  const cursor = useRef<Cursor>({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mediaQuery.matches;

    function onMotionChange(event: MediaQueryListEvent) {
      reducedMotion.current = event.matches;
      if (event.matches) cursor.current = { x: 0, y: 0 };
    }

    function onPointerMove(event: PointerEvent) {
      if (reducedMotion.current || event.pointerType === "touch") return;
      cursor.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      cursor.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    mediaQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      mediaQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return { cursor, reducedMotion };
}

function CharacterSprite({ accent }: RobotCoreProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyeGlintRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const cursorState = useWindowCursor();
  const [bodyTexture, headTexture] = useLoader(THREE.TextureLoader, [BODY_TEXTURE, HEAD_TEXTURE]);
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    [bodyTexture, headTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    });
  }, [bodyTexture, headTexture]);

  useFrame((state) => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const head = headRef.current;
    const eyeGlint = eyeGlintRef.current;
    const halo = haloRef.current;
    if (!root || !body || !head || !eyeGlint || !halo || cursorState.reducedMotion.current) return;

    const x = THREE.MathUtils.clamp(cursorState.cursor.current.x, -1, 1);
    const y = THREE.MathUtils.clamp(cursorState.cursor.current.y, -1, 1);
    const elapsed = state.clock.elapsedTime;

    root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, x * 0.055, 0.07);
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -y * 0.025, 0.07);
    root.position.x = THREE.MathUtils.lerp(root.position.x, x * 0.045, 0.075);
    root.position.y = THREE.MathUtils.lerp(root.position.y, -y * 0.05 + Math.sin(elapsed * 0.78) * 0.025, 0.075);

    body.rotation.z = THREE.MathUtils.lerp(body.rotation.z, x * -0.006, 0.08);
    head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, x * 0.36, 0.15);
    head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -y * 0.18, 0.15);
    head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, x * -0.035, 0.12);
    eyeGlint.position.x = THREE.MathUtils.lerp(eyeGlint.position.x, x * 0.035, 0.18);
    eyeGlint.position.y = THREE.MathUtils.lerp(eyeGlint.position.y, -y * 0.02, 0.18);
    halo.position.x = THREE.MathUtils.lerp(halo.position.x, x * 0.22, 0.06);
    halo.position.y = THREE.MathUtils.lerp(halo.position.y, -y * 0.16, 0.06);
  });

  return (
    <group ref={rootRef} position={[0, -0.04, 0]}>
      <mesh ref={haloRef} position={[0, 0, -0.18]} scale={[1.65, 1.65, 1]}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, -0.34, -0.1]} rotation={[0, 0, -0.08]} scale={[1.36, 0.22, 1]}>
        <circleGeometry args={[1, 80]} />
        <meshBasicMaterial color="#000212" transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0, 0]} scale={[ROBOT_SCALE, ROBOT_SCALE, 1]}>
        <planeGeometry args={[1, 1, 24, 24]} />
        <meshBasicMaterial map={bodyTexture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={headRef} position={[0, HEAD_PIVOT_Y, 0.055]}>
        <mesh position={[0, -HEAD_PIVOT_Y, 0]} scale={[ROBOT_SCALE, ROBOT_SCALE, 1]}>
          <planeGeometry args={[1, 1, 24, 24]} />
          <meshBasicMaterial map={headTexture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
        </mesh>
        <group ref={eyeGlintRef} position={[0, 0.28, 0.018]}>
          {[-0.095, 0.095].map((x) => (
            <mesh key={x} position={[x, 0, 0]} scale={[0.034, 0.01, 1]}>
              <circleGeometry args={[1, 24]} />
              <meshBasicMaterial color={accentColor} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

function AngleSpriteRobot({ accent }: RobotCoreProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const cursorState = useWindowCursor();
  const bodyTexture = useLoader(THREE.TextureLoader, BODY_TEXTURE);
  const headTextures = useLoader(
    THREE.TextureLoader,
    ANGLE_FRAMES.map((frame) => frame.path),
  );
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    [bodyTexture, ...headTextures].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    });
  }, [bodyTexture, headTextures]);

  useFrame((state) => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const head = headRef.current;
    const halo = haloRef.current;
    if (!root || !body || !head || !halo || cursorState.reducedMotion.current) return;

    const x = THREE.MathUtils.clamp(cursorState.cursor.current.x, -1, 1);
    const y = THREE.MathUtils.clamp(cursorState.cursor.current.y, -1, 1);
    const elapsed = state.clock.elapsedTime;
    const frameIndex = ANGLE_FRAMES.reduce((closestIndex, frame, index) => {
      const closestDistance = Math.abs(ANGLE_FRAMES[closestIndex].value - x);
      const frameDistance = Math.abs(frame.value - x);
      return frameDistance < closestDistance ? index : closestIndex;
    }, 0);

    const material = head.material instanceof THREE.MeshBasicMaterial ? head.material : null;
    if (material && material.map !== headTextures[frameIndex]) {
      material.map = headTextures[frameIndex];
      material.needsUpdate = true;
    }

    root.position.x = THREE.MathUtils.lerp(root.position.x, x * 0.035, 0.07);
    root.position.y = THREE.MathUtils.lerp(root.position.y, -y * 0.04 + Math.sin(elapsed * 0.78) * 0.02, 0.07);
    body.rotation.z = THREE.MathUtils.lerp(body.rotation.z, x * -0.004, 0.08);
    head.position.x = THREE.MathUtils.lerp(head.position.x, x * 0.045, 0.14);
    head.position.y = THREE.MathUtils.lerp(head.position.y, -y * 0.025, 0.14);
    halo.position.x = THREE.MathUtils.lerp(halo.position.x, x * 0.22, 0.06);
    halo.position.y = THREE.MathUtils.lerp(halo.position.y, -y * 0.16, 0.06);
  });

  return (
    <group ref={rootRef} position={[0, -0.04, 0]}>
      <mesh ref={haloRef} position={[0, 0, -0.18]} scale={[1.65, 1.65, 1]}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, -0.34, -0.1]} rotation={[0, 0, -0.08]} scale={[1.36, 0.22, 1]}>
        <circleGeometry args={[1, 80]} />
        <meshBasicMaterial color="#000212" transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0, 0]} scale={[ROBOT_SCALE, ROBOT_SCALE, 1]}>
        <planeGeometry args={[1, 1, 24, 24]} />
        <meshBasicMaterial map={bodyTexture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={headRef} position={[0, 0, 0.055]} scale={[ROBOT_SCALE, ROBOT_SCALE, 1]}>
        <planeGeometry args={[1, 1, 24, 24]} />
        <meshBasicMaterial map={headTextures[3]} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GlbHeadRobot({ accent }: RobotCoreProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const cursorState = useWindowCursor();
  const bodyTexture = useLoader(THREE.TextureLoader, BODY_TEXTURE);
  const gltf = useLoader(GLTFLoader, GLB_HEAD_MODEL);
  const headScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    bodyTexture.colorSpace = THREE.SRGBColorSpace;
    bodyTexture.anisotropy = 8;
    bodyTexture.needsUpdate = true;
  }, [bodyTexture]);

  useFrame((state) => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const head = headRef.current;
    const halo = haloRef.current;
    if (!root || !body || !head || !halo || cursorState.reducedMotion.current) return;

    const x = THREE.MathUtils.clamp(cursorState.cursor.current.x, -1, 1);
    const y = THREE.MathUtils.clamp(cursorState.cursor.current.y, -1, 1);
    const elapsed = state.clock.elapsedTime;

    root.position.x = THREE.MathUtils.lerp(root.position.x, x * 0.04, 0.07);
    root.position.y = THREE.MathUtils.lerp(root.position.y, -y * 0.04 + Math.sin(elapsed * 0.78) * 0.02, 0.07);
    body.rotation.z = THREE.MathUtils.lerp(body.rotation.z, x * -0.004, 0.08);
    head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, x * 0.62, 0.16);
    head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -y * 0.24, 0.16);
    head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, x * -0.035, 0.12);
    halo.position.x = THREE.MathUtils.lerp(halo.position.x, x * 0.22, 0.06);
    halo.position.y = THREE.MathUtils.lerp(halo.position.y, -y * 0.16, 0.06);
  });

  return (
    <group ref={rootRef} position={[0, -0.04, 0]}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[2.2, 2.8, 3.2]} intensity={2.1} color={accent} />
      <pointLight position={[-1.6, 0.8, 2.2]} intensity={1.2} color="#3b82f6" />
      <mesh ref={haloRef} position={[0, 0, -0.18]} scale={[1.65, 1.65, 1]}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, -0.34, -0.1]} rotation={[0, 0, -0.08]} scale={[1.36, 0.22, 1]}>
        <circleGeometry args={[1, 80]} />
        <meshBasicMaterial color="#000212" transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0, 0]} scale={[ROBOT_SCALE, ROBOT_SCALE, 1]}>
        <planeGeometry args={[1, 1, 24, 24]} />
        <meshBasicMaterial map={bodyTexture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={headRef} position={[0, HEAD_PIVOT_Y, 0.22]} scale={[0.9, 0.9, 0.9]}>
        <primitive object={headScene} />
      </group>
    </group>
  );
}

function RobotScene({ accent }: RobotCoreProps) {
  if (ROBOT_ASSET_MODE === "glb") return <GlbHeadRobot accent={accent} />;
  if (ROBOT_ASSET_MODE === "angles") return <AngleSpriteRobot accent={accent} />;
  return <CharacterSprite accent={accent} />;
}

export default function RobotCore({ accent }: RobotCoreProps) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 4.2], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <RobotScene accent={accent} />
    </Canvas>
  );
}
