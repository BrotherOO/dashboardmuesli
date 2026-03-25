import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-all active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "h-10 px-6 py-2",
          variant === "default" && "bg-background text-foreground shadow-neu-button hover:shadow-neu-flat active:shadow-neu-pressed",
          variant === "primary" && "bg-primary text-primary-foreground shadow-neu-button hover:opacity-90 active:shadow-neu-pressed border border-white/20",
          variant === "ghost" && "hover:bg-black/5 active:bg-black/10 text-foreground",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
