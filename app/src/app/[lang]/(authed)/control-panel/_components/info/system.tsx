"use client";

import { useTranslations } from "next-intl";

import { Info } from "./shared";
import WifiStrength from "./wifi-strength";
import { useSIOEvData } from "../sio";

const System = () => {
  const t = useTranslations("control-panel.system");
  const { data: socketData } = useSIOEvData("control-info");

  return (
    <Info.Root title={t("title")}>
      <Info.Item name={t("voltage")}>
        {socketData?.[0].voltage.toFixed(1) ?? "N/A"} V
      </Info.Item>
      <Info.Item name={t("gyro-x")}>
        {socketData?.[0].gyro_x.toFixed(2) ?? "N/A"} m/s²
      </Info.Item>
      <Info.Item name={t("gyro-y")}>
        {socketData?.[0].gyro_y.toFixed(2) ?? "N/A"} m/s²
      </Info.Item>
      <Info.Item name={t("wifi")}>
        <WifiStrength strength={socketData?.[0].wifi_strength} />
      </Info.Item>
    </Info.Root>
  );
};

export default System;
