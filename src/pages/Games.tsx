import { Box } from "@adamjanicki/ui";
import GameCard from "src/components/GameCard";
import PageWrapper from "src/components/PageWrapper";
import games from "src/games";

export default function Games() {
  return (
    <PageWrapper title="GAMES" breadcrumbs={[{ name: "Home", to: "/" }]}>
      <Box
        vfx={{
          axis: "x",
          wrap: true,
          justify: "center",
          paddingX: "l",
          gap: "s",
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Box>
    </PageWrapper>
  );
}
