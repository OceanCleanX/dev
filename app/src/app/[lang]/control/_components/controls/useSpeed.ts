import { useAtomValue } from "jotai";

import { speedAtom } from "./shared";

const useMotorWave = () => useAtomValue(speedAtom);

export default useMotorWave;
