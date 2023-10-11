import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-color focus:outline-none foucs:ring-2 focus:ring-state-400 fous:ring-offset-2 disabled:opacity-50 disabled:pointer-event-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-slate-800",
        ghost: "bg-transparent  hover:text-black hover:bg-slate-200",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-2 px-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoadading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoadading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoadading}
      {...props}
    >
      {isLoadading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
      {children}
    </button>
  );
};

export default Button;
