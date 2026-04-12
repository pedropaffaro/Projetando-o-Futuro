import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", ...props }, ref) => {
    
    // Base brutalista: borda, fonte extra bold maiúscula
    const baseStyles = "inline-flex items-center justify-center font-extrabold uppercase py-3 px-6 transition-all cursor-pointer focus:outline-none"
    
    // Variações de estilo adequadas ao Home.tsx
    const variants = {
      solid: "bg-green-primary text-black border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      outline: "bg-white text-black border-[3px] border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
      ghost: "bg-transparent text-black border-[3px] border-transparent hover:border-black hover:bg-gray-100",
    }
    
    const variantStyles = variants[variant] || variants.solid

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
