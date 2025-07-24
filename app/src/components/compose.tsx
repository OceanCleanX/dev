import type { FC, PropsWithChildren, ReactNode } from "react";

const Compose: FC<
  PropsWithChildren<{
    components: FC<{ children: ReactNode }>[];
  }>
> = ({ children, components }) => (
  <>
    {components.reduceRight(
      (acc, Component) => (
        <Component>{acc}</Component>
      ),
      children,
    )}
  </>
);

export default Compose;
