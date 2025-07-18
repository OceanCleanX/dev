import AnimatedBackground from "@/components/motion-primitives/animated-background";
import { CodeIcon, LayersIcon, MixIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

const CORE_TECHS = {
  "control-panel": MixIcon,
  "control-system": CodeIcon,
  "charging-station": LayersIcon,
};

const CoreTechs = () => {
  const t = useTranslations("home.core-techs");

  return (
    <div className="container px-4 mx-auto">
      <h2 className="font-semibold text-3xl mb-10">{t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 -mx-7">
        <AnimatedBackground
          className="rounded-lg bg-zinc-100"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
        >
          {Object.entries(CORE_TECHS).map(([key, Icon], idx) => (
            <div key={key} data-id={idx}>
              <div className="px-7 py-6">
                <h3 className="text-xl font-semibold inline-flex items-center">
                  <Icon className="inline size-6 me-3" />
                  {t(key)}
                </h3>
                <div className="mt-3 text-lg pl-0.5">{t(`${key}-text`)}</div>
              </div>
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
};

export default CoreTechs;
