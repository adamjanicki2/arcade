import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useMediaQuery from "@adamjanicki/ui/hooks/useMediaQuery";
import { useEffect } from "react";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export type ThemePreferenceStore = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

export const useThemePreference = create(
  persist<ThemePreferenceStore>(
    (set) => ({
      preference: "system",
      setPreference: (preference: ThemePreference) => set({ preference }),
    }),
    {
      name: "arcade-theme-preference-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTheme = (): Theme => {
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const { preference } = useThemePreference();
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
    [theme]
  );
};
