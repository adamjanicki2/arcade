import { GameListing } from "src/types";
import Snake from "src/games/snake";
import Asteroids from "src/games/asteroids";
import Sort from "src/games/sort";

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
  {
    id: "sort",
    title: "Sort",
    desc: "A simple randomized blind sort game",
    Component: Sort,
  },
];

export default games;
