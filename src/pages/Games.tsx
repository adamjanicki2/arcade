import GameCard from "src/components/GameCard";
import PageWrapper from "src/components/PageWrapper";
import games from "src/games";

const Games = () => (
  <PageWrapper title="GAMES" breadcrumbs={[{ name: "Home", to: "/" }]}>
    <div className="flex flex-wrap justify-center ph4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </PageWrapper>
);

export default Games;
