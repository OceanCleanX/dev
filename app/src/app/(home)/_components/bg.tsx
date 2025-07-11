"use client";

import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  RandomizedLight,
  Sphere,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { BackSide, Group } from "three";

import type { Vector3 } from "three";

// adapted from https://github.com/pmndrs/website/blob/main/components/scenes/caustic/CausticScene.tsx
const Env = () => {
  const ref = useRef<Group>(null!);

  useFrame((state, delta) => {
    easing.damp3(
      ref.current.rotation as unknown as Vector3,
      [Math.PI / 2, 0, state.clock.elapsedTime / 5 + state.pointer.x],
      0.2,
      delta,
    );

    easing.damp3(
      state.camera.position,
      [
        Math.sin(state.pointer.x / 4) * 9,
        1.25 + state.pointer.y,
        Math.cos(state.pointer.x / 4) * 9,
      ],
      0.5,
      delta,
    );

    state.camera.lookAt(0, 0, 0);
  });
  return (
    <Environment
      frames={Infinity}
      resolution={256}
      background
      backgroundBlurriness={0.8}
    >
      <Sphere args={[10]} scale={100}>
        <meshBasicMaterial
          color="#d0d0d0"
          side={BackSide}
          transparent
          opacity={0}
        />
      </Sphere>

      <Lightformer
        intensity={4}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <Lightformer
        intensity={4}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />

      <group rotation={[Math.PI / 2, 1, 0]}>
        {[2, -2, 2, -4, 2, -5, 2, -9].map((x, i) => (
          <Lightformer
            key={i}
            intensity={1}
            rotation={[Math.PI / 4, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[4, 1, 1]}
          />
        ))}
        <Lightformer
          intensity={0.5}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[50, 2, 1]}
        />
        <Lightformer
          intensity={0.5}
          rotation-y={Math.PI / 2}
          position={[-5, -1, -1]}
          scale={[50, 2, 1]}
        />
        <Lightformer
          intensity={0.5}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[50, 2, 1]}
        />
      </group>

      <group ref={ref}>
        <Lightformer
          intensity={5}
          form="ring"
          color="#66ccff"
          rotation-y={Math.PI / 2}
          position={[-5, 2, -1]}
          scale={[10, 10, 1]}
        />
      </group>
    </Environment>
  );
};

const Bg = () => (
  <Canvas>
    <AccumulativeShadows
      frames={100}
      alphaTest={0.75}
      opacity={0.8}
      color="#66ccff"
      scale={20}
      position={[0, -0.005, 0]}
    >
      <RandomizedLight
        amount={8}
        radius={6}
        ambient={0.5}
        intensity={Math.PI}
        position={[-1.5, 2.5, -2.5]}
        bias={0.001}
      />
    </AccumulativeShadows>
    <color attach="background" args={["#ffffff"]} />
    <Env />
  </Canvas>
);

export default Bg;
