import cn from "classnames";
import React, { useState } from "react";
import { v4 } from "uuid";
import {
  FormControl,
  IFormControlProps,
  getBaseFieldClassName,
} from "../FormControl";



export type IBaseUploadImageProps = IFormControlProps & {
  defaultValue?: string;
  className?: string;
  errorMessage: string | undefined;
  value: string;
  onChangeValue?: (value: string) => void;
};

const BaseUploadImage: React.FC<IBaseUploadImageProps> = ({
  defaultValue,
  className = "",
  errorMessage,
  value,
  onChangeValue,
  ...formControlProps
}) => {
  const [id] = useState(v4());

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        onChangeValue?.(reader?.result as string);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <FormControl
      className={className}
      errorMessage={errorMessage}
      label={formControlProps.label}
      {...formControlProps}
    >
      <div className="relative flex w-full">
        <input
          defaultValue={defaultValue}
          type="file"
          onChange={(e) => {
            handleUploadImage(e);
          }}
          className="hidden"
          accept="image/*"
          id={id}
        />
        <label htmlFor={id} className="w-full group cursor-pointer">
          <div
            className={cn(
              getBaseFieldClassName({ isError: !!errorMessage }),
              "!h-15 border-dashed  w-full group-hover:border-blue-500 group-hover:border-solid group-hover:border-2"
            )}
          >
            {value ? (
              <div className="w-15 h-full  mx-auto flex items-center ">
                <img src={value} className="w-full h-full" />
                <div className="absolute inset-0 bg-gray-200/60 group-hover:block hidden rounded-lg">
                  <div className="w-40 h-full  mx-auto  flex items-center text-blue-700">
                    <div className="text-center w-full">
                      <div className="font-semibold">
                        <p className="inline-block rounded-lg py-[2px] px-0.5 bg-blue-100">
                          Thêm ảnh
                        </p>{" "}
                        <p className="inline-block">Bấm chọn</p>
                      </div>
                      <p className="text-sm text-gray-700">
                        các ảnh có định dạng JPEG, JPG, PNG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-40 h-full  mx-auto  flex items-center text-blue-700">
                  <div className="text-center w-full">
                    <div className="font-semibold">
                      <p className="inline-block rounded-lg py-[2px] px-0.5 bg-blue-100">
                        Thêm ảnh
                      </p>{" "}
                      <p className="inline-block">Bấm chọn hoặc thả ảnh vào</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Cho phép upload các ảnh có định dạng JPEG, JPG, PNG
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </label>
      </div>
    </FormControl>
  );
};

export default BaseUploadImage;
