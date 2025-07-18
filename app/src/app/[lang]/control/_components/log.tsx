import { atom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";

import type { FC } from "react";

type LogEntry = {
  timestamp: number;
  msg: string;
};

const logAtom = atom<LogEntry[]>([]);
const addLogAtom = atom(null, (get, set, update: string) => {
  const logs = get(logAtom);
  set(logAtom, [
    ...logs,
    {
      timestamp: Date.now(),
      msg: update,
    },
  ]);
});
const useAddLog = () => useSetAtom(addLogAtom);

const LogEntryItem: FC<{ entry: LogEntry }> = ({
  entry: { timestamp, msg },
}) => (
  <div className="text-sm space-x-2">
    <span>{new Date(timestamp).toLocaleTimeString()}</span>
    <span>{msg}</span>
  </div>
);

const Log = () => {
  const t = useTranslations("control.log");
  const logs = useAtomValue(logAtom);

  return (
    <>
      <div className="text-lg font-semibold -ml-1.5 mb-2">{t("title")}</div>
      {logs.map((log, index) => (
        <LogEntryItem key={index} entry={log} />
      ))}
    </>
  );
};

export default Log;
export { useAddLog };
