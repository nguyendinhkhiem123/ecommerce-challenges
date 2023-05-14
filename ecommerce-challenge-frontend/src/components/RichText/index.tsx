import { useField, useFormikContext } from "formik";
import React from "react";
import BaseRichText, { IBaseRichTextProps } from "./BaseRichText";

export interface IRichTextProps
  extends Omit<
    IBaseRichTextProps,
    "onChangeValue" | "initHtml" | "errorMessage"
  > {
  name: string;
  required?: boolean;
}

const RichText: React.FC<IRichTextProps> = ({
  name,
  required = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseRichText
      onChangeValue={(text) => setFieldValue(name, text)}
      initHtml={field.value}
      errorMessage={isError ? meta?.error : ""}
      required={required}
      {...rest}
    />
  );
};

export default RichText;
