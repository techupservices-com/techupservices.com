"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type RobotCoreProps = {
  accent: string;
};

type Cursor = { x: number; y: number };

const CHARACTER_TEXTURE = "/images/robot_final.png";

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
  const imageRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const cursorState = useWindowCursor();
  const texture = useLoader(THREE.TextureLoader, CHARACTER_TEXTURE);
  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state) => {
    const root = rootRef.current;
    const image = imageRef.current;
    const halo = haloRef.current;
    if (!root || !image || !halo || cursorState.reducedMotion.current) return;

    const x = THREE.MathUtils.clamp(cursorState.cursor.current.x, -1, 1);
    const y = THREE.MathUtils.clamp(cursorState.cursor.current.y, -1, 1);
    const elapsed = state.clock.elapsedTime;

    root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, x * 0.18, 0.085);
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, -y * 0.1, 0.085);
    root.position.x = THREE.MathUtils.lerp(root.position.x, x * 0.08, 0.075);
    root.position.y = THREE.MathUtils.lerp(root.position.y, -y * 0.05 + Math.sin(elapsed * 0.78) * 0.025, 0.075);

    image.rotation.z = THREE.MathUtils.lerp(image.rotation.z, x * -0.025, 0.08);
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
      <mesh ref={imageRef} position={[0, 0, 0]} scale={[2.58, 2.58, 1]}>
        <planeGeometry args={[1, 1, 24, 24]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.02} depthWrite={false} toneMapped={false} />
      </mesh>
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
