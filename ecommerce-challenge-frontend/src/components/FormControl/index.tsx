import cn from "classnames";
import { PropsWithChildren } from "react";

export interface IFormControlProps {
  name?: string;
  label?: string | null;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage: string | undefined;

}

export const FormControl = ({
  label,
  className,
  required = false,
  disabled = false,
  children,
name = "",
  errorMessage,
}: PropsWithChildren<IFormControlProps>) => {
  const isError = !!errorMessage;

  return (
    <div
      className={cn(
        "font-medium relative block w-full",
        isError ? "text-red-500" : "text-gray-900",
        disabled && "pointer-events-none opacity-50 select-none",
        className
      )}
    >
      {label && (
        <label htmlFor={name } className={cn("text-md block font-semibold mb-0.5", className)}>
          {label}
          {required === false && (
            <span className="pl-1 font-light text-gray-700">(Tuỳ chọn)</span>
          )}
        </label>
      )}
      {children}
      {isError && <FormControl.Error  errorMessage={errorMessage || ""} />}
    </div>
  );
};

FormControl.Error = ({ errorMessage }: { errorMessage: string }) =>
  errorMessage ? <p className="text-sm pl-0.5" id={errorMessage}>{errorMessage}</p> : null;

export const getBaseFieldClassName = (args: {
  isError?: boolean;
  active?: boolean;
}) => {
  return cn(
    "w-full px-1 border border-solid border-gray-200 rounded-lg h-4 placeholder:text-md text-md placeholder:font-medium truncate",
    args.isError ? " bg-red-50" : " bg-gray-50",
    args.isError
      ? "placeholder-red-500 [&>.placeholder]:text-red-500"
      : " placeholder:text-gray-400  [&>.placeholder]:text-gray-500",
    " focus:ring-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1",
    args.active && "ring-blue-500 ring-1 border-blue-500",
    !!args.isError && "border-red-500"
  );
};
