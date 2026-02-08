import { Box, ui } from "@adamjanicki/ui";
import GamePage, { type Config } from "src/games/common/GamePage";
import Controller from "src/games/snake/Controller";
import { type Settings,settings } from "src/games/snake/useSettings";

const config: Config<Settings> = {
  help: (
    <Box vfx={{ axis: "y", gap: "s" }}>
      <ui.p vfx={{ margin: "none" }}>
        I've built a version of the classic JavaScript Snake game! Follow these
        instructions to play!
      </ui.p>
      <ui.p vfx={{ margin: "none" }}>Instructions</ui.p>
      <ui.ol vfx={{ margin: "none", paddingLeft: "m" }}>
        <ui.li>Press any arrow key to get started</ui.li>
        <ui.li>Use the arrow keys to navigate the board</ui.li>
        <ui.li>Eat as many apples as possible to get the highest score</ui.li>
        <ui.li>
          Adjust your settings by clicking on the button in the bottom right
          corner
        </ui.li>
      </ui.ol>
      <ui.p vfx={{ margin: "none" }}>Keyboard shortcuts:</ui.p>
      <ui.ul vfx={{ margin: "none", paddingLeft: "m" }}>
        <ui.li>↑ - Move Up</ui.li>
        <ui.li>↓ - Move Down</ui.li>
        <ui.li>← - Move Left</ui.li>
        <ui.li>→ - Move Right</ui.li>
        <ui.li>p - Pause/Play</ui.li>
        <ui.li>r - Restart</ui.li>
      </ui.ul>
    </Box>
  ),
  settings,
  restartEligible: true,
};

export default function Snake() {
  return (
    <GamePage title="Snake" requiresDesktop config={config}>
      <Controller />
    </GamePage>
  );
}
