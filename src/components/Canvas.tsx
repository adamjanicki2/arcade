import { Box, ui } from "@adamjanicki/ui";
import type { CSSProperties, RefObject } from "react";
import { useEffect } from "react";

type Props = {
  multiplicity?: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  className?: string;
  style?: CSSProperties;
};

export default function Canvas({
  canvasRef,
  className,
  style,
  multiplicity = 1,
}: Props) {
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          const width = parent.clientWidth;
          const height = parent.clientHeight;
          canvasRef.current.width = width - (width % multiplicity);
          canvasRef.current.height = height - (height % multiplicity);
        }
      }
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [canvasRef, multiplicity]);

  return (
    <Box
      className={className}
      style={style}
      vfx={{ axis: "x", align: "center", justify: "center" }}
    >
      <ui.canvas
        ref={canvasRef}
        style={{
          border: "none",
          outline: "none",
        }}
      />
    </Box>
  );
}
