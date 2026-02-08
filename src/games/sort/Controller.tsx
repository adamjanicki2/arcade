import { Box, ui } from "@adamjanicki/ui";
import { useState } from "react";
import StatusBadge, { type Status } from "src/components/StatusBadge";
import useSettings from "src/games/sort/useSettings";
import { bound } from "src/util";

export default function Controller() {
  const { settings } = useSettings();
  let { slots: maxSlot, upper } = settings;
  maxSlot = bound(maxSlot, 5, 20);
  upper = bound(upper, maxSlot * 5, 1_000_000_000);
  const inclUpper = upper - 1;

  const maxDigits = inclUpper.toString().length;

  return (
    <SortGame
      key={`${maxSlot}-${inclUpper}`}
      maxSlot={maxSlot}
      inclUpper={inclUpper}
      maxDigits={maxDigits}
    />
  );
}

type SortGameProps = {
  maxSlot: number;
  inclUpper: number;
  maxDigits: number;
};

function SortGame({ maxSlot, inclUpper, maxDigits }: SortGameProps) {
  const [slots, setSlots] = useState<Array<number | undefined>>(
    new Array<number | undefined>(maxSlot).fill(undefined),
  );
  const [randomNumber, setRandomNumber] = useState(() =>
    rng(0, inclUpper, []),
  );

  const wonGame = slots.length === slots.filter(Boolean).length;
  const lostGame = hasLostGame(slots, randomNumber);
  const isPlaying = slots.some(Boolean);

  const status: Status = wonGame
    ? "success"
    : lostGame && isPlaying
      ? "gameover"
      : isPlaying
        ? "ongoing"
        : "awaiting";

  return (
    <Box vfx={{ axis: "y", gap: "s" }}>
      <Box vfx={{ axis: "x", justify: "center" }}>
        <StatusBadge status={status} />
      </Box>
      <Box vfx={{ axis: "y", align: "center", width: "full", gap: "s" }}>
        <Box vfx={{ axis: "x", wrap: true, justify: "center", gap: "xs" }}>
          {slots.map((num, i) => (
            <Slot
              key={i}
              num={num}
              onDrop={() => {
                const newSlots = slots.map((e, idx) =>
                  idx === i ? randomNumber : e,
                );
                setSlots(newSlots);
                setRandomNumber(rng(0, inclUpper, newSlots));
              }}
              maxDigits={maxDigits}
            />
          ))}
        </Box>
        <Box vfx={{ border: true, borderStyle: "dashed", padding: "m", height: "fit" }}>
          <ui.span
            draggable={["awaiting", "ongoing"].includes(status)}
            className="page-title-text"
            vfx={{ fontWeight: 8 }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {wonGame
              ? " ".repeat(maxDigits)
              : " ".repeat(maxDigits - randomNumber.toString().length) +
                randomNumber}
          </ui.span>
        </Box>
      </Box>
    </Box>
  );
}

type SlotProps = {
  num?: number;
  onDrop: () => void;
  maxDigits: number;
};

function Slot({ num, onDrop, maxDigits }: SlotProps) {
  return (
    <Box
      className="page-title-text"
      vfx={{
        axis: "x",
        border: true,
        borderStyle: num ? "solid" : "dashed",
        padding: "s",
        fontWeight: 7,
        width: "fit",
      }}
      onDrop={num ? undefined : onDrop}
      onDragOver={num ? undefined : (e) => e.preventDefault()}
      style={{
        minHeight: 30,
        minWidth: 30,
        whiteSpace: "pre-wrap",
      }}
    >
      {num !== undefined
        ? " ".repeat(maxDigits - num.toString().length) + num
        : new Array(maxDigits)
            .fill(undefined)
            .map((_, i) => <ui.span key={i}>&nbsp;</ui.span>)}
    </Box>
  );
}

function rng(min: number, max: number, used: Array<number | undefined>) {
  let randomNumber = min + Math.floor(Math.random() * (max - min));
  while (used.includes(randomNumber)) {
    randomNumber = min + Math.floor(Math.random() * (max - min));
  }
  return randomNumber;
}

function hasLostGame(slots: Array<number | undefined>, randint: number) {
  for (let i = 0; i < slots.length; ++i) {
    const element = slots[i];
    if (!element) {
      const option = [...slots];
      option[i] = randint;
      if (isIncreasing(option)) {
        return false;
      }
    }
  }

  return true;
}

function isIncreasing(arr: Array<number | undefined>) {
  let cur = Number.NEGATIVE_INFINITY;
  for (const el of arr) {
    if (el && el <= cur) {
      return false;
    }
    cur = el || cur;
  }
  return true;
}
