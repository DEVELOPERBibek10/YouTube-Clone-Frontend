import { useGetCurrentUser } from "@/Hooks/useGetCurrentUser";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  if (isLoading) return <div>...Loading</div>;

  if (!currentUser?.data?.success) {
    return <Navigate to={"/sign-in"} />;
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
