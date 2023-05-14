import cn from "classnames";
import React from "react";
import Spinner from "../Spinner";
import Tooltip from "../Tooltip";

type IButtonProps = React.HTMLAttributes<HTMLButtonElement>;

interface IIConButton extends IButtonProps {
  className?: string;
  loading?: boolean;
  tooltip?: string;
}

export const IconButton: React.FC<IIConButton> = (props) => {
  const { children, loading = false, className = "", tooltip, ...rest } = props;
  return (
    <Tooltip tooltip={tooltip as string} place="bottom">
      <button
        className={cn(
          "relative flex-shrink-0 group focus:outline-none  cursor-pointer select-none",
          "w-3.5 h-3.5  rounded-lg",
          "text-gray-600",
          "disabled:opacity-40",
          "hover:bg-gray-100 ",
          className
        )}
        {...rest}
      >
        <div className={cn("z-10", "w-full h-full center-children")}>
          {!loading ? children : <Spinner size={20} />}
        </div>
      </button>
    </Tooltip>
  );
};
