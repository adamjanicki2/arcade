import { Button } from "@adamjanicki/ui";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>;

export default function SmallButton({ style, ...props }: Props) {
  return (
    <Button
      {...props}
      vfx={{ fontSize: "xs", paddingX: "xs", paddingY: "xxs" }}
      style={style}
    />
  );
}
