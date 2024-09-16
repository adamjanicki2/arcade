import { useMediaQuery } from "@adamjanicki/ui";

export default function useMobile() {
  return useMediaQuery({ query: "(max-width: 768px)" });
}
