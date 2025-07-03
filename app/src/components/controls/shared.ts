import type { FC, Dispatch, SetStateAction } from "react";

const SPEED_MIN = 0;
const SPEED_MID = 500;
const SPEED_MAX = 1000;

type ControlComponent = FC<{
  setSpeed: Dispatch<SetStateAction<[number, number]>>;
}>;

export { SPEED_MIN, SPEED_MID, SPEED_MAX };
export type { ControlComponent };
