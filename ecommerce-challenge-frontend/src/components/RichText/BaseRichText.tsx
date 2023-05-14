import cn from "classnames";
import ReactQuill from "react-quill";

import { FormControl, IFormControlProps } from "../FormControl";
export interface IBaseRichTextProps extends IFormControlProps {
  initHtml: string;
  placeholder?: string;
  onChangeValue: (value: string) => void;
}
const BaseRichText: React.FC<IBaseRichTextProps> = ({
  initHtml,
  className,
  errorMessage,
  placeholder,
  onChangeValue,
  ...formControl
}) => {
  return (
    <FormControl
      errorMessage={errorMessage}
      {...formControl}
      className={cn("w-full", className)}
    >
      <ReactQuill
        value={initHtml}
        preserveWhitespace={false}
        onChange={(value) => {
          onChangeValue(value);
        }}
        placeholder={placeholder}
        className={cn(
          "border  border-solid border-gray-200 resize-y bg-white overflow-y-auto  block rounded-b-md w-full rounded-lg",
          "focus-within:border-blue-700 focus-within:ring-1 focus-within:ring-blue-700",
          !!errorMessage ? "border-red-500" : ""
        )}
        style={{
          height: 200,
        }}
      />
    </FormControl>
  );
};

export default BaseRichText;
