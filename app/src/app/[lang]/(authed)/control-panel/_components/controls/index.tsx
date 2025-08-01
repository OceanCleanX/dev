"use client";

import { forwardRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

import { ControlMode, controlModeAtom, waveAtom } from "./shared";
import ConstantControl from "./constant";
import ManualControl from "./manual";
import { useSIO } from "../sio";

import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  FC,
} from "react";
import type { ControlComponent } from "./shared";

const ControlModeKeyValues = Object.entries(ControlMode).filter(
  // fuck eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ([_, v]) => typeof v === "number",
);

const ControlModeSwitch = forwardRef<
  HTMLSelectElement,
  Omit<ComponentPropsWithoutRef<"select">, "onChange" | "value">
>((props, ref) => {
  const t = useTranslations("control-panel.controls.modes");
  const [controlMode, setControlMode] = useAtom(controlModeAtom);

  return (
    <select
      ref={ref}
      onChange={(e) => setControlMode(e.target.value as unknown as ControlMode)}
      value={controlMode}
      {...props}
    >
      {ControlModeKeyValues.map(([key, value]) => (
        <option key={key} value={value}>
          {t(key)}
        </option>
      ))}
    </select>
  );
});
ControlModeSwitch.displayName = "ControlModeSwitch";

const AutoControl: ControlComponent = () => <>Not yet implemented</>;

const controlComponents = [ManualControl, ConstantControl, AutoControl];
const Control: FC<ComponentPropsWithRef<"div">> = (props) => {
  const sio = useSIO();

  const controlMode = useAtomValue(controlModeAtom);
  const [speed, setSpeed] = useAtom(waveAtom);

  useEffect(() => {
    const id = setInterval(() => sio.emit("speed", speed[0], speed[1]), 20);

    return () => clearInterval(id);
  }, [speed, sio]);

  const SelectedControl = controlComponents[controlMode];

  return (
    <div {...props}>
      <SelectedControl setSpeed={setSpeed} />
    </div>
  );
};

export { controlModeAtom, ControlModeSwitch, Control };
