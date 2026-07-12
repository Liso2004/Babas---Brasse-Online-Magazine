import { forwardRef } from "react";
import { cn } from "./utils.js";

export const Input = forwardRef(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
