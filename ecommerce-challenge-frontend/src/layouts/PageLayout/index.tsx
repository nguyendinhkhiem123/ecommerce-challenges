import cn from "classnames";
import { PropsWithChildren, ReactNode } from "react";

export interface IPageLayoutProps {
  title: string;
  desc?: string;
  topRightButtons?: ReactNode;
  className?: string;
}

const PageLayout = ({
  className,
  title,
  desc,
  topRightButtons,
  children,
}: PropsWithChildren<IPageLayoutProps>) => {
  return (
    <div
      className={cn("w-full bg-white pt-2 shadow-md rounded-xxl", className)}
    >
      <div className="flex w-full px-2">
        <div className="w-1/2">
          <h1 className="font-medium text-xxl">{title}</h1>
          {desc && (
            <p className="font-light text-gray-700 whitespace-pre-line text-md">
              {desc}
            </p>
          )}
        </div>
        {topRightButtons && (
          <div className="flex justify-end h-4 w-fit space-x-0.5 flex-shrink-0 ml-auto mr-0">
            {topRightButtons}
          </div>
        )}
      </div>
      <div className="mt-4 pb-1.5">{children}</div>
    </div>
  );
};

PageLayout.Container = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("px-2 py-1", className)}>{children}</div>;
};

export default PageLayout;
