import { PATH } from "@/common/constants/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRerender } from "./useRerender";

export const useAuth = () => {
  const { rerender } = useRerender();
  const nav = useNavigate();
  useEffect(() => {
    auth.onUpdate(() => {
      rerender();
    });
    auth.onLogout(() => {
      nav(PATH.LOGIN);
    });
  }, []);
  return {
    isAuth: auth.isAuth,
    loading: auth.loading,
    userProfile: auth.userProfile,
  };
};
