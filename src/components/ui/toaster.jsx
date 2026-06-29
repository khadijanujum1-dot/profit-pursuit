<<<<<<< HEAD
"use client"

import { useToast } from "@/hooks/use-toast"
=======
import { useToast } from "@/components/ui/use-toast";
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
<<<<<<< HEAD
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
=======
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
<<<<<<< HEAD
}
=======
} 
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
