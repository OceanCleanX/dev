import type { FC, PropsWithChildren } from "react";

const InfoRoot: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <div className="h-full px-6 py-4 flex flex-col space-y-3">
    <h2 className="uppercase font-extralight tracking-wider text-[0.95rem] text-[#A4F6F2]">
      {title}
    </h2>
    <div className="grow-1 basis-1 min-h-0 overflow-y-auto space-y-2.5">
      {children}
    </div>
  </div>
);

const InfoItem: FC<PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => (
  <div className="text-white font-[250] tracking-wide flex justify-between items-center">
    <span className="text-[1.1rem]">{name}</span>
    <span className="">{children}</span>
  </div>
);

const Info = {
  Root: InfoRoot,
  Item: InfoItem,
};

export { Info };
