import * as React from "react"
import { cn } from "../../lib/utils"

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-gray-900 text-white hover:bg-gray-700": variant === "default",
            "bg-transparent border border-gray-300 hover:bg-gray-100":
              variant === "outline",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3": size === "sm",
            "h-11 px-6": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
