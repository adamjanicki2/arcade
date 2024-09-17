import GamePage from "src/games/GamePage";
import SnakeController from "src/games/snake/SnakeController";

export default function Snake() {
  return (
    <GamePage title="Snake" requiresDesktop>
      <SnakeController />
    </GamePage>
  );
}
