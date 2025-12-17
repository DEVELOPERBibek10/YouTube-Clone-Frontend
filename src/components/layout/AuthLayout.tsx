import type { RootState } from "@/lib/Redux/store";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
      </>
    );
  }
};

export default AuthLayout;
