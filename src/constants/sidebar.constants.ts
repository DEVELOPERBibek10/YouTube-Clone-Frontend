import {
  CircleUserRound,
  History,
  Home,
  ListVideo,
  Play,
  Settings,
  SquarePlay,
  ThumbsUp,
} from "lucide-react";

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
      delayChildren: 0,
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
  { icon: CircleUserRound, label: "You" },
  { icon: SquarePlay, label: "Subscriptions" },
  { icon: History, label: "History" },
  { icon: ThumbsUp, label: "Liked" },
  { icon: ListVideo, label: "Playlists" },
  { icon: Play, label: "Owned" },
  { icon: Settings, label: "Settings" },
];

export { sidebarVarient, childVarient, parentVarient, menuItems };
