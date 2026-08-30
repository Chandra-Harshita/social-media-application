import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
