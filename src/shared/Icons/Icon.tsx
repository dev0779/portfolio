import * as PhosphorIcons from "phosphor-react";
import type { IconProps as PhosphorIconProps } from "phosphor-react";

interface IconProps {
  name: keyof typeof PhosphorIcons;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill";
}

export const Icon:React.FC<IconProps> = ({ name, size = 24, color = "black", weight = "regular" }: IconProps) => {
  const IconComponent = PhosphorIcons[name] as React.FC<PhosphorIconProps>;
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} weight={weight} />;
};