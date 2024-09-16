import { useEffect, useState } from "react";
import { TripleFlip as Hamburger } from "@adamjanicki/ui";
import "src/components/nav.css";
import Link, { UnstyledLink } from "src/components/Link";
import { useLocation } from "react-router-dom";
import Text from "src/components/Text";
import Logo from "src/components/Logo";

type NavlinkProps = {
  to: string;
  children: string;
};

const Nav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Navlink = ({ to, children }: NavlinkProps) => (
    <li className="navlink-li">
      <Link className="navlink" onClick={closeMenu} to={to}>
        <Text>{children}</Text>
      </Link>
    </li>
  );

  return (
    <nav className="flex items-center justify-between w-100 nav pv2 ph4 bb">
      <div className="flex items-center justify-between bar-container">
        <UnstyledLink to="/">
          <Logo className="nav-logo" />
        </UnstyledLink>
        <div className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <ul
        className="flex items-center desktop link-container ma0"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="/">Home</Navlink>
        <Navlink to="/games/">Games</Navlink>
        <Navlink to="/about/">About</Navlink>
      </ul>
    </nav>
  );
};

export default Nav;
