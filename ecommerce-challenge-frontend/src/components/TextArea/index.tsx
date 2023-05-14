import { useField, useFormikContext } from "formik";
import React from "react";
import BaseTextArea, { IBaseTextAreaProps } from "./BaseTextArea";

export interface ITextAreaProps
  extends Omit<
    IBaseTextAreaProps,
    "onChangeValue" | "value" | "errorMessage"
  > {
  name: string;
  required?: boolean;
}

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  required = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseTextArea
      onChangeValue={(text) => setFieldValue(name, text)}
      value={field.value}
      errorMessage={isError ? meta?.error : ""}
      required={required}
      {...rest}
    />
  );
};

export default TextArea;
