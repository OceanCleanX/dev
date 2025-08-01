import cn from "@/lib/cn";
import type { FC } from "react";

type Icon = FC<{ className?: string }>;

const OneBarIcon: Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M5 14h3v6H5z" />
  </svg>
);

const TwoBarsIcon: Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M5 14h3v6H5zm6-5h3v11h-3z" />
  </svg>
);

const ThreeBarsIcon: Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M17 4h3v16h-3zM5 14h3v6H5zm6-5h3v11h-3z" />
  </svg>
);

const WifiStrength: FC<{ strength: number | undefined }> = ({ strength }) => {
  const Icon = strength
    ? strength >= 4
      ? ThreeBarsIcon
      : strength >= 2
        ? TwoBarsIcon
        : OneBarIcon
    : OneBarIcon;

  return (
    <Icon
      className={cn(
        "inline-block size-5",
        "text-red-600",
        { "text-yellow-500": strength && strength >= 2 },
        { "text-[#A4F6F2]": strength && strength >= 4 },
      )}
    />
  );
};

export default WifiStrength;
