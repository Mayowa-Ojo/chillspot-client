import React from 'react'
import { Link } from "react-router-dom";
import tw from "twin.macro";

import { Nav, NavItem } from "./styles";
import { Bucket } from "../../components";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const Navbar = () => {
   return (
      <Nav isTransparent>
         <Logo />
         <Bucket as="span" css={[tw`inline-flex items-center`]}>
            <NavItem isTransparent>Stories</NavItem>
            <NavItem isTransparent>Login</NavItem>
            <NavItem>Signup</NavItem>
         </Bucket>
      </Nav>
   )
}

export default Navbar;
