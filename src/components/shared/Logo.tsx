import { CirclePlay } from "lucide-react";

const Logo = ({
  iconSize = 50,
  fontSize = "text-2xl",
}: {
  iconSize?: number;
  fontSize?: string;
}) => {
  return (
    <div className="flex w-full gap-1.5 items-center justify-center mb-1.5">
      <CirclePlay size={iconSize} color="#0000FF" />
      <div>
        <span className={`${fontSize} font-semibold`}>Vid</span>
        <span className={`${fontSize} font-semibold text-primary`}>Tube</span>
      </div>
    </div>
  );
};

export default Logo;
