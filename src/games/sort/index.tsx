import GamePage from "src/games/common/GamePage";
import Controller from "src/games/sort/Controller";

export default function Sort() {
  return (
    <GamePage title="Sort" config={{}}>
      <Controller />
    </GamePage>
  );
}
