/// <reference types="vite/client" />

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

export type Status = "awaiting" | "ongoing" | "paused" | "gameover" | "success";
export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";
