import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../../GlobalStyles";

interface HamburgerLineProps {
  readonly isOpen: boolean;
}

interface MobileMenuContainerProps {
  readonly isOpen: boolean;
}

interface OverLayProps {
  readonly isOpen: boolean;
}

export const Nav = styled.nav`
  height: 8.8rem;
  font-size: 2rem;
  display: flex;
  min-height: 20rem;
`;

export const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLogo = styled.div`
  width: 15%;
  padding: 1rem;
`;

export const Logo = styled(Link)`
  img {
    max-width: 17rem;
    transform: scale(1.1);
  }
`;

export const Menu = styled.ul`
  align-items: center;
  display: none;

  @media only screen and (min-width: 55rem) {
    display: flex;
  }
`;

export const MenuItem = styled.li``;

export const MenuLink = styled(Link)`
  margin: 0.5rem 1.4rem;

  @media screen and (max-width: 55rem) {
    color: #fff;
  }
`;

export const NavItemBtn = styled.li`
  padding-left: 3rem;
`;

export const NavBtnLink = styled(Link)``;

export const HamburgerContainer = styled.div`
  cursor: pointer;
  display: block;

  @media only screen and (min-width: 55rem) {
    display: none;
  }
`;

export const HamburgerLine = styled.span<HamburgerLineProps>`
  display: block;
  width: 25px;
  height: 2px;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  background-color: #4682b4;
  transition: all 250ms ease;

  &:nth-child(1) {
    transform: ${({ isOpen }) =>
      isOpen ? `rotate(-405deg) translate(-5px, 6px)` : `none`};
  }

  &:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
  }

  &:nth-child(3) {
    transform: ${({ isOpen }) =>
      isOpen ? `rotate(405deg) translate(-5px, -6px)` : `none`};
  }
`;

// Mobile Menu
export const OverLay = styled.div<OverLayProps>`
  position: absolute;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? "31rem" : "0")};
  transition: height 0.8s cubic-bezier(1, 0, 0, 1);
  left: 0;
  right: 0;
  top: 20rem;
  font-size: 2rem;
`;

export const MobileMenuContainer = styled.ul<MobileMenuContainerProps>`
  background: #101522;
  top: ${({ isOpen }) => (isOpen ? "0" : "-31rem")};
  padding: 3rem;
`;

export const MobileMenuItem = styled.li`
  margin: 2rem 0;
`;

export const MobileMenuLink = styled(Link)`
  color: #fff;
`;
