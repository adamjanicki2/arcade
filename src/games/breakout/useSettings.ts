import type { Config } from "src/games/common/GamePage";
import { makeUseSettingsHook } from "src/games/common/settings";

export type Settings = {
  ballSpeed: number;
  brickRows: number;
  brickCols: number;
  paddleWidth: number;
};

export const defaultSettings: Settings = {
  ballSpeed: 5,
  brickRows: 4,
  brickCols: 10,
  paddleWidth: 25,
};

export const labels = {
  ballSpeed: "Ball Speed",
  brickRows: "Brick Rows",
  brickCols: "Brick Columns",
  paddleWidth: "Paddle Width (%)",
} as const;

const useSettings = makeUseSettingsHook<Settings>("breakout", defaultSettings);
export const settings: Config<Settings>["settings"] = {
  useSettings,
  defaultSettings,
  labels,
};

export default useSettings;
