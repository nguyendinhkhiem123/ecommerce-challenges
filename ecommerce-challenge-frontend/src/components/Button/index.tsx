import cn from "classnames";
import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import Spinner from "../Spinner";

export type IButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "text";
export type IButtonSize = "sm" | "md" | "lg";

export type IButtonProps = ButtonHTMLAttributes<any> & {
  variant?: IButtonVariant;
  size?: IButtonSize;
  className?: string;
  loading?: boolean;
  icon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClasses: Record<IButtonVariant, string> =  {
  primary: cn(
    "bg-primary-500 active:bg-none text-primary-900 active:bg-primary-600 shadow-sm",
    "disabled:bg-primary-300 disabled:bg-none"
  ),
  secondary: cn(
    "text-white active:bg-gray-900 bg-gray-700 shadow-sm",
    "disabled:bg-gray-300"
  ),
  danger: cn(
    "bg-red-600 active:bg-red-700 text-white shadow-sm ",
    "disabled:bg-red-300"
  ),
  outline: cn(
    "border border-primary-600 active:bg-gray-100 text-primary-600 bg-white",
    "disabled:border-gray-300 disabled:text-gray-300"
  ),
  text: cn(
    "text-primary-800",
    "active:bg-primary-100",
    "disabled:text-gray-400"
  ),
};

const variantSizes: Record<IButtonSize, string> = /*tw*/ {
  sm: cn(" px-[12px] py-[8px] text-sm "),
  md: cn(" px-2 py-[9px] text-md"),
  lg: cn(" px-2 py-[9px] text-lg"),
};

const Button: React.FC<PropsWithChildren<IButtonProps>> = ({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  icon = null,
  rightIcon = null,
  loading = false,
  ...rest
}) => {
  return (
    <button
      className={cn(
        "text-primary-600 group relative text-sm font-semibold rounded-lg outline-offset-4 disabled:shadow-transparent",
        variantClasses[variant],
        variantSizes[size],
        className
      )}
      type={type}
      {...rest}
    >
      <div
        className={cn(
          loading && "text-transparent",
          (icon || rightIcon) && "center-children gap-1"
        )}
      >
        {icon}
        {children}
        {rightIcon}
      </div>
      {loading && (
        <div className="absolute move-center">
          <Spinner size={20} />
        </div>
      )}
    </button>
  );
};

export default Button;
