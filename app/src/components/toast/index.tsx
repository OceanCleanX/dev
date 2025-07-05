import { useId, useRef } from "react";

import jotaiStore from "@/components/providers/jotai/store";

import { toastStackAtom } from "./shared";

import type { ToastProps } from "./shared";

const toastId2Props: Record<string, ToastProps> = {};

jotaiStore.sub(toastStackAtom, () => {
  console.log(jotaiStore.get(toastStackAtom));
});

const presetToast = (
  props: ToastProps,
  id: string = ((Math.random() * 10) | 0).toString(),
) => {
  jotaiStore.set(toastStackAtom, (prev) => {
    const toastProps = { ...props, id: props.id ?? id };
    toastId2Props[toastProps.id] = toastProps;
    return [...prev, toastProps];
  });

  return () =>
    jotaiStore.set(toastStackAtom, (prev) => prev.filter((t) => t.id !== id));
};

const actions = {
  dismiss: (id: string) =>
    jotaiStore.set(toastStackAtom, (prev) => prev.filter((t) => t.id !== id)),
  dismissTop: () => jotaiStore.set(toastStackAtom, (prev) => prev.slice(0, -1)),
  dismissAll: () => jotaiStore.set(toastStackAtom, []),
};

const useToastStack = () => {
  const id = useId();
  const currentCount = useRef(0);
  return {
    present: (props: ToastProps) =>
      presetToast(props, `${id}-${currentCount.current++}`),
    ...actions,
  };
};

export { presetToast, useToastStack };
