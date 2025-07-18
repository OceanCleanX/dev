"use client";

import { LazyMotion } from "motion/react";

import type { FC, PropsWithChildren } from "react";

const loadFeatures = () =>
  import("./motion-features").then((res) => res.default);

const MotionProvider: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion features={loadFeatures} strict>
    {children}
  </LazyMotion>
);

export default MotionProvider;
