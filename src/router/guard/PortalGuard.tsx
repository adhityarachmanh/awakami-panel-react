import { Navigate } from "react-router-dom";
import { useRootSelector } from "@/stores";

const PortalGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useRootSelector((state) => state.auth);
  return !auth.isAuthenticated ? <Navigate to="/login" /> : children;
};

export default PortalGuard;
