import cn from "classnames";
import { PropsWithChildren } from "react";

const Skeleton: React.FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("bg-gray-100 rounded-lg animate-pulse", className)}>
      {children}
    </div>
  );
};

export default Skeleton