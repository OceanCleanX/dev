"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { useLog } from "./log";

import type { FC } from "react";
import type { LogEntry } from "./log";

const LogEntry: FC<{ entry: LogEntry }> = ({ entry: { timestamp, msg } }) => (
  <div className="inline-flex space-x-3">
    <span className="text-[#A4F6F2] shrink-0 font-light">
      {new Date(timestamp).toLocaleTimeString()}
    </span>
    <span className="text-white shrink font-extralight">{msg}</span>
  </div>
);

const DisplayLog = () => {
  const t = useTranslations("control-panel.log");
  const log = useLog();
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.parentElement?.scrollTo({
      top: logEndRef.current.offsetTop,
      behavior: "smooth",
    });
  }, [log]);

  return (
    <div className="h-full flex flex-col space-y-2">
      <h2 className="uppercase font-extralight tracking-wider text-[0.95rem] text-[#A4F6F2]">
        {t("title")}
      </h2>
      <div className="grow-1 basis-1 overflow-y-auto font-mono text-xs space-y-1">
        {log.map((entry, idx) => (
          <LogEntry key={idx} entry={entry} />
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default DisplayLog;
