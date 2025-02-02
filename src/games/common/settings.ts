import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GeneralSettings = {
  [key: string]: string | number | boolean;
};

type Store<T> = {
  settings: T;
  setSettings: (settings: T) => void;
};

export type UseSettingsHook<T> = () => Store<T>;

export function makeUseSettingsHook<T extends GeneralSettings>(
  gameId: string,
  defaultSettings: T
): UseSettingsHook<T> {
  return create(
    persist<Store<T>>(
      (set) => ({
        settings: { ...defaultSettings },
        setSettings: (settings: T) => set({ settings }),
      }),
      {
        name: `arcade-settings-${gameId}`,
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
}
