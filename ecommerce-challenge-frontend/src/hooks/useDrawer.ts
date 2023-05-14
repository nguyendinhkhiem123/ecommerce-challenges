import { OPEN_DRAWER } from "@/common/constants/drawer";
import { setOpenDrawer } from "@/redux/slices/config";
import { useLayoutEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpenDrawer } = useAppSelector((state) => state.config);

  const [openDrawerStored, setOpenDrawerStored] = useLocalStorage<
    boolean | null
  >(OPEN_DRAWER, null);

  const toggleDrawer = () => {
    dispatch(setOpenDrawer(!isOpenDrawer));
    setOpenDrawerStored(!isOpenDrawer);
  };

  useLayoutEffect(() => {
    if (openDrawerStored !== null) dispatch(setOpenDrawer(openDrawerStored));
  }, [openDrawerStored]);

  return { isOpenDrawer, toggleDrawer };
};
