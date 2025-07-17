import { useCallback } from "react";
import { useTranslations } from "next-intl";

import { ControlModeSwitch } from "./controls";
import useMotorWave from "./controls/useSpeed";
import useSocketInfo from "./useSocketInfo";
import useWs from "./useWs";

import type { FC, PropsWithChildren } from "react";
import type { SocketInfoType } from "./useSocketInfo";

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
    <span className="text-primary font-semibold -ml-1.5">{name}</span>
    {children}
  </div>
);

const socketInfoKeys: (keyof Omit<SocketInfoType, "type">)[] = [
  "delay",
  "voltage",
  "wifi_strength",
  "gyro_x",
  "gyro_y",
  "gyro_z",
];

const displayValue = (value: number | undefined): string =>
  value?.toFixed(2) ?? "N/A";

const SocketInfo = () => {
  const { data: socketData } = useSocketInfo();
  const t = useTranslations("control.info.boat");

  return (
    <>
      {socketInfoKeys.map((k) => (
        <InfoItem key={k} name={t(k)}>
          {displayValue(
            socketData?.[k as keyof SocketInfoType] as number | undefined,
          )}
        </InfoItem>
      ))}
    </>
  );
};

const StationInfo = () => {
  const t = useTranslations("control.info.station");

  const { sendJsonMessage } = useWs();

  const sendCmd = useCallback(
    (cmd: "ON" | "OFF") =>
      sendJsonMessage({ type: "electromagnet", data: cmd }),
    [sendJsonMessage],
  );

  return (
    <InfoItem name={t("electromagnet")}>
      <div className="inline-block">
        <button
          className="px-1.5 bg-primary text-white rounded me-1"
          onClick={() => sendCmd("ON")}
        >
          {t("magnet-on")}
        </button>
        <button
          className="px-1 bg-primary text-white rounded"
          onClick={() => sendCmd("OFF")}
        >
          {t("magnet-off")}
        </button>
      </div>
    </InfoItem>
  );
};

const Info = () => {
  const t = useTranslations("control.info");
  const motorWave = useMotorWave();

  return (
    <div className="w-fit space-y-3 pl-1.5">
      <InfoSection name={t("boat.section-title")}>
        <SocketInfo />
      </InfoSection>
      <InfoSection name={t("station.section-title")}>
        <StationInfo />
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
