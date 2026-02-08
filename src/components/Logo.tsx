import "src/components/logo.css";

import { ui } from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import type { CSSProperties } from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
};

export default function Logo({ className, ...props }: Props) {
  return (
    <ui.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
      className={classNames(className, "logo")}
    >
      {/* <!-- Built by Adam on 2024-09-15 --> */}
      <ui.rect
        x="16"
        y="196"
        width="480"
        height="300"
        rx="64"
        className="controller-bg"
      />
      <ui.rect
        x="16"
        y="196"
        width="480"
        height="300"
        rx="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="32"
      />
      <ui.path
        d="M256 186c0-105.87 86.13-170 192-170"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <ui.rect
        x="43"
        y="321"
        width="170"
        height="50"
        rx="8"
        fill="currentColor"
      />
      <ui.rect
        x="103"
        y="261"
        width="50"
        height="170"
        rx="8"
        fill="currentColor"
      />
      <ui.circle cx="328" cy="346" r="29" className="button-green" />
      <ui.circle cx="440" cy="346" r="29" className="button-red" />
      <ui.circle cx="384" cy="290" r="29" className="button-blue" />
      <ui.circle cx="384" cy="402" r="29" className="button-yellow" />
    </ui.svg>
  );
}
