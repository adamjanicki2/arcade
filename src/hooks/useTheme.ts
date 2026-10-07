import { createStore, persist } from "@adamjanicki/store";
import useMediaQuery from "@adamjanicki/ui/hooks/useMediaQuery";
import { useEffect } from "react";
import type { Theme, ThemePreference } from "src/types";

export type { Theme, ThemePreference };

export const useThemePreference = createStore<ThemePreference>({
  init: "system",
  plugins: [
    persist({ key: "arcade-theme-preference-store", storage: "local" }),
  ],
});

export const useTheme = (): Theme => {
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [preference] = useThemePreference();
  return preference === "system"
    ? prefersDark
      ? "dark"
      : "light"
    : preference;
};

export const useSetTheme = () => {
  const theme = useTheme();
  useEffect(
    function () {
      document.body.setAttribute("data-theme", theme);
    },
    [theme],
  );
};
