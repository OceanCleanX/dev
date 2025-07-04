import { useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";

import useWs from "@/hooks/useWs";

import { speedAtom } from "./shared";
import ConstantControl from "./constant";
import ManualControl from "./manual";

import type { ComponentPropsWithRef, FC } from "react";
import type { ControlComponent } from "./shared";

enum ControlMode {
  Manual,
  Constant,
  Auto,
}
const ControlModeKeyValues = Object.entries(ControlMode).filter(
  // fuck eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ([_, v]) => typeof v === "number",
);

const controlModeAtom = atom<ControlMode>(ControlMode.Manual);
const ControlModeSwitch = () => {
  const [controlMode, setControlMode] = useAtom(controlModeAtom);

  return (
    <select
      onChange={(e) => setControlMode(e.target.value as unknown as ControlMode)}
      value={controlMode}
    >
      {ControlModeKeyValues.map(([key, value]) => (
        <option key={key} value={value}>
          {key}
        </option>
      ))}
    </select>
  );
};

const AutoControl: ControlComponent = () => <>Not yet implemented</>;

const controlComponents = [ManualControl, ConstantControl, AutoControl];
const Control: FC<ComponentPropsWithRef<"div">> = (props) => {
  const { sendJsonMessage } = useWs();

  const controlMode = useAtomValue(controlModeAtom);
  const [speed, setSpeed] = useAtom(speedAtom);

  useEffect(() => {
    const id = setInterval(
      () =>
        sendJsonMessage({
          type: "speed",
          left: speed[0],
          right: speed[1],
        }),
      20,
    );

    return () => clearInterval(id);
  }, [speed, sendJsonMessage]);

  const SelectedControl = controlComponents[controlMode];

  return (
    <div {...props}>
      <SelectedControl setSpeed={setSpeed} />
    </div>
  );
};

export { ControlModeSwitch, Control };
