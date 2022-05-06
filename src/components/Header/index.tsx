import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/types";

const Wrapper = styled.div<{background: string}>`
  padding: 2rem 4rem;
  background:${({ background }) => background };
  box-shadow: 0 0 5px 0 #3ab396;
  box-shadow: 2px 2px 2px 1px #3ab396;

  img {
      width: 14rem;
  }
`

const Header = () => {
    const {logo, mainColor}  = useSelector((state: RootState)=> state?.configuration.configuration)

    return (
       <Wrapper background={mainColor}>
           <img src={logo} alt='/logo'/>
       </Wrapper>
    )
}

export default Header