import type { RootState } from "@/lib/Redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }
  return <div>ProtectedLayout</div>;
};

export default ProtectedLayout;
