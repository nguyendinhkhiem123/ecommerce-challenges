import { useField, useFormikContext } from "formik";
import React from "react";
import BaseUploadImage, { IBaseUploadImageProps } from "./BaseUploadImage";

export interface IUploadImageProps
  extends Omit<
    IBaseUploadImageProps,
    "onChangeValue" |  "value" | "errorMessage"
  > {
  name: string;
  required?: boolean;
}

const UploadImage: React.FC<IUploadImageProps> = ({
  name,
  required = false,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseUploadImage
      onChangeValue={(text) => setFieldValue(name, text)}
      value={field.value}
      errorMessage={isError ? meta?.error : ""}
      required={required}
      {...rest}
    />
  );
};

export default UploadImage;
