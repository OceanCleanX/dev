import { forwardRef } from "react";

import cn from "@/lib/cn";

import type { ComponentPropsWithoutRef } from "react";

const Submit = forwardRef<
  HTMLButtonElement,
  Omit<ComponentPropsWithoutRef<"button">, "type" | "disabled"> & {
    loading?: boolean;
  }
>(({ className, children, loading = false, ...props }, ref) => (
  <button
    ref={ref}
    type="submit"
    disabled={loading}
    className={cn(
      "self-end inline-flex items-center me-0.5 bg-primary text-white text-sm rounded-lg px-5 py-1 hover:cursor-pointer disabled:hover:cursor-not-allowed",
      { "sepia-[25%] brightness-125 hue-rotate-15": loading },
      className,
    )}
    {...props}
  >
    {loading && (
      <svg
        className="inline size-3.5 mr-2 -ml-1.5 animate-spin"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )}
    {children}
  </button>
));
Submit.displayName = "Submit";

export default Submit;
