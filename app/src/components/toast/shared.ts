import { atom } from "jotai";
import { createContext, useContext } from "react";

import type { ReactNode } from "react";

type ToastContentProps = {
  dismiss: () => void;
};

type ToastProps = {
  id?: string;
  content: ReactNode | ((props: ToastContentProps) => ReactNode);
};

const toastStackAtom = atom<(ToastProps & { id: string })[]>([]);

const ToastActionContext = createContext<{
  dismiss: () => void;
}>(null!);

const useCurrentToastAction = () => useContext(ToastActionContext);

export { toastStackAtom, useCurrentToastAction, ToastActionContext };
export type { ToastProps, ToastContentProps };
