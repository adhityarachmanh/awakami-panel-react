import { Navigate } from "react-router-dom";
import { useRootSelector } from "@/stores";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useRootSelector((state) => state.auth);
  return auth.isAuthenticated ? <Navigate to="/portal" /> : children;
};

export default PublicRoute;
