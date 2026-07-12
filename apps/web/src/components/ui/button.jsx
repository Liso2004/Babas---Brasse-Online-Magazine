import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils.js";

export const buttonVariants = cva("inline-flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default: "bg-black text-white hover:bg-neutral-800",
      outline: "border border-neutral-300 bg-white text-neutral-900",
      ghost: "bg-transparent text-neutral-800 hover:bg-neutral-100"
    },
    size: {
      default: "h-10 px-4",
      sm: "h-9 px-3",
      icon: "h-10 w-10 p-0"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});

export const Button = forwardRef(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
