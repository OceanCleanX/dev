import { useTranslations } from "next-intl";

import { Info } from "./shared";
import { ControlModeSwitch } from "../controls";

const Control = () => {
  const t = useTranslations("control-panel.controls");

  return (
    <Info.Root title={t("title")}>
      <Info.Item name={t("mode")}>
        <ControlModeSwitch />
      </Info.Item>
      <Info.Item name="Normalized">Motor way</Info.Item>
    </Info.Root>
  );
};

export default Control;
