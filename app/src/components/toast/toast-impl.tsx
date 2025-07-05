import { useSetAtom } from "jotai";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  createElement,
} from "react";
import * as Toast from "@radix-ui/react-toast";

import { ToastActionContext, toastStackAtom } from "./shared";

import type { ToastProps } from "./shared";
import type { FC } from "react";

const ToastImpl: FC<ToastProps & { id: string; index: number }> = memo(
  ({ id, content }) => {
    const [show, setShow] = useState(true);
    const setStack = useSetAtom(toastStackAtom);

    const removeFromStack = useCallback(
      () => setStack((prev) => prev.filter((t) => t.id !== id)),
      [id, setStack],
    );

    useEffect(() => {
      let isCancelled = false;
      let timerId: number;
      if (!show) {
        timerId = setTimeout(() => {
          if (!isCancelled) return;
          removeFromStack();
        }, 1000);
      }
      return () => {
        isCancelled = true;
        clearTimeout(timerId);
      };
    }, [show, removeFromStack]);

    const onCancel = useCallback(() => setShow(false), []);

    // useEffect(() => {
    //   const timerId = setTimeout(() => onCancel(), 5000);
    //   return () => clearTimeout(timerId);
    // }, [onCancel]);

    return (
      <ToastActionContext.Provider
        value={useMemo(() => ({ dismiss: onCancel }), [onCancel])}
      >
        <Toast.Root
          open={show}
          onOpenChange={setShow}
          className="bg-black size-10"
        >
          {typeof content === "function"
            ? createElement(content, { dismiss: onCancel })
            : content}
        </Toast.Root>
      </ToastActionContext.Provider>
    );
  },
);

export default ToastImpl;
