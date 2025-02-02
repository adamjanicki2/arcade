import GamePage, { type Config } from "src/games/common/GamePage";
import Controller from "src/games/snake/Controller";
import { settings, type Settings } from "src/games/snake/useSettings";

const config: Config<Settings> = {
  help: (
    <>
      I've built a version of the classic JavaScript Snake game! Follow these
      instructions to play!
      <br />
      <br />
      Instructions
      <br />
      <ol>
        <li>Press any arrow key to get started</li>
        <li>Use the arrow keys to navigate the board</li>
        <li>Eat as many apples as possible to get the highest score</li>
        <li>
          Adjust Adjust your settings by clicking on the button in the bottom
          right corner
        </li>
      </ol>
      <br />
      Keyboard shortcuts:
      <ul>
        <li>↑ - Move Up</li>
        <li>↓ - Move Down</li>
        <li>← - Move Left</li>
        <li>→ - Move Right</li>
        <li>p - Pause/Play</li>
        <li>r - Restart</li>
      </ul>
    </>
  ),
  settings,
};

export default function Snake() {
  return (
    <GamePage title="Snake" requiresDesktop config={config}>
      <Controller />
    </GamePage>
  );
}
