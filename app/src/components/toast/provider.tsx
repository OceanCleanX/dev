import * as Toast from "@radix-ui/react-toast";
import { useAtomValue } from "jotai";

import { toastStackAtom } from "./shared";
import ToastImpl from "./toast-impl";

import type { FC, PropsWithChildren } from "react";

const ToastStack = () => {
  const stack = useAtomValue(toastStackAtom);

  return (
    <>
      {stack.map((props, idx) => (
        <ToastImpl key={props.id} {...props} index={idx} />
      ))}
    </>
  );
};

const ToastProvider: FC<PropsWithChildren> = ({ children }) => (
  <Toast.Provider>
    {children}
    <ToastStack />
    <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
  </Toast.Provider>
);

export default ToastProvider;
