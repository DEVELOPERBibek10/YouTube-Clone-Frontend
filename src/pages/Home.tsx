import { Button } from "@/components/ui/button";
import { useLogout } from "@/Hooks/useLogout";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router";

const Home = () => {
  const { mutateAsync: logoutUser, isPending: isLoggingOut } = useLogout();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const logout = await logoutUser();
      if (!logout?.data?.success || logout.status === 204) {
        throw new Error(
          logout.data.message || "Error occured while logging out user!"
        );
      }
      if (!isLoggingOut) navigate("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={handleLogOut}>
        Logout
        {isLoggingOut && (
          <Oval
            height={20}
            width={20}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </Button>
    </div>
  );
};

export default Home;
