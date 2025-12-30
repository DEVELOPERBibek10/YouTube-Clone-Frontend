import { useLogout } from "@/Hooks/useLogout";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
// import { Button } from "../ui/button";
// import { Oval } from "react-loader-spinner";
import {
  childVarient,
  menuItems,
  parentVarient,
  sidebarVarient,
} from "@/constants/sidebar.constants";
import { LogOut, Menu } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { mutateAsync: logoutUser, isPending: isLoggingOut } = useLogout();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const logout = await logoutUser();
      if (!logout?.data.success || logout.data.statusCode === 204) {
        throw new Error(
          logout?.data.message || "Error occured while logging out user!"
        );
      }
      localStorage.setItem("isAuth", "false");
      if (!isLoggingOut) navigate("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }
      console.error(error);
    }
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "close"}
      transition={{
        duration: 1,
      }}
      className="flex justify-center h-screen bg-background fixed"
    >
      <motion.nav
        variants={sidebarVarient}
        className={`bg-sidebar text-sidebar-foreground no-scrollbar flex flex-col shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]`}
      >
        {/* Header with toggle button */}
        <div
          className={`flex items-center h-15 w-full justify-center gap-8 shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]`}
        >
          <button onClick={toggleSidebar} aria-label="Toggle sidebar">
            <motion.div
              className={`w-12 h-12 ${
                isOpen ? "fixed left-4 top-2" : "fixed left-4 top-2"
              } flex justify-center items-center`}
            >
              <Menu color="gray" strokeWidth={3} className="w-6 h-6" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  translateX: 110,
                  scale: 1,
                }}
                className={`w-full h-full flex gap-5 items-center mt-1.5`}
              >
                <Logo iconSize={30} fontSize="text-xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu items */}
        <motion.ul
          variants={parentVarient}
          initial={false}
          animate={isOpen ? "open" : "close"}
          className="flex-1 overflow-y-auto p-4 space-y-2"
        >
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              variants={childVarient}
              className={`flex items-center ${
                isOpen ? "justify-start" : "justify-center"
              }  gap-5 w-full h-12 hover:bg-sidebar-accent px-4 mx-auto rounded-full`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.li>
          ))}
        </motion.ul>
        <div className="w-full px-3">
          <Button
            onClick={handleLogOut}
            className="w-full mb-2 h-10 cursor-pointer"
          >
            <LogOut className="size-full" />
          </Button>
        </div>
      </motion.nav>
    </motion.div>
  );
};

export default Sidebar;
