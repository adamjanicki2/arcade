import { GameListing } from "src/types";
import Snake from "src/games/snake";
import Asteroids from "src/games/asteroids";

const games: readonly GameListing[] = [
  {
    id: "snake",
    title: "Snake",
    desc: "A classic JavaScript game of Snake",
    Component: Snake,
  },
  {
    id: "asteroids",
    title: "Asteroids",
    desc: "Modern rendition of the 1979 Atari classic",
    Component: Asteroids,
  },
];

export default games;
