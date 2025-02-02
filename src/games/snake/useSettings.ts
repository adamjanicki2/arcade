import { makeUseSettingsHook } from "src/games/common/settings";
import type { Config } from "src/games/common/GamePage";

export type Settings = {
  checkWalls: boolean;
  fps: number;
  gridSize: number;
};

export const defaultSettings: Settings = {
  checkWalls: false,
  fps: 12,
  gridSize: 20,
};

export const labels = {
  checkWalls: "Check Walls",
  fps: "FPS",
  gridSize: "Grid Size",
} as const;

const useSettings = makeUseSettingsHook<Settings>("snake", defaultSettings);
export const settings: Config<Settings>["settings"] = {
  useSettings,
  defaultSettings,
  labels,
};

export default useSettings;
