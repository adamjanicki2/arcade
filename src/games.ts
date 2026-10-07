import Breakout from "src/games/breakout";
import Snake from "src/games/snake";
import Sort from "src/games/sort";
import { GameListing } from "src/types";

const games: readonly GameListing[] = [
  {
    id: "snake",
    title: "Snake",
    desc: "A classic JavaScript game of Snake",
    Component: Snake,
  },
  {
    id: "sort",
    title: "Sort",
    desc: "A simple randomized blind sort game",
    Component: Sort,
  },
  {
    id: "breakout",
    title: "Breakout",
    desc: "Break all the bricks with your paddle and ball",
    Component: Breakout,
  },
];

export default games;
