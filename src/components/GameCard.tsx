import { classNames } from "@adamjanicki/ui/functions";
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
      className={classNames("flex flex-column pa1 ma2 ba bw1", className)}
    >
      <img src={`/images/${game.id}.png`} alt="" />
      <h2 className="home-link">{game.title}</h2>
      <p>{game.desc}</p>
    </UnstyledLink>
  );
}
