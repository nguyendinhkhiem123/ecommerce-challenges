import { PATH } from "@/common/constants/routes";
import LoginPage from "@/page/Login";
import Register from "@/page/Register";
export const _publicRoutes = {
  Login: { path: PATH.LOGIN, element: <LoginPage /> },
  Register: { path: PATH.REGISTER, element: <Register /> },
};
