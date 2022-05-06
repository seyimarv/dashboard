import React, { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { devices } from "../../styles/mediaQueries";
import Header from "../Header";
import Typography from "../Typography";

const Wrapper = styled.div`
  display: flex;
  padding: 4rem 6rem;
  gap: 2rem;
  position: relative;

  @media ${devices.tabport} {
    padding: 4rem 2rem;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-right: 8rem;
  padding-left: 4rem;
  height: 100%;
  @media ${devices.tabport} {
    display: none;
  }
`;

const MobileSidebar = styled.div<{ isMobileNav?: boolean }>`
  width: 60vw;
  height: 100%;
  left: 0px;
  position: fixed;
  background: ${colors.gray2};
  z-index: 999;
  top: 0px;
  padding-bottom: 10rem;
  padding-left: 10%;
  padding-top: 5rem;
  gap: 2rem;
  flex-direction: column;
  transition: all 0.5s;
  transform: translateX(-100%);
  display: flex;

  @media ${devices.tabport} {
    transform: ${({ isMobileNav }) => (isMobileNav ? "translateX(0)" : "")};
  }
`;

const ToggleIcon = styled.div<{ isMobileNav?: boolean }>`
  position: absolute;
  opacity: 1;
  top: 3rem;
  right: 3rem;
  &,
  &::before,
  &::after {
    width: 4rem;
    height: 2px;
    background-color: ${colors.gray2};
    z-index: 1200;
    display: none;

    @media ${devices.tabport} {
      display: inline-block;
    }
  }
  & {
    background-color: ${({ isMobileNav }) =>
      isMobileNav ? "transparent" : ""};
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    transition: all 0.2s;
    top: 0px;
  }
  &::before {
    top: ${({ isMobileNav }) => (isMobileNav ? "0" : "-.8rem")};
    transform: ${({ isMobileNav }) => (isMobileNav ? "rotate(135deg)" : "")};
  }
  &::after {
    top: ${({ isMobileNav }) => (isMobileNav ? "0" : ".8rem")};
    transform: ${({ isMobileNav }) => (isMobileNav ? "rotate(-135deg)" : "")};
  }
`;

const StyledLinkText = styled(Typography)<{ active?: boolean }>`
  color: ${({ active }) => (!active ? `${colors.textBody}` : `${colors.link}`)};
`;

interface props {
    children: React.ReactNode
}

const Container = ({ children }: props) => {
  const [isMobileNav, setIsMobileNav] = useState(false);
  const location = useLocation();
  const onToggleMobileNav = useCallback(() => {
    setIsMobileNav(!isMobileNav);
  }, [isMobileNav]);
  return (
    <div>
      <ToggleIcon onClick={onToggleMobileNav} isMobileNav={isMobileNav} />
      <Header />
      <Wrapper>
        <MobileSidebar isMobileNav={isMobileNav}>
          <Link to="/">
            <StyledLinkText size="2.5rem" active={location.pathname === "/"}>
              Main
            </StyledLinkText>
          </Link>
          <Link to="/Product">
            <StyledLinkText
              size="2.5rem"
              active={location.pathname === "/Product"}
            >
              Product
            </StyledLinkText>
          </Link>
        </MobileSidebar>
        <Sidebar>
          <Link to="/">
            <StyledLinkText active={location.pathname === "/"}>
              Main
            </StyledLinkText>
          </Link>
          <Link to="/Product">
            <StyledLinkText active={location.pathname === "/Product"}>
              Product
            </StyledLinkText>
          </Link>
        </Sidebar>

        <div
          style={{
            flexGrow: 1,
          }}
        >
          {children}
        </div>
      </Wrapper>
    </div>
  );
};

export default Container;
