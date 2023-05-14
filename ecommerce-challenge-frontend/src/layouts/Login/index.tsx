import { ReactNode } from "react";
import { AuthIcon } from "./icons";

interface ILoginLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const LoginLayout: React.FC<ILoginLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center bg-primary-100">
        <AuthIcon className="w-45 h-full" />
      </div>
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="w-2/3">
          <div className="mb-3 w-full">
            <p className="font-bold w-full text-4xl">{title}</p>
            <p className="text-gray-500 font-light">{description}</p>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
