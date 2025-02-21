import GamePage, { type Config } from "src/games/common/GamePage";
import Controller from "src/games/sort/Controller";
import { settings, type Settings } from "src/games/sort/useSettings";

const config: Config<Settings> = {
  help: (
    <>
      This game is a take on other "blind ranking" style games that I've seen
      around recently.
      <br />
      <br />
      Instructions
      <br />
      <ol>
        <li>Drag the random number to the rank you think it goes in</li>
        <li>Continue to order the numbers until you win or lose</li>
        <li>
          Adjust your settings by clicking on the button in the bottom right
          corner
        </li>
      </ol>
      <br />
    </>
  ),
  settings,
  restartEligible: true,
};

export default function Sort() {
  return (
    <GamePage title="Sort" config={config} containerClassName="w-90">
      <Controller />
    </GamePage>
  );
}
