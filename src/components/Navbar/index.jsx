import React, { useContext } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import tw from "twin.macro";

import { Nav, NavItem, ProfilePopoverItem, ProfilePopoverWrapper, SearchBox, SearchInput } from "./styles";
import { Avatar, Bucket, Divider, Image, Popover } from "..";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as FeatherIcon } from "../../assets/svg/feather.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as FolderIcon } from "../../assets/svg/folder.svg";
import { ReactComponent as ExitIcon } from "../../assets/svg/exit.svg";
import { StoreContext } from "../../store";
import LocalStorage from "../../utils/localstorage";
import types from "../../store/types";

const ls = new LocalStorage();

const Navbar = () => {
   const location = useLocation();
   const history = useHistory();
   const context = useContext(StoreContext);
   const { state: { auth }, dispatch } = context;

   const handleLogout = () => {
      ls.delete("user");

      dispatch({
         namespace: "auth",
         type: types.REVOKE_USER
      });

      history.push("/")
   }

   return (
      <Nav hasShadow={location.pathname !== "/"} hidden={location.pathname === "/login" || location.pathname === "/signup"}>
         <Link to="/">
            <Logo />
         </Link>
         { !auth.isLoggedIn ?
            <Bucket as="span" css={[tw`inline-flex items-center`]}>
               <NavItem isTransparent><Link to="/stories">Stories</Link></NavItem>
               <NavItem isTransparent><Link to="/login">Login</Link></NavItem>
               <NavItem><Link to="/signup">Signup</Link></NavItem>
            </Bucket>
            :
            <Bucket as="span" css={[tw`inline-flex items-center`]}>
               { location.pathname === "/stories" ?
                  <SearchBox>
                     <SearchIcon css={[tw`absolute fill-current text-chill-gray4 mt-2 ml-3 left-0`, "width: .8rem; height: .8rem"]}/>
                     <SearchInput placeholder="Search..." />
                  </SearchBox>
                  :
                  <NavItem isTransparent css={[tw`-mr-2`]}><Link to="/stories">Stories</Link></NavItem>
               }
               <Avatar css={[tw`w-8 h-8 mx-8 cursor-pointer`]}>
                  <Popover placement="bottom" content={<ProfilePopover handleLogout={handleLogout}/>} trigger={'click'}>
                     <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image"/>
                  </Popover>
               </Avatar>
               <Link to={{pathname: "/x/new", state: {background: location, component: "newStory"}}}>
                  <NavItem css={[tw`py-2 px-3 ml-1 rounded-md`]}>
                     <FeatherIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]}/>
                     New Story
                  </NavItem>
               </Link>
            </Bucket>
         }
      </Nav>
   );
}

const ProfilePopover = ({handleLogout}) => (
   <ProfilePopoverWrapper>
      <Link to="/unorthodev/stories">
         <ProfilePopoverItem css={[tw`font-semibold`]}>
            Jonathan Buckenbeur
         </ProfilePopoverItem>
      </Link>
      <Link to="/account/profile">
         <ProfilePopoverItem>Edit Profile</ProfilePopoverItem>
      </Link>
      <Bucket as="span" css={[tw`px-8 block`]}>
         <Divider css={[tw`my-3`]}/>
      </Bucket>
      <Link to="/unorthodev/likes">
      <ProfilePopoverItem css={[tw`w-full flex items-center`]}>
         <HeartIcon css={[tw`fill-current text-chill-gray4 mr-2 w-4 h-4`]}/>
         My Likes
      </ProfilePopoverItem>
      </Link>
      <Link to="/unorthodev/collection">
      <ProfilePopoverItem css={[tw`w-full flex items-center`]}>
         <FolderIcon css={[tw`fill-current text-chill-gray4 mr-2 w-4 h-4`]}/>
         My Collection
      </ProfilePopoverItem>
      </Link>
      <Bucket as="span" css={[tw`px-8 block`]}>
         <Divider css={[tw`my-3`]}/>
      </Bucket>
      <Link to="/account/settings">
      <ProfilePopoverItem>Account Settings</ProfilePopoverItem>
      </Link>
      <ProfilePopoverItem css={[tw`w-full flex items-center`]} onClick={handleLogout}>
         <ExitIcon css={[tw`fill-current text-chill-gray4 mr-2`]}/>
         Sign Out
      </ProfilePopoverItem>
   </ProfilePopoverWrapper>
);

export default Navbar;
