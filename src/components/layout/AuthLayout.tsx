import { useGetCurrentUser } from "@/Hooks/useGetCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  if (isLoading) return <div>...Loading</div>;
  if (currentUser?.data?.success) {
    localStorage.setItem("isAuth", "true");
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;
