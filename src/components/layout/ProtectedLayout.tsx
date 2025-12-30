import { useGetCurrentUser } from "@/Hooks/useGetCurrentUser";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import { useState } from "react";

const ProtectedLayout = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <div>...Loading</div>;

  if (!currentUser || isError) {
    localStorage.setItem("isAuth", "false");
    return <Navigate to={"/sign-in"} replace />;
  }

  return (
    <>
      <section className="min-h-screen w-full flex gap-12">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> <Outlet />
      </section>
    </>
  );
};

export default ProtectedLayout;
