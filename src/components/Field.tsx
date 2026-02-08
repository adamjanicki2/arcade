import { Box, ui } from "@adamjanicki/ui";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Field({ title, children }: Props) {
  return (
    <Box vfx={{ axis: "y", gap: "xs", marginY: "s" }}>
      <ui.label>{title}</ui.label>
      {children}
    </Box>
  );
}
