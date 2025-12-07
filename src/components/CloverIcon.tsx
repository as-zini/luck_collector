// icons/LogoIcon.tsx
import * as React from "react";
import LogoSvg from "../assets/clover.svg?react";

type IconProps = {
  size?: number;
  color?: string;
} & React.ComponentProps<"svg">;

export default function CloverIcon({
  size = 24,
  color = "currentColor",
  ...rest
}: IconProps) {
  return (
    <LogoSvg
      width={size}
      height={size}
      // 전체 svg에 fill 스타일 주기 (자식 circle들이 상속받음)
      style={{ fill: color, ...(rest.style || {}) }}
      {...rest}
    />
  );
}
