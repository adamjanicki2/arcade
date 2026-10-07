import { Badge } from "@adamjanicki/ui";
import type { Status } from "src/types";

type Props = {
  status: Status;
};

const TYPE_MAP = {
  awaiting: "info",
  ongoing: "success",
  success: "success",
  paused: "warning",
  gameover: "error",
} as const;

export default function StatusBadge({ status }: Props) {
  return <Badge type={TYPE_MAP[status]}>{status}</Badge>;
}
