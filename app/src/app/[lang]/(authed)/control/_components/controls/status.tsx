"use client";

import { useAtomValue } from "jotai";

import {
  ControlMode,
  controlModeAtom,
  WAVE_MAX,
  WAVE_MIN,
  waveAtom,
} from "./shared";
import {
  DIRECTION_MAX,
  DIRECTION_MIN,
  directionAtom,
  MAX_T,
  MIN_T,
  tAtom,
} from "./manual";

type ControlStatus = {
  key: string;
  min: number;
  max: number;
  value: number;
};

const makeStatus = (
  key: string,
  min: number,
  max: number,
  value: number,
): ControlStatus => ({ key, min, max, value });

const useCurrentStatus = (): ControlStatus[] => {
  const [left, right] = useAtomValue(waveAtom);
  const mode = useAtomValue(controlModeAtom);

  const t = useAtomValue(tAtom);
  const direction = useAtomValue(directionAtom);

  let modeSpecificStatus: ControlStatus[] = [];
  switch (mode) {
    case ControlMode.Manual:
      modeSpecificStatus = [
        makeStatus("manual.t", MIN_T, MAX_T, t),
        makeStatus("manual.direction", DIRECTION_MIN, DIRECTION_MAX, direction),
      ];
      break;
  }

  return [
    ...modeSpecificStatus,
    makeStatus("left-wave", WAVE_MIN, WAVE_MAX, left),
    makeStatus("right-wave", WAVE_MIN, WAVE_MAX, right),
  ];
};

export type { ControlStatus };
export default useCurrentStatus;
