import { useField, useFormikContext } from "formik";
import React from "react";
import BaseTextField, { IBaseTextFieldProps } from "./BaseTextField";

export interface ITextFieldProps
  extends Omit<IBaseTextFieldProps, "onChangeValue" | "value" | "errorMessage"> {
  name: string;
  required?: boolean;
}

const TextField: React.FC<ITextFieldProps> = ({
  name,
  required = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseTextField
      onChangeValue={(text) => setFieldValue(name, text)}
      value={field.value}
      errorMessage={isError ? meta?.error : ""}
      required={required}
      {...rest}
    />
  );
};

export default TextField;
