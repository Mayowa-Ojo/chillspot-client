import React from 'react'
import { Link, useLocation } from "react-router-dom";
import tw from "twin.macro";

import { Nav, NavItem } from "./styles";
import { Bucket } from "../../components";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const Navbar = () => {
   const { pathname } = useLocation();

   return (
      <Nav hasShadow={pathname != "/"} hidden={pathname == "/login" || pathname == "/signup"}>
         <Link to="/">
            <Logo />
         </Link>
         <Bucket as="span" css={[tw`inline-flex items-center`]}>
            <NavItem isTransparent><Link to="/stories">Stories</Link></NavItem>
            <NavItem isTransparent><Link to="/login">Login</Link></NavItem>
            <NavItem><Link to="/signup">Signup</Link></NavItem>
         </Bucket>
      </Nav>
   )
}

export default Navbar;
