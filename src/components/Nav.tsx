import { Box, Hamburger, ui, UnstyledLink } from "@adamjanicki/ui";
import { useState } from "react";
import "src/components/nav.css";
import Link from "src/components/Link";
import Logo from "src/components/Logo";

type NavlinkProps = {
  to: string;
  children: string;
  onClick: () => void;
};

function Navlink(props: NavlinkProps) {
  return (
    <ui.li vfx={{ width: "full" }}>
      <Link vfx={{ width: "full", color: "inherit" }} {...props} />
    </ui.li>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <ui.nav
      vfx={{
        axis: "x",
        align: "center",
        justify: "between",
        width: "full",
        paddingY: "s",
        paddingX: "l",
        borderBottom: true,
      }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "var(--background)",
      }}
      className="nav"
    >
      <Box
        vfx={{ axis: "x", align: "center", justify: "between", width: "full" }}
        className="bar-container"
      >
        <UnstyledLink to="/">
          <Logo className="nav-logo" />
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <ui.ul
        vfx={{ axis: "x", align: "center", gap: "l", margin: "none" }}
        className="desktop link-container"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="/" onClick={closeMenu}>
          Home
        </Navlink>
        <Navlink to="/games/" onClick={closeMenu}>
          Games
        </Navlink>
        <Navlink to="/about/" onClick={closeMenu}>
          About
        </Navlink>
      </ui.ul>
    </ui.nav>
  );
}

export default Nav;
