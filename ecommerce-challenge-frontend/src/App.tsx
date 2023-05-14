import { useAuth } from "@/hooks/useAuth";
import Routes from "@/routes";
import { useEffect } from "react";

function App() {
  const { isAuth } = useAuth();
  useEffect(() => {
    if (isAuth) {
      auth.getYourProfile();
    }
  }, [isAuth]);
  return <Routes />;
}

export default App;
