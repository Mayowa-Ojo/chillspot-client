import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
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
import types from "../../store/types";

const Navbar = () => {
   const context = useContext(StoreContext);
   const { state: { auth }, dispatch} = context;
   const { pathname } = useLocation();

   const handleNewStory = () => {
      dispatch({
         namespace: "modal",
         type: types.SET_MODAL_COMPONENT,
         payload: "newStory"
      });

      dispatch({
         namespace: "modal",
         type: types.TOGGLE_MODAL,
      });
   }

   return (
      <Nav hasShadow={pathname !== "/"} hidden={pathname === "/login" || pathname === "/signup"}>
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
               <SearchBox>
                  <SearchIcon css={[tw`absolute fill-current text-chill-gray4 mt-2 ml-3 left-0`, "width: .8rem; height: .8rem"]}/>
                  <SearchInput placeholder="Search..." />
               </SearchBox>
               <Avatar css={[tw`w-8 h-8 ml-4 cursor-pointer`]}>
                  <Popover placement="bottom" content={<ProfilePopover />}>
                     <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image"/>
                  </Popover>
               </Avatar>
               <NavItem css={[tw`py-2 px-3 ml-4 rounded-md`]} onClick={handleNewStory}>
                  <FeatherIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]}/>
                  New Story
               </NavItem>
            </Bucket>
         }
      </Nav>
   )
}

const ProfilePopover = () => (
   <ProfilePopoverWrapper>
      <ProfilePopoverItem css={[tw`font-semibold`]}>
         Jonathan Buckenbeur
      </ProfilePopoverItem>
      <ProfilePopoverItem>Edit Profile</ProfilePopoverItem>
      <Bucket as="span" css={[tw`px-8 block`]}>
         <Divider css={[tw`my-3`]}/>
      </Bucket>
      <ProfilePopoverItem css={[tw`w-full flex items-center`]}>
         <HeartIcon css={[tw`fill-current text-chill-gray4 mr-2 w-4 h-4`]}/>
         My Likes
      </ProfilePopoverItem>
      <ProfilePopoverItem css={[tw`w-full flex items-center`]}>
         <FolderIcon css={[tw`fill-current text-chill-gray4 mr-2 w-4 h-4`]}/>
         My Collections
      </ProfilePopoverItem>
      <Bucket as="span" css={[tw`px-8 block`]}>
         <Divider css={[tw`my-3`]}/>
      </Bucket>
      <ProfilePopoverItem>Account Settings</ProfilePopoverItem>
      <ProfilePopoverItem css={[tw`w-full flex items-center`]}>
         <ExitIcon css={[tw`fill-current text-chill-gray4 mr-2`]}/>
         Sign Out
      </ProfilePopoverItem>
   </ProfilePopoverWrapper>
)

export default Navbar;
