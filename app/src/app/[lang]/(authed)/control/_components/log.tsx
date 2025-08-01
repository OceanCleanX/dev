import { atom, useAtomValue, useSetAtom } from "jotai";

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
const useLog = () => useAtomValue(logAtom);
const useAddLog = () => useSetAtom(addLogAtom);

export { useLog, useAddLog };
export type { LogEntry };
