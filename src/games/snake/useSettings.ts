import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const DEFAULT_SETTINGS: Settings = {
  checkWalls: false,
  fps: 12,
  gridSize: 20,
};

export type Settings = {
  checkWalls: boolean;
  fps: number;
  gridSize: number;
};

export type SettingsStore = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const useSettings = create(
  persist<SettingsStore>(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      setSettings: (settings: Settings) => {
        settings.fps = Math.max(1, settings.fps);
        settings.gridSize = Math.max(4, settings.gridSize);
        set({ settings });
      },
    }),
    {
      name: "arcade-snake-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSettings;
