import type * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const stageVariants = cva("", {
  variants: {
    variant: {
      default: "text-white bg-black",
      pending: "text-stone-400 bg-stone-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface StageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stageVariants> {}

function Stage({ className, variant, ...props }: StageProps) {
  return (
    <div
      className={cn(
        stageVariants({ variant }),
        "h-16 w-16 border rounded-full",
        className
      )}
      {...props}
    >
      <div className={cn("flex justify-center items-center h-full")}>
        <CheckIcon className="h-7 w-7" />
      </div>
    </div>
  );
}

export { Stage };
