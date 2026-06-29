import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
<<<<<<< HEAD
    <input
=======
    (<input
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
Input.displayName = "Input"

export { Input }
