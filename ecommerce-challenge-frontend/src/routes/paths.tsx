import { convertToListRoutes } from "@/utils/route.utils";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { PATH } from "../common/constants/routes";
import MainLayout from "../layouts/MainLayout";
import { _privateRoutes } from "./private.routes";
import { _publicRoutes } from "./public.routes";

export const _paths = {
  ..._privateRoutes,
  ..._publicRoutes,
};

export const privateRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    ...convertToListRoutes(_privateRoutes),
    {
      path: "/",
      element: <Navigate to={PATH.USERS} />,
    },
  ],
};

export const publicRoutes: RouteObject = {
  path: "/",
  element: <Outlet />,
  children: convertToListRoutes(_publicRoutes),
};
