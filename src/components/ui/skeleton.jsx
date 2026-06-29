import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
<<<<<<< HEAD
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props} />
=======
    (<div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props} />)
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
  );
}

export { Skeleton }
