import { Link as UILink, UnstyledLink as UIUnstyledLink } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import type { ComponentProps } from "react";
import "src/components/link.css";

type Props = ComponentProps<typeof UILink>;

function Link({ className, ...props }: Props) {
  return (
    <UILink {...props} className={classNames("arcade-link", className)} />
  );
}

export function UnstyledLink(
  props: ComponentProps<typeof UIUnstyledLink>,
) {
  return <UIUnstyledLink {...props} />;
}

export default Link;
