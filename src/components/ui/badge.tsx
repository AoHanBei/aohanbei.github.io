import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border border-border bg-background/70 px-3 text-[0.68rem] font-medium uppercase tracking-[0.11em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
