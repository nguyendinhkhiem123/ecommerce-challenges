import { FormikProps } from "formik";
import { ReactNode } from "react";
export interface IFormDialogPayload<T> {
  title: string;
  initValues: T;
  component: (value: FormikProps<T>) => ReactNode;
  onSubmit: (value: T) => void;
  yup?: any;
}
