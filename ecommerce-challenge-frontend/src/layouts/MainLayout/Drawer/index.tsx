import Logo from "@/assets/image/logo.jpg";
import Divider from "@/components/Divider";
import { useAppSelector } from "@/hooks/useRedux";
import { _privateRoutes } from "@/routes/private.routes";
import cn from "classnames";
import { ReactNode } from "react";
import {
  Link,
  Location,
  Params,
  useLocation,
  useParams,
} from "react-router-dom";
import { LogOutIcon } from "../icons";

interface IDrawerProps {}

const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location;
  if (!Object.keys(params).length) {
    return pathname;
  }
  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};

const privateRoutesKey = Object.keys(_privateRoutes);
const Drawer: React.FC<IDrawerProps> = ({}) => {
  const location = useLocation();
  const params = useParams();
  const currPath = getRoutePath(location, params);
  const { isOpenDrawer } = useAppSelector((state) => state.config);

  const handleLogout = () => {
    auth.logout();
  };
  return (
    <>
      <div
        className={cn(
          "ml-2 my-1.5 z-40 rounded-xxl bg-white shadow-sm",
          "fixed left-0 bottom-0 top-0 text-md overflow-y-auto",
          isOpenDrawer && "overflow-hidden"
        )}
        style={{
          width: isOpenDrawer ? "250px" : "70px",
        }}
      >
        <div className="w-full p-2 center-children">
          <div className="flex items-center space-x-1 font-semibold text-md">
            <img
              className="rounded-lg"
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
            />
            {isOpenDrawer && <p>Challenges</p>}
          </div>
        </div>
        <Divider />
        <div className="px-1 mt-3">
          {privateRoutesKey.map((key) => {
            const { icon, path, title } = (_privateRoutes as any)[key];
            return (
              <Link to={path}>
                <DrawerButton
                  isActive={path === currPath}
                  icon={icon}
                  title={title}
                  isOpenDrawer={isOpenDrawer}
                />
              </Link>
            );
          })}
          <div className="cursor-pointer" onClick={handleLogout}>
            <DrawerButton
              isActive={false}
              icon={<LogOutIcon />}
              title={"Đăng xuất"}
              isOpenDrawer={isOpenDrawer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;

const DrawerButton: React.FC<{
  className?: string;
  isActive: boolean;
  icon?: ReactNode;
  title: string;
  isOpenDrawer: boolean;
}> = ({ className, isActive, icon, title, isOpenDrawer }) => {
  return (
    <a
      className={cn(
        "flex text-left duration-75 items-center w-full p-1.5 text-gray-400 rounded-lg",
        isActive
          ? "text-gray-900 bg-gray-100 font-semibold"
          : "hover:text-gray-900 hover:bg-gray-100 font-normal active:bg-gray-200",
        className
      )}
    >
      {icon && <div className="flex-shrink-0 w-2 h-2">{icon}</div>}
      {isOpenDrawer && <p className={cn("whitespace-nowrap pl-1")}>{title}</p>}
    </a>
  );
};
