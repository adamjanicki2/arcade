import Link from "src/components/Link";
import { Select } from "@adamjanicki/ui";
import { useThemePreference } from "src/hooks";

const options = ["system", "light", "dark"];

const Footer = () => {
  const { setPreference, preference } = useThemePreference();
  return (
    <footer className="pt4 ph2 flex flex-column items-center justify-center w-100 bt bw1">
      <Select
        options={options}
        value={preference}
        onChange={(e) => setPreference(e.target.value as any)}
        aria-label="Theme selector"
        className="mb3"
        getOptionLabel={(option) => option.toUpperCase()}
      />
      <p className="tc">
        EST. 2024 BUILT FROM SCRATCH BY{" "}
        <Link to="https://adamjanicki.xyz" target="_blank" rel="noreferrer">
          ADAM
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
