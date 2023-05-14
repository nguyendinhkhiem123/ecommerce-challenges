import { IconButton } from "@/components/IconButton";
import cn from "classnames";
import { PropsWithChildren } from "react";
import { useDialogContext } from "..";
import { CloseIcon } from "./icons";

export const _DialogHeader = ({
  className,
  title,
}: PropsWithChildren<{
  className?: string;
  title: string | undefined;
}>) => {
  const { closeDialog: onClose } = useDialogContext();

  return (
    <header
      className={cn(
        "relative flex flex-row items-center justify-between w-full px-2 py-1",
        "border-b border-solid border-gray-200  text-gray-900",
        className
      )}
    >
      <h1 className="font-bold text-xxl">{title}</h1>
      <IconButton
        className="text-gray-400 hover:text-gray-800"
        tooltip="Đóng"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </header>
  );
};
