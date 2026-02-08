import { Select, ui } from "@adamjanicki/ui";
import Link from "src/components/Link";
import { useThemePreference } from "src/hooks";

const options = ["system", "light", "dark"];

export default function Footer() {
  const [preference, setPreference] = useThemePreference();
  return (
    <ui.footer
      vfx={{
        axis: "y",
        align: "center",
        justify: "center",
        width: "full",
        paddingTop: "l",
        paddingX: "s",
        borderTop: true,
        gap: "m",
      }}
    >
      <Select
        options={options}
        value={preference}
        onSelect={(value) => setPreference(value as any)}
        aria-label="Theme selector"
        getOptionLabel={(option) => option.toUpperCase()}
      />
      <ui.p vfx={{ textAlign: "center", margin: "none" }}>
        EST. 2024 BUILT FROM SCRATCH BY{" "}
        <Link to="https://adamjanicki.xyz" newTab>
          ADAM
        </Link>
      </ui.p>
    </ui.footer>
  );
}
