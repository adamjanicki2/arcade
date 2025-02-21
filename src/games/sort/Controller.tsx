import { classNames } from "@adamjanicki/ui/functions";
import { useEffect, useState } from "react";
import useSettings from "src/games/sort/useSettings";
import { bound } from "src/util";
import StatusBadge, { type Status } from "src/components/StatusBadge";
import React from "react";

export default function Controller() {
  const { settings } = useSettings();
  let { slots: maxSlot, upper } = settings;
  maxSlot = bound(maxSlot, 5, 20);
  upper = bound(upper, maxSlot * 5, 1_000_000_000);
  const inclUpper = upper - 1;

  const maxDigits = inclUpper.toString().length;

  const [slots, setSlots] = useState<Array<number | undefined>>(
    new Array<number | undefined>(maxSlot).fill(undefined)
  );

  const [randomNumber, setRandomNumber] = useState(rng(0, inclUpper, []));

  useEffect(() => {
    setSlots(new Array<number | undefined>(maxSlot).fill(undefined));
    setRandomNumber(rng(0, inclUpper, []));
    // eslint-disable-next-line
  }, [inclUpper, maxSlot]);

  const wonGame = slots.length === slots.filter(Boolean).length;
  const lostGame = hasLostGame(slots, randomNumber);
  const isPlaying = slots.some(Boolean);

  let status: Status = "awaiting";
  if (wonGame) {
    status = "success";
  } else if (lostGame && isPlaying) {
    status = "gameover";
  } else if (isPlaying) {
    status = "ongoing";
  }

  return (
    <div>
      <div className="flex justify-center mb2">
        <StatusBadge status={status} />
      </div>
      <div className="flex flex-column justify-center items-center w-100">
        <div className="flex flex-wrap justify-center">
          {slots.map((num, i) => (
            <Slot
              key={i}
              num={num}
              onDrop={() => {
                const newSlots = slots.map((e, idx) =>
                  idx === i ? randomNumber : e
                );
                setSlots(newSlots);
                setRandomNumber(rng(0, inclUpper, newSlots));
              }}
              maxDigits={maxDigits}
            />
          ))}
        </div>
        <div
          className="ba b--dashed bw2 pa3 mt2"
          style={{ height: "fit-content" }}
        >
          <span
            draggable={["awaiting", "ongoing"].includes(status)}
            className="page-title-text fw8"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {wonGame
              ? " ".repeat(maxDigits)
              : " ".repeat(maxDigits - randomNumber.toString().length) +
                randomNumber}
          </span>
        </div>
      </div>
    </div>
  );
}

type SlotProps = {
  num?: number;
  onDrop: () => void;
  maxDigits: number;
};

const Slot = ({ num, onDrop, maxDigits }: SlotProps) => (
  <div
    className={classNames(
      "flex ba bw1 pa2 ma1 page-title-text",
      num ? "" : "b--dashed"
    )}
    onDrop={num ? undefined : onDrop}
    onDragOver={num ? undefined : (e) => e.preventDefault()}
    style={{
      minHeight: 30,
      minWidth: 30,
      whiteSpace: "pre-wrap",
      width: "fit-content",
    }}
  >
    {num !== undefined
      ? " ".repeat(maxDigits - num.toString().length) + num
      : new Array(maxDigits)
          .fill(undefined)
          .map((_, i) => <React.Fragment key={i}>&nbsp;</React.Fragment>)}
  </div>
);

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
