import cn from "classnames";
import { PropsWithChildren } from "react";

export const _DialogContent = ({
  children,
  className = "",
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <main
      className={cn(
        "w-full text-md font-normal text-gray-600 px-2 my-2 ",
        className
      )}
    >
      {children}
    </main>
  );
};
