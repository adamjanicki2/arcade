import { ui } from "@adamjanicki/ui";
import { UnstyledLink } from "src/components/Link";
import { GameListing } from "src/types";

type Props = {
  game: GameListing;
  className?: string;
};

export default function GameCard({ game, className }: Props) {
  return (
    <UnstyledLink
      to={`/games/${game.id}`}
      style={{ width: "min-content", minWidth: "min(350px, 95vw)" }}
      className={className}
      vfx={{ axis: "y", padding: "xs", border: true, gap: "xs" }}
    >
      <ui.img src={`/images/${game.id}.png`} alt="" />
      <ui.h2 vfx={{ margin: "none", fontSize: "m" }}>{game.title}</ui.h2>
      <ui.p vfx={{ margin: "none" }}>{game.desc}</ui.p>
    </UnstyledLink>
  );
}
