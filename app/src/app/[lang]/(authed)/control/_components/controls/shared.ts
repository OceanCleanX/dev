import { atom } from "jotai";
import type { FC, Dispatch, SetStateAction } from "react";

enum ControlMode {
  Manual,
  Constant,
  Auto,
}
const controlModeAtom = atom<ControlMode>(ControlMode.Manual);

const WAVE_MIN = 0;
const WAVE_MID = 500;
const WAVE_MAX = 1000;
const waveAtom = atom<[number, number]>([WAVE_MID, WAVE_MID]);

type ControlComponent = FC<{
  setSpeed: Dispatch<SetStateAction<[number, number]>>;
}>;

export { ControlMode, controlModeAtom, WAVE_MIN, WAVE_MID, WAVE_MAX, waveAtom };
export type { ControlComponent };
