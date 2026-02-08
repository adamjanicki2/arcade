import { Box, ui } from "@adamjanicki/ui";
import Link from "src/components/Link";
import { useDocumentTitle } from "src/hooks";

export default function Home() {
  useDocumentTitle("Arcade");

  return (
    <Box
      vfx={{ axis: "y", align: "center", justify: "center", gap: "l" }}
      style={{ minHeight: "60vh" }}
    >
      <ui.h1
        vfx={{
          textAlign: "center",
          fontSize: "xxl",
          fontWeight: 7,
          margin: "none",
        }}
      >
        ARCADE
      </ui.h1>
      <Link to="/games/" vfx={{ fontSize: "m", fontWeight: 6 }}>
        START PLAYING
      </Link>
      <Link to="/about/" vfx={{ fontSize: "m", fontWeight: 6 }}>
        LEARN MORE
      </Link>
    </Box>
  );
}
