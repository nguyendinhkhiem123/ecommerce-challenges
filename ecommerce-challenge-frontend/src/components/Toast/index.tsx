import React, { PropsWithChildren } from "react";
import { ToastBar, Toaster, toast } from "react-hot-toast";
import { IconButton } from "../IconButton";

export { toast } from "react-hot-toast";

const Toasts: React.FC<PropsWithChildren> = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        success: {
          duration: 4000,
        },
        error: {
          duration: 4000,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center">
              <div className="flex-shrink-0">{icon}</div>
              <div className="flex items-center">{message}</div>
              <IconButton
                onClick={() => toast.dismiss(t.id)}
                className="flex-shrink-0"
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export const CloseIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="icon-sm"
  >
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

export default Toasts;
