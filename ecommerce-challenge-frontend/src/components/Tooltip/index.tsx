import React, { cloneElement, isValidElement, PropsWithChildren } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

export interface ITooltipProps extends PropsWithChildren {
  tooltip: string | number;
  place?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<ITooltipProps> = ({
  children,
  tooltip,
  place = "bottom",
}) => {
  if (!isValidElement(children)) return null;
  if (!tooltip) return children;

  const id = uuidv4();

  const attributes = {
    "data-tooltip-id": id,
    "data-tooltip-content": tooltip,
  };
  return (
    <>
      {cloneElement(children, {
        ...attributes,
      })}
      <ReactTooltip
        id={id}
        place={place}
        className="font-light py-0.5 px-1 z-100"
      />
    </>
  );
};

export default Tooltip;
