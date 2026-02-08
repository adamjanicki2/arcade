import { ui, UnstyledLink } from "@adamjanicki/ui";
import { GameListing } from "src/types";

type Props = {
  game: GameListing;
};

export default function GameCard({ game }: Props) {
  return (
    <UnstyledLink
      to={`/games/${game.id}`}
      style={{ minWidth: "min(350px, 95vw)" }}
      vfx={{ axis: "y", width: "min", padding: "xs", border: true, gap: "xs" }}
    >
      <ui.img src={`/images/${game.id}.png`} alt="" />
      <ui.h2 vfx={{ margin: "none", fontSize: "m" }}>{game.title}</ui.h2>
      <ui.p vfx={{ margin: "none" }}>{game.desc}</ui.p>
    </UnstyledLink>
  );
}
