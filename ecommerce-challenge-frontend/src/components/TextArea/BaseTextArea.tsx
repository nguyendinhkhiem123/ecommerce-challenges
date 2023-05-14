import cn from "classnames";
import React from "react";
import {
  FormControl,
  IFormControlProps,
  getBaseFieldClassName,
} from "../FormControl";

export type IBaseTextAreaProps = IFormControlProps & {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  errorMessage: string | undefined;
  value: string | number;
  onChangeValue?: (value: string | number) => void;
};

const BaseTextArea: React.FC<IBaseTextAreaProps> = ({
  className = "",
  inputClassName = "",
  placeholder,
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
      <textarea
        value={value}
        placeholder={placeholder}
        className={cn(
          getBaseFieldClassName({ isError: !!errorMessage }),
          "min-h-[200px] p-1",
          inputClassName
        )}
        onChange={(e) => {
          onChangeValue?.(e.target.value);
        }}
      />
    </FormControl>
  );
};

export default BaseTextArea;
