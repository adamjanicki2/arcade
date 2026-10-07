import { Box, ui } from "@adamjanicki/ui";
import Controller from "src/games/breakout/Controller";
import { type Settings, settings } from "src/games/breakout/useSettings";
import GamePage, { type Config } from "src/games/common/GamePage";

const config: Config<Settings> = {
  help: (
    <Box vfx={{ axis: "y", gap: "s" }}>
      <ui.p vfx={{ margin: "none" }}>
        A classic Breakout game! Use your paddle to bounce the ball and destroy
        all the bricks.
      </ui.p>
      <ui.p vfx={{ margin: "none" }}>Instructions</ui.p>
      <ui.ol vfx={{ margin: "none", paddingLeft: "m" }}>
        <ui.li>Press Space to launch the ball</ui.li>
        <ui.li>Use the arrow keys to move your paddle left and right</ui.li>
        <ui.li>Break all the bricks to win</ui.li>
        <ui.li>
          Adjust your settings by clicking on the button in the bottom right
          corner
        </ui.li>
      </ui.ol>
      <ui.p vfx={{ margin: "none" }}>Keyboard shortcuts:</ui.p>
      <ui.ul vfx={{ margin: "none", paddingLeft: "m" }}>
        <ui.li>Space - Launch ball</ui.li>
        <ui.li>← - Move paddle left</ui.li>
        <ui.li>→ - Move paddle right</ui.li>
        <ui.li>p - Pause/Play</ui.li>
        <ui.li>r - Restart</ui.li>
      </ui.ul>
    </Box>
  ),
  settings,
  restartEligible: true,
};

export default function Breakout() {
  return (
    <GamePage title="Breakout" requiresDesktop config={config}>
      <Controller />
    </GamePage>
  );
}
