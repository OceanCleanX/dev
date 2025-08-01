"use client";

import { useTranslations } from "next-intl";

import cn from "@/lib/cn";

import useCurrentStatus from "./status";

import type { FC } from "react";

const SLIDER_BAR_NUM = 25;
const Slider: FC<{ value: number; min: number; max: number }> = ({
  value,
  min,
  max,
}) => (
  <div className="w-full p-0.5 mx-auto bg-gradient-to-br from-[#041D24] via-[#05121D] via-25% to-[#07141D] [border-radius:calc(var(--radius-lg)+var(--spacing)*0.5)]">
    <div className="flex items-center justify-between bg-[#000E18] rounded-lg px-2.5 py-1.5">
      {[...Array(SLIDER_BAR_NUM).keys()].map((idx) => (
        <div
          key={idx}
          className={cn("h-3 w-[1px] rounded-lg bg-[#144C5D]", {
            "bg-[#459DB1]": (value - min) / (max - min) >= idx / SLIDER_BAR_NUM,
          })}
        />
      ))}
    </div>
  </div>
);

const ControlStatus = () => {
  const t = useTranslations("control-panel.control-status");
  const status = useCurrentStatus();

  return (
    <div className="size-full flex flex-col">
      <div className="grow-1 basis-1 overflow-y-auto w-full space-y-3 px-2.5">
        {status.map(({ key, ...s }, idx) => (
          <div key={idx} className="flex flex-col space-y-1.5">
            <h3 className="font-light tracking-wider text-[0.9rem] text-[#A4F6F2] ms-1.5">
              {t(key)}
            </h3>
            <Slider {...s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlStatus;
