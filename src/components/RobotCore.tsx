"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type RobotCoreProps = {
  accent: string;
};

type Cursor = { x: number; y: number };

const BODY_TEXTURE = "/images/robot_body.png";
const HEAD_TEXTURE = "/images/robot_head.png";
const ROBOT_SCALE = 2.58;
const HEAD_PIVOT_Y = 0.3;

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

export default function RobotCore({ accent }: RobotCoreProps) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 4.2], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <CharacterSprite accent={accent} />
    </Canvas>
  );
}
