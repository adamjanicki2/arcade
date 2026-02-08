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
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/games/", label: "Games" },
    { to: "/about/", label: "About" },
  ];

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
        pos: "sticky",
        z: "nav",
      }}
      style={{ top: 0, backgroundColor: "var(--background)" }}
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
        vfx={{
          axis: "x",
          align: "center",
          gap: "l",
          margin: "none",
          width: "full",
        }}
        className="desktop link-container"
        style={{ display: open ? "flex" : undefined }}
      >
        {navItems.map((item) => (
          <Navlink key={item.to} to={item.to} onClick={closeMenu}>
            {item.label}
          </Navlink>
        ))}
      </ui.ul>
    </ui.nav>
  );
}

export default Nav;
