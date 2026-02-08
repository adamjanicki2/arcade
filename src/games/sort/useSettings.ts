import type { Config } from "src/games/common/GamePage";
import { makeUseSettingsHook } from "src/games/common/settings";

export type Settings = {
  upper: number;
  slots: number;
};

export const defaultSettings: Settings = {
  upper: 100,
  slots: 10,
};

export const labels = {
  upper: "Upper Bound",
  slots: "Slots",
} as const;

const useSettings = makeUseSettingsHook<Settings>("sort", defaultSettings);
export const settings: Config<Settings>["settings"] = {
  useSettings,
  defaultSettings,
  labels,
};

export default useSettings;
