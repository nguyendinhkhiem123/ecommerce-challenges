import React from "react";

import { Transition } from "@headlessui/react";
import cn from "classnames";
import EventEmitter from "events";
import { Fragment, useEffect, useState } from "react";
import { IconButton } from "../IconButton";
import { CloseIcon, InfoIcon } from "./icons";

export type IAlertBarType = "info" | "error" | "warning" | "success";

export interface IAlertBarPayload {
  type: IAlertBarType;
  message: React.ReactNode | null;
}

export interface IAlertBarProps {
  id: string;
  className?: string;
}

const eventManager = new EventEmitter();

const getNameEventById = (id: string) => `alert-bar-${id}`;

export const alertBar = (id: string, payload: IAlertBarPayload) => {
  eventManager.emit(getNameEventById(id), payload);
};

const typeClasses: Record<IAlertBarType, string> = /*tw*/ {
  info: "text-blue-700 bg-blue-100",
  error: "text-red-600 bg-red-100",
  success: "text-green-700 bg-green-100",
  warning: "text-yellow-600 bg-yellow-200",
};

const titleClasses: Record<IAlertBarType, string> = /*tw*/ {
  info: "Thông tin",
  error: "Xảy ra lỗi",
  success: "Thành công",
  warning: "Cảnh báo",
};

export const AlertBar: React.FC<IAlertBarProps> = ({ id, className = "" }) => {
  const [payload, setPayload] = useState<IAlertBarPayload | null>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    eventManager.on(getNameEventById(id), (payload) => {
      if (!payload?.message) {
        handleClose();
      } else {
        setIsShow(true);
        setPayload(payload);
      }
    });
  }, []);

  const { type = "success" } = payload || {};

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      setPayload(null);
    }, 200);
  };

  return (
    <Transition
      show={isShow}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition ease-out duration-100"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div
        className={cn(
          "flex px-1 py-1 my-1 font-semibold rounded-lg",
          typeClasses[type],
          className
        )}
      >
        <div>
          <InfoIcon className="flex-shrink-0 mr-1 w-2.5 h-2.5" />
        </div>
        <div>
          <p className="font-bold uppercase text-md">{titleClasses[type]}</p>
          <h5 className="text-md">{payload?.message}</h5>
        </div>
        <IconButton
          onClick={handleClose}
          className="ml-auto mr-0 hover:bg-opacity-60"
        >
          <CloseIcon className="flex-shrink-0 w-2.5 h-2.5" />
        </IconButton>
      </div>
    </Transition>
  );
};
