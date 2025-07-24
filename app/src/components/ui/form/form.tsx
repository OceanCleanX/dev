import { forwardRef } from "react";

import cn from "@/lib/cn";

import type { ComponentPropsWithoutRef } from "react";

const Form = forwardRef<HTMLFormElement, ComponentPropsWithoutRef<"form">>(
  ({ className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn("flex flex-col space-y-3", className)}
      {...props}
    />
  ),
);
Form.displayName = "Form";

export default Form;
