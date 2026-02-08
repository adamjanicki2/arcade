import "src/components/link.css";

import { Link as UILink } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof UILink>;

export default function Link({ className, ...props }: Props) {
  return <UILink {...props} className={classNames("arcade-link", className)} />;
}
