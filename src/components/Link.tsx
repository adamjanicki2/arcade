import {
  Link as UILink,
  UnstyledLink as UIUnstyledLink,
} from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { Link as RouterLink } from "react-router-dom";
import "src/components/link.css";

type Props = React.ComponentProps<typeof UILink>;

const Link = ({ className, ...props }: Props) => (
  <UILink
    LinkElement={RouterLink}
    {...props}
    className={classNames("link", className)}
  />
);

export const UnstyledLink = (
  props: React.ComponentProps<typeof UIUnstyledLink>
) => <UIUnstyledLink LinkElement={RouterLink} {...props} />;

export default Link;
