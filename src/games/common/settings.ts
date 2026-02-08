import { createStore, persist } from "@adamjanicki/store";

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
  defaultSettings: T,
): UseSettingsHook<T> {
  const useSettingsBase = createStore<T>({
    init: { ...defaultSettings },
    plugins: [
      persist({ key: `aj-arcade-settings-${gameId}`, storage: "local" }),
    ],
  });

  return function useSettings() {
    const [settings, setSettings] = useSettingsBase();
    return { settings, setSettings };
  };
}
