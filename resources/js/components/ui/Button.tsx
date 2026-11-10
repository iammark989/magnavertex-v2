import type { ReactNode, ButtonHTMLAttributes  } from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost";

type ButtonSize =
    | "sm"
    | "md"
    | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
}

const variantClasses = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: 'border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white',
    ghost: 'text-slate-700 hover:bg-slate-100',
};

const sizeClasses = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 px-5 text-base',
    lg: 'h-12 px-8 text-lg',
};

const baseClasses =
    "active:scale-[0.98] cursor-pointer inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed";
 

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {



const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
].join(" ");
   
    return (
        <button
         className={buttonClasses}
        {...props}
        >
            {children}
        </button>
    );
}