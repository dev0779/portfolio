import * as PhosphorIcons from "phosphor-react";
import type { IconProps as PhosphorIconProps } from "phosphor-react";
import { useState } from "react";

interface IconProps {
  name: keyof typeof PhosphorIcons;
  size?: number;
  color?: string;
  hoverColor?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill";
  className?: string;
  onClick?: () => void;
  onMouseEnter?: React.MouseEventHandler<SVGSVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGSVGElement>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "black",
  hoverColor,
  weight = "regular",
  className,
  onClick,
}: IconProps) => {
  const IconComponent = PhosphorIcons[name] as React.FC<PhosphorIconProps>;
  const [hovered, setHovered] = useState(false);

  if (!IconComponent) return null;
  return (
    <IconComponent
      size={size}
      color={hovered && hoverColor ? hoverColor : color}
      weight={weight}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};
