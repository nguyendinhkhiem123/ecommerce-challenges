import BackgroundImage from "@/assets/image/background.jpg";
import { IconButton } from "@/components/IconButton";
import { useDrawer } from "@/hooks/useDrawer";
import cn from "classnames";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import { HamburgerIcon } from "./icons";

interface IMainLayoutProps {}
const MainLayout: React.FC<IMainLayoutProps> = () => {
  const { isOpenDrawer, toggleDrawer } = useDrawer();
  return (
    <div className="relative flex min-h-screen h-full bg-gray-100">
      <div className="absolute z-0 w-full h-30">
        <div className="absolute inset-0 w-full h-full bg-primary-600/40"></div>
        <img
          src={BackgroundImage}
          alt="background-image"
          className="object-cover w-full h-full"
        />
      </div>
      <Drawer />
      <div
        className={cn(
          "w-full z-10 px-2 pt-1.5 pb-5",
          isOpenDrawer ? "ml-27" : "ml-10"
        )}
      >
        <IconButton
          className="hover:bg-primary-600"
          onClick={() => {
            toggleDrawer();
          }}
        >
          <HamburgerIcon className="text-white" />
        </IconButton>
        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
