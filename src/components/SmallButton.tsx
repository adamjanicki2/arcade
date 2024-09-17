import { Button } from "@adamjanicki/ui";

type Props = React.ComponentProps<typeof Button>;

export default function SmallButton({ style, ...props }: Props) {
  return (
    <Button {...props} style={{ fontSize: 12, padding: "4px 6px", ...style }} />
  );
}
