import { Provider } from "jotai";
import type { FC, PropsWithChildren } from "react";
import jotaiStore from "./store";

const JotaiProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={jotaiStore}>{children}</Provider>
);

export default JotaiProvider;
