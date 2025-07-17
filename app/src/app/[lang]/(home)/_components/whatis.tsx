import { useTranslations } from "next-intl";
import type { FC } from "react";

const Subtitle: FC<{ name: string }> = ({ name }) => (
  <h3 className="font-medium text-2xl mb-3">{name}</h3>
);

const Text: FC<{ text: string }> = ({ text }) => (
  <div className="text-lg">{text}</div>
);

const WhatIs = () => {
  const t = useTranslations("home.whatis");

  return (
    <div className="container px-4 sm:px-0 mx-auto space-y-10">
      <h2 className="font-semibold text-3xl">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Subtitle name={t("start")} />
          <Text text={t("start-text")} />
        </div>
        <div>
          <video
            className="shrink"
            width="1280"
            height="720"
            controls
            preload="auto"
          >
            <source src="/video1.mp4" type="video/mp4" />
            Video not supported.
          </video>
          <div className="text-sm mt-3 ms-1 opacity-70">
            {t("video-caption")}
          </div>
        </div>
        <div>
          <Subtitle name={t("goal")} />
          <Text text={t("goal-text")} />
        </div>
        <div>
          <Subtitle name={t("approach")} />
          <Text text={t("approach-text")} />
        </div>
      </div>
    </div>
  );
};

export default WhatIs;
