import { motion } from "motion/react";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "close"}
      transition={{
        duration: 0.5,
      }}
      className="flex h-screen bg-background w-[15%]"
    >
      <motion.nav className="flex flex-col w-full items-center gap-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05),0px_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]">
        Hello
      </motion.nav>
    </motion.div>
  );
};

export default Sidebar;
