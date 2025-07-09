import { useAtomValue } from "jotai";

import { speedAtom } from "./shared";

const useSpeed = () => useAtomValue(speedAtom);

export default useSpeed;
