import GamePage from "src/games/common/GamePage";
import SortController from "src/games/sort/SortController";

export default function Sort() {
  return (
    <GamePage title="Sort" config={{}}>
      <SortController />
    </GamePage>
  );
}
