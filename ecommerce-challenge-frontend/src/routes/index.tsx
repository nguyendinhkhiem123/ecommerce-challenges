import { useRoutes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./paths";

const Routes = () => {
  return useRoutes([privateRoutes, publicRoutes]);
};

export default Routes;
