import { useState, useCallback } from "react";
import z from "zod";

import { WAVE_MIN, WAVE_MID, WAVE_MAX } from "./shared";

import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { ControlComponent } from "./shared";

const updateSpeed = (
  setAction: Dispatch<SetStateAction<[number, number]>>,
  idx: number,
  data: number,
) => {
  setAction((prev) => {
    const newSpeed: typeof prev = [...prev];
    newSpeed[idx] = data;
    return newSpeed;
  });
};
const SpeedSchema = z.coerce.number().min(WAVE_MIN).max(WAVE_MAX);
const ConstantControl: ControlComponent = ({ setSpeed }) => {
  const [tmpSpeed, setTmpSpeed] = useState<[number, number]>([
    WAVE_MID,
    WAVE_MID,
  ]);

  const handleInput = useCallback(
    (idx: number, ev: ChangeEvent<HTMLInputElement>) => {
      const res = SpeedSchema.safeParse(ev.target.value);
      if (!res.success) return;
      updateSpeed(setTmpSpeed, idx, res.data);
    },
    [],
  );

  return (
    <>
      {["Left", "Right"].map((v, idx) => (
        <form
          className="text-white"
          key={v}
          onSubmit={(ev) => {
            ev.preventDefault();
            updateSpeed(setSpeed, idx, tmpSpeed[idx]);
          }}
        >
          <span>{v}: </span>
          <input
            type="number"
            min={WAVE_MIN}
            max={WAVE_MAX}
            value={tmpSpeed[idx]}
            onChange={(ev) => handleInput(idx, ev)}
          />
          <button type="submit">✓</button>
        </form>
      ))}
    </>
  );
};

export default ConstantControl;
