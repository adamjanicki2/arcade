export type Children = React.ReactNode | React.ReactNode[];
export type GameListing = {
  id: string;
  title: string;
  desc: string;
  Component: React.ComponentType;
};

export type Position = {
  x: number;
  y: number;
};
