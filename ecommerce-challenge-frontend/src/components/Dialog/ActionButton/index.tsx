import cn from "classnames";
import { PropsWithChildren } from "react";

export const _ActionButtons = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "flex bg-gray-50 rounded-b-lg border-t  border-solid border-gray-200 px-2 py-1 flex-row justify-end w-full gap-1 ",
        className
      )}
    >
      {children}
    </div>
  );
};
