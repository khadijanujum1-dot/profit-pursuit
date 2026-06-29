import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
<<<<<<< HEAD
    <textarea
=======
    (<textarea
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
<<<<<<< HEAD
      {...props} />
=======
      {...props} />)
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
