import { useEffect } from "react";

export function useKeydown(handler: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handler]);
}
