import type { FC, PropsWithChildren, ReactNode } from "react";

type FCWithChild = FC<{ children: ReactNode }>;

const Compose: FC<
  PropsWithChildren<{
    components: (
      | FCWithChild
      | [component: FCWithChild, props: Record<string, unknown>]
    )[];
  }>
> = ({ children, components }) => (
  <>
    {components.reduceRight((acc, item) => {
      const [Component, props] = typeof item === "function" ? [item, {}] : item;
      return <Component {...props}>{acc}</Component>;
    }, children)}
  </>
);

export default Compose;
