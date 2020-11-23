import React, { useState } from 'react';
import tw from "twin.macro";

import { Avatar, Bucket, FlexBox, Image, Text, Dropdown, Button } from "../../components";
import { ActiveTabIndicator, NoStoriesPlaceholder, ProfileButton, ProfileContainer, ProfileInfo, ProfileNavigation, ProfileNavItem } from './styles';
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";
import { ReactComponent as KebabMenuIcon } from "../../assets/svg/kebab-menu.svg";
import { ReactComponent as ExclamationCircleIcon } from "../../assets/svg/exclamation-circle.svg";
import { ReactComponent as BlockIcon } from "../../assets/svg/block.svg";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as NoContentIllustration } from "../../assets/svg/no-content.svg";

const Profile = () => {
   const [navItem, setNavItem] = useState("stories");

   return (
      <ProfileContainer>
         <ProfileInfo>
            <Avatar css={[tw`w-32 h-32`]}>
               <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image" />
            </Avatar>
            <FlexBox isCol css={[tw`items-start justify-start ml-10`]}>
               <Text css={[tw`text-2xl font-bold mt-2`]}>Jonathan Buckenbeur</Text>
               <Text css={[tw`text-c-18`]}>Travel blogger</Text>
               <FlexBox css={[tw`justify-start mt-4`]}>
                  <ProfileButton isTransparent>Edit Profile</ProfileButton>
                  <ProfileButton>
                     <UserFriendsIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
                     Follow
                  </ProfileButton>
                  <Dropdown 
                     trigger={<MenuDropdownTrigger />}
                     content={<MenuDropdownContent />}
                  />
               </FlexBox>
            </FlexBox>
         </ProfileInfo>
         <ProfileNavigation>
            <Bucket as="ul" css={[tw`py-8 flex`]}>
               <ProfileNavItem onClick={() => setNavItem("stories")} isActive={navItem === "stories"}>
                  <ActiveTabIndicator/>
                  Stories
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>0</Bucket>
               </ProfileNavItem>
               <ProfileNavItem onClick={() => setNavItem("liked-stories")} isActive={navItem === "liked-stories"}>
                  <ActiveTabIndicator />
                  Liked Stories
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>22</Bucket>
               </ProfileNavItem>
               <ProfileNavItem onClick={() => setNavItem("followers")} isActive={navItem === "followers"}>
                  <ActiveTabIndicator />
                  Followers
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>1,280</Bucket>
               </ProfileNavItem>
               <ProfileNavItem onClick={() => setNavItem("following")} isActive={navItem === "following"}>
                  <ActiveTabIndicator />
                  Following
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>470</Bucket>
               </ProfileNavItem>
               <ProfileNavItem onClick={() => setNavItem("collections")} isActive={navItem === "collections"}>
                  <ActiveTabIndicator />
                  Collections
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>2</Bucket>
               </ProfileNavItem>
               <Bucket css={[tw`inline-flex flex-auto justify-end -mr-4`]}>
                  <Dropdown 
                     trigger={<FilterDropdownTrigger />}
                     content={<FilterDropdownContent />}
                  />
               </Bucket>
            </Bucket>
         </ProfileNavigation>
         <NoStoriesPlaceholder>
            <NoContentIllustration />
            <Text css={[tw`text-c-18 font-semibold mt-10`]}>You haven't created any stories yet</Text>
            <Button css={[tw`mt-4 py-2 px-4 bg-chill-indigo2 rounded-lg`]}>Create your first story</Button>
         </NoStoriesPlaceholder>
      </ProfileContainer>
   )
}

const MenuDropdownTrigger = () => (
   <ProfileButton isTransparent>
      <KebabMenuIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
   </ProfileButton>
);

const MenuDropdownContent = () => (
   <Bucket as="ul" css={[tw`py-2 w-full`, "width: max-content"]}>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Edit your account settings</Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer flex items-center`]}>
         <BlockIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
         Block user
      </Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer flex items-center`]}>
         <ExclamationCircleIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
         Report account
      </Text>
   </Bucket>
);

const FilterDropdownContent = () => (
   <Bucket as="ul" css={[tw`py-2 w-full`, "min-width: 150px;"]}>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Recent Stories</Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Popular Stories</Text>
   </Bucket>
);

const FilterDropdownTrigger = () => (
   <ProfileButton isTransparent>
      Recent Stories
      <ChevronIcon css={[tw`stroke-current text-chill-gray4 w-3 h-3 ml-2 transform rotate-90`]}/>
   </ProfileButton>
);

export default Profile;
