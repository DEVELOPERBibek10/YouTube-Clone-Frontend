import { Home, Settings, User, LogOut } from "lucide-react";

const sidebarVarient = {
  open: {
    width: "16rem",
  },
  close: {
    width: "5rem",
  },
};

const childVarient = {
  open: {
    opacity: 1,
    y: 0,
  },
  close: {
    opacity: 1,
    y: -10,
  },
};

const parentVarient = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  close: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: LogOut, label: "Logout" },
];

export { sidebarVarient, childVarient, parentVarient, menuItems };
