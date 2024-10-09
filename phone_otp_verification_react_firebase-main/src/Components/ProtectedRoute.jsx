import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../Hooks/useLocalStorage";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage("vikash");
  console.log("storedValue",storedValue)

  React.useEffect(() => {
    if (!storedValue) {
      navigate("/login");
    }
  }, [navigate,storedValue]);
  return <>{children}</>;
};

export default ProtectedRoute;
