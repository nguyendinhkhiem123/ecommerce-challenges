import cn from "classnames";
import React from "react";
import {
  FormControl,
  IFormControlProps,
  getBaseFieldClassName,
} from "../FormControl";



export type IBaseTextFieldProps = IFormControlProps & {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  type?: "text" | "number" | "password";
  errorMessage: string | undefined;
  value: string | number;
  onChangeValue?: (value: string | number) => void;
};

const BaseTextField: React.FC<IBaseTextFieldProps> = ({

  className = "",
  inputClassName = "",
  placeholder,
  type = "text",
  errorMessage,
  value,
  onChangeValue,
  ...formControlProps
}) => {
  return (
    <FormControl
      className={className}
      errorMessage={errorMessage}
      label={formControlProps.label}
      {...formControlProps}
    >
      <div className="relative flex w-full">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(
            getBaseFieldClassName({ isError: !!errorMessage }),
            inputClassName
          )}
          onChange={(e) => {
            onChangeValue?.(e.target.value);
          }}
        />
      </div>
    </FormControl>
  );
};

export default BaseTextField;
