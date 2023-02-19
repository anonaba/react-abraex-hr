import { Button } from "GlobalStyles";
import { FC, useState, useEffect, useCallback } from "react";

import {
  Nav,
  NavContainer,
  NavLogo,
  Logo,
  Menu,
  MenuItem,
  MenuLink,
  NavItemBtn,
  NavBtnLink,
  HamburgerContainer,
  HamburgerLine,
  MobileMenuContainer,
  MobileMenuItem,
  MobileMenuLink,
  OverLay,
} from "./style";

const menus = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
  { name: "How it works", url: "/how-it-works" },
  { name: "Contact us", url: "/contact-us" },
];

const Navbar: FC = () => {
  const [openMenu, setopenMenu] = useState<boolean>(false);

  const handleMobileMenuClick = useCallback(() => {
    setopenMenu(!openMenu);
  }, [openMenu]);

  // hide mobile menu on desktop
  const getRidMenuMobileMenu = useCallback(() => {
    if (window.innerWidth >= 880) {
      setopenMenu(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getRidMenuMobileMenu);
    return () => {
      window.removeEventListener("resize", getRidMenuMobileMenu);
    };
  }, [getRidMenuMobileMenu]);

  // render menu either desktop or mobile view
  const getMenu = useCallback((whichMenu?: string) => {
    return menus.map(({ name, url }, idx) => {
      if (whichMenu === "desktop") {
        return (
          <MenuItem key={idx}>
            <MenuLink to={url}>{name}</MenuLink>
          </MenuItem>
        );
      } else {
        return (
          <MobileMenuItem key={idx}>
            <MobileMenuLink to={url}>{name}</MobileMenuLink>
          </MobileMenuItem>
        );
      }
    });
  }, []);

  return (
    <>
      <Nav>
        <NavContainer>
          <NavLogo>
            <Logo to="/">
              <img src="img/home-logo.png" alt="Abraex Inc" />
            </Logo>
          </NavLogo>
          <Menu>
            {getMenu("desktop")}
            <NavItemBtn>
              <NavBtnLink to="/login">
                <Button color="primary">Use App</Button>
              </NavBtnLink>
            </NavItemBtn>
          </Menu>
          <HamburgerContainer onClick={handleMobileMenuClick}>
            <HamburgerLine isOpen={openMenu} />
            <HamburgerLine isOpen={openMenu} />
            <HamburgerLine isOpen={openMenu} />
          </HamburgerContainer>
        </NavContainer>
      </Nav>
      <OverLay isOpen={openMenu}>
        <MobileMenuContainer isOpen={openMenu}>
          {getMenu()}
          <NavItemBtn>
            <NavBtnLink to="/login">
              <Button>Use App</Button>
            </NavBtnLink>
          </NavItemBtn>
        </MobileMenuContainer>
      </OverLay>
    </>
  );
};

export default Navbar;
