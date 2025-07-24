import { forwardRef } from "react";

import cn from "@/lib/cn";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & {
    label: string;
    errorMsg?: string;
    subText?: ReactNode;
  }
>(({ label: name, id = name, className, errorMsg, subText, ...props }, ref) => (
  <div className="flex flex-col space-y-0.5 font-light">
    <span className="flex items-center justify-between">
      <label htmlFor={id} className="text-[#808080] text-xs">
        {name}
      </label>
      {errorMsg && <span className="text-red-700 text-xs">{errorMsg}</span>}
    </span>
    <input
      id={id}
      ref={ref}
      className={cn(
        "bg-[#DDE8ED] px-2 py-1 text-sm focus:outline-0",
        className,
      )}
      {...props}
    />
    {subText && <span className="mt-0.5 text-[0.65rem]">{subText}</span>}
  </div>
));
Input.displayName = "Input";

export default Input;
