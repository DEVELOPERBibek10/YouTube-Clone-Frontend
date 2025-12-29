import { useGetCurrentUser } from "@/Hooks/useGetCurrentUser";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUser();

  if (isLoading) return <div>...Loading</div>;

  if (!currentUser || isError) {
    localStorage.setItem("isAuth", "false");
    return <Navigate to={"/sign-in"} replace />;
  }

  return (
    <>
      <section className="min-h-screen w-full">
        <Outlet />
      </section>
    </>
  );
};

export default ProtectedLayout;
