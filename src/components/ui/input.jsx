import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm outline-none transition",

        // Border + text
        "border-slate-300 text-slate-900 placeholder:text-slate-400",

        // Focus (MUI-like blue)
        "focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30",

        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",

        // Error state
        "aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/30",

        className
      )}
      {...props}
    />
  );
}

export { Input };
