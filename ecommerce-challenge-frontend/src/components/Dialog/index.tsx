import { Dialog as DialogUI, Transition } from "@headlessui/react";
import cn from "classnames";
import React, {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import { _ActionButtons } from "./ActionButton";
import { _ButtonAccept, _ButtonCancel, _ButtonDanger } from "./Buttons";
import { _DialogContent } from "./Content";
import { _DialogHeader } from "./Header";

export type IDialogSize = "sm" | "md" | "lg"

const sizes: Record<IDialogSize, string> = {
  sm: cn(" w-full max-w-[300px]"),
  md: cn(" w-full max-w-phone"),
  lg: cn(" w-full max-w-laptop"),
};
export interface IDialogProps {
  open: boolean | undefined;
  onClose: () => void;
  className?: string;
  size?: IDialogSize;
}

const DialogContext = createContext<{ closeDialog?: () => void }>({});
export const useDialogContext = () => useContext(DialogContext);

const DialogRoot: React.FC<PropsWithChildren<IDialogProps>> = (
  props
): JSX.Element => {
  const { children, className = "", open, size = "md", onClose } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <DialogContext.Provider
      value={{
        closeDialog: handleClose,
      }}
    >
      <Transition show={open} as={Fragment}>
        <DialogUI as="div" className="relative z-100" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="min-h-full p-2 text-center center-children">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogUI.Panel
                  className={cn(
                    "inline-block bg-white relative overflow-y-auto text-left align-middle rounded-lg shadow-lg",
                    sizes[size],
                    className
                  )}
                  style={{ maxHeight: "calc(100vh - 40px)" }}
                >
                  {children}
                </DialogUI.Panel>
              </Transition.Child>
            </div>
          </div>
        </DialogUI>
      </Transition>
    </DialogContext.Provider>
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Header: _DialogHeader,
  Content: _DialogContent,
  ActionButtons: _ActionButtons,
  ButtonAccept: _ButtonAccept,
  ButtonDanger: _ButtonDanger,
  ButtonCancel: _ButtonCancel,
});
