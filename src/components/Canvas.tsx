import { classNames } from "@adamjanicki/ui/functions";
import { useEffect } from "react";

type Props = {
  multiplicity?: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  className?: string;
  style?: React.CSSProperties;
};

const Canvas = ({ canvasRef, className, style, multiplicity = 1 }: Props) => {
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
    <div
      className={classNames("flex items-center justify-center", className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
};

export default Canvas;
