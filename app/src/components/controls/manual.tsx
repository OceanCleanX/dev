import { useCallback, useEffect, useState } from "react";
import {
  useDebouncedCallback,
  useThrottledCallback,
} from "@tanstack/react-pacer";

import { SPEED_MAX, SPEED_MIN } from "./shared";

import type { ControlComponent } from "./shared";

// constants for speed calculation
const INCREMENT = 1;
const LIMIT = 20;
// sigmoid for speed calculation
const calcSpeed = (x: number) => SPEED_MAX / (1 + Math.exp(-INCREMENT * x));

// constants for manual control
const T_STEP = 0.5;
const MAX_T = LIMIT;
const MIN_T = -MAX_T;
const DIRECTION_STEP = 0.05;
const DIRECTION_MAX = 1;
const DIRECTION_MIN = -1;

const _incT = (prev: number, inc: number) =>
  Math.min(MAX_T, Math.max(MIN_T, prev + inc));
const incT = (prev: number) => _incT(prev, T_STEP);
const decT = (prev: number) => _incT(prev, -T_STEP);

const _incDirection = (prev: number, inc: number) =>
  Math.min(DIRECTION_MAX, Math.max(DIRECTION_MIN, prev + inc));
const incDirection = (prev: number) => _incDirection(prev, DIRECTION_STEP);
const decDirection = (prev: number) => _incDirection(prev, -DIRECTION_STEP);

// constants for reset
const PRECISION = 3;
const BOUND = Math.pow(1 / 10, PRECISION - 1);
const resetCoff = 0.8;
const reset = (n: number) => (Math.abs(n) < BOUND ? 0 : n * resetCoff);
const RESET_WAIT = 300;
const RESET_INTERVAL = 50;

const limitSpeed = (s: number) => Math.max(SPEED_MIN, Math.min(SPEED_MAX, s));

const hasOneOfKeys = (keys: Set<string>, ...keysToCheck: string[]) =>
  keysToCheck.some(Set.prototype.has.bind(keys));

const ManualControl: ControlComponent = ({ setSpeed }) => {
  const [keys, _setKeys] = useState(() => new Set<string>());
  const [t, setT] = useState(0);
  const [direction, setDirection] = useState(0);

  // reset t and direction if keys are not pressed
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const resetHandler = useCallback(() => {
    setT(reset);
    setDirection(reset);
  }, []);
  const _startReset = useDebouncedCallback(
    (id: number | null) => {
      if (id) {
        clearInterval(id);
        setIntervalId(null);
      }
      setIntervalId(setInterval(resetHandler, RESET_INTERVAL));
    },
    { wait: RESET_WAIT },
  );
  const startReset = useCallback(
    () => _startReset(intervalId),
    [intervalId, _startReset],
  );

  // update t and direction baed on keys pressed
  const setKeys = (func: (_: string) => void, val: string) =>
    _setKeys((prev) => {
      const next = new Set(prev);
      func.call(next, val);
      return next;
    });
  const handleKeys = useCallback(() => {
    if (hasOneOfKeys(keys, "ArrowUp", "w")) setT(incT);
    if (hasOneOfKeys(keys, "ArrowDown", "s")) setT(decT);
    if (hasOneOfKeys(keys, "ArrowLeft", "a")) setDirection(decDirection);
    if (hasOneOfKeys(keys, "ArrowRight", "d")) setDirection(incDirection);

    startReset();
  }, [keys, startReset]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setKeys(Set.prototype.add, event.key);
      handleKeys();
    },
    [handleKeys],
  );
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      setKeys(Set.prototype.delete, event.key);
      handleKeys();
    },
    [handleKeys],
  );
  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // calc speed with t and direction
  const calcSpeedHandler = useThrottledCallback(
    (t: number, direction: number) => {
      const speed = calcSpeed(t); // speed ranges from 0 to SPEED_MAX
      const left = Math.round(speed * (1 - direction));
      const right = Math.round(speed * (1 + direction));
      setSpeed([limitSpeed(left), limitSpeed(right)]);
    },
    { wait: 20 },
  );
  useEffect(() => {
    calcSpeedHandler(t, direction);
  }, [calcSpeedHandler, direction, t]);

  return <></>;
};

export default ManualControl;
