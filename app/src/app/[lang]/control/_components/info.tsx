import { useTranslations } from "next-intl";

import { useSIOEvData } from "./sio";
import { ControlModeSwitch } from "./controls";
import useMotorWave from "./controls/useSpeed";

import type { FC, PropsWithChildren } from "react";

const InfoItem: FC<PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => (
  <div className="w-fit">
    <span className="mr-1">
      <span className="font-medium">{name}</span>:
    </span>
    {children}
  </div>
);

const InfoSection: FC<PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => (
  <div className="w-fit">
    <span className="font-semibold -ml-1.5">{name}</span>
    {children}
  </div>
);

const socketInfoKeys = [
  "delay",
  "voltage",
  "wifi_strength",
  "gyro_x",
  "gyro_y",
  "gyro_z",
] as const;

const displayValue = (value: number | undefined): string =>
  value?.toFixed(2) ?? "N/A";

const SocketInfo = () => {
  const { data: socketData } = useSIOEvData("control-info");
  const t = useTranslations("control.info.boat");

  return (
    <>
      {socketInfoKeys.map((k) => (
        <InfoItem key={k} name={t(k)}>
          {displayValue(socketData?.[0][k])}
        </InfoItem>
      ))}
    </>
  );
};

const Info = () => {
  const t = useTranslations("control.info");
  const motorWave = useMotorWave();

  return (
    <div className="max-h-full w-fit space-y-3 pl-1.5 overflow-y-auto">
      <InfoSection name={t("boat.section-title")}>
        <SocketInfo />
      </InfoSection>
      <InfoSection name={t("control.section-title")}>
        <InfoItem name={t("control.mode")}>
          <ControlModeSwitch />
        </InfoItem>
        <InfoItem name={t("control.motor")}>
          <span className="font-mono">{`[${motorWave[0]}, ${motorWave[1]}]`}</span>
        </InfoItem>
      </InfoSection>
    </div>
  );
};

export default Info;
