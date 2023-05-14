import { PATH } from "@/common/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

export function withAuthorization<T>(Component: React.FC<T>) {
  return (props: T) => {
    const { isAuth } = useAuth();

    if (isAuth) return <Component {...(props as any)} />;
    return <Navigate to={PATH.LOGIN} />;
  };
}
