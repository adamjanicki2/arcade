import { Box, ui } from "@adamjanicki/ui";
import GamePage, { type Config } from "src/games/common/GamePage";
import Controller from "src/games/sort/Controller";
import { type Settings, settings } from "src/games/sort/useSettings";

const config: Config<Settings> = {
  help: (
    <Box vfx={{ axis: "y", gap: "s" }}>
      <ui.p vfx={{ margin: "none" }}>
        This game is a take on other "blind ranking" style games that I've seen
        around recently.
      </ui.p>
      <ui.p vfx={{ margin: "none" }}>Instructions</ui.p>
      <ui.ol vfx={{ margin: "none", paddingLeft: "m" }}>
        <ui.li>Drag the random number to the rank you think it goes in</ui.li>
        <ui.li>Continue to order the numbers until you win or lose</ui.li>
        <ui.li>
          Adjust your settings by clicking on the button in the bottom right
          corner
        </ui.li>
      </ui.ol>
    </Box>
  ),
  settings,
  restartEligible: true,
};

export default function Sort() {
  return (
    <GamePage title="Sort" config={config}>
      <Controller />
    </GamePage>
  );
}
