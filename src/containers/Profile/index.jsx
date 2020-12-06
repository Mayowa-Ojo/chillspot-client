import React, { useCallback, useEffect, useContext } from "react";
import { Switch, Route, Link, useRouteMatch, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";

import { StoreContext } from "../../store";
import types from "../../store/types";
import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { 
   Avatar,
   Bucket,
   FlexBox,
   Image,
   Text,
   Dropdown,
   Button,
   StoryCard,
   NoContentPlaceholder } from "../../components";
import { 
   ActiveTabIndicator,
   FriendsListItem,
   FriendsListWrapper,
   ProfileButton,
   ProfileContainer,
   ProfileInfo,
   ProfileNavigation,
   ProfileNavItem,
   StoriesGridWrapper } from './styles';
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";
import { ReactComponent as KebabMenuIcon } from "../../assets/svg/kebab-menu.svg";
import { ReactComponent as ExclamationCircleIcon } from "../../assets/svg/exclamation-circle.svg";
import { ReactComponent as BlockIcon } from "../../assets/svg/block.svg";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as CogIcon } from "../../assets/svg/cog.svg";

const Profile = () => {
   const { path, url } = useRouteMatch();
   const location = useLocation();
   const params = useParams()
   const username = params["username"];
   const context = useContext(StoreContext);
   const { state: { users: { currentUser }, auth, global }, dispatch } = context;
   const activeTab = location.pathname.split("/")[3];

   const fetchUser = useCallback(async () => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(
            requestEndpoints.users.oneByQuery(`q=${username}`), {
            method: "GET"
         });

         const { data: storiesByUserResponse } = await httpRequest(
            requestEndpoints.users.stories(response.data.user._id), {
            method: "GET"
         });

         const user = { ...response.data.user, stories: storiesByUserResponse.data.stories };

         dispatch({
            namespace: "users",
            type: types.SET_CURRENT_USER,
            payload: user
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Oops! something went wrong, please check your network and try again."
            }
         });
         console.error(err.response || err.message);
      }
   }, [dispatch, username]);

   const fetchMoreUserData = useCallback(async () => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(
            requestEndpoints.users.moreData(currentUser._id, activeTab), {
            method: "GET"
         });

         dispatch({
            namespace: "users",
            type: types.SET_MORE_USER_DATA,
            payload: response.data[activeTab],
            key: activeTab
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Oops! something went wrong, please check your network and try again."
            }
         });
         console.error(err.response || err.message);
      }
   }, [currentUser, dispatch, activeTab]);

   useEffect(() => {
      void async function() {
         await fetchUser();
      }();
   }, [fetchUser]);

   useEffect(() => {
      if(activeTab === "stories") return;
      void async function() {
         await fetchMoreUserData();
      }();
   }, [activeTab]);

   return (
      global.status === "done" && currentUser &&
      <ProfileContainer>
         <ProfileInfo>
            <Avatar css={[tw`w-32 h-32`]}>
               <Image src={currentUser.avatar.url} alt="profile image" />
            </Avatar>
            <FlexBox isCol css={[tw`items-start justify-start ml-10`]}>
               <Text css={[tw`text-2xl font-bold mt-2`]}>{currentUser.firstname} {currentUser.lastname}</Text>
               <Text css={[tw`text-c-18`]}>{currentUser.bio}</Text>
               <FlexBox css={[tw`justify-start mt-4`]}>
                  {currentUser.username === auth.profile.username ?
                     <Link to="/account/profile">
                     <ProfileButton isTransparent>
                        <CogIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
                        Edit Profile
                     </ProfileButton>
                     </Link>
                     :
                     <ProfileButton>
                        <UserFriendsIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
                        Follow
                     </ProfileButton>
                  }
                  <Dropdown 
                     trigger={<MenuDropdownTrigger />}
                     content={<MenuDropdownContent />}
                  />
               </FlexBox>
            </FlexBox>
         </ProfileInfo>
         <ProfileNavigation>
            <Bucket as="ul" css={[tw`py-8 flex items-center`]}>
               <Link to={`${url}/stories`}>
               <ProfileNavItem isActive={activeTab === "stories"}>
                  <ActiveTabIndicator/>
                  Stories
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>0</Bucket>
               </ProfileNavItem>
               </Link>
               <Link to={`${url}/likes`}>
               <ProfileNavItem isActive={activeTab === "likes"}>
                  <ActiveTabIndicator />
                  Likes
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>22</Bucket>
               </ProfileNavItem>
               </Link>
               <Link to={`${url}/followers`}>
               <ProfileNavItem isActive={activeTab === "followers"}>
                  <ActiveTabIndicator />
                  Followers
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>1,280</Bucket>
               </ProfileNavItem>
               </Link>
               <Link to={`${url}/following`}>
               <ProfileNavItem isActive={activeTab === "following"}>
                  <ActiveTabIndicator />
                  Following
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>470</Bucket>
               </ProfileNavItem>
               </Link>
               <Link to={`${url}/collections`}>
               <ProfileNavItem isActive={activeTab === "collections"}>
                  <ActiveTabIndicator />
                  Collections
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>2</Bucket>
               </ProfileNavItem>
               </Link>
               <Link to={`${url}/archive`}>
               <ProfileNavItem isActive={activeTab === "archive"}>
                  <ActiveTabIndicator />
                  Archive
                  <Bucket as="span" css={[tw`font-medium text-chill-gray3 ml-2`]}>2</Bucket>
               </ProfileNavItem>
               </Link>
               <Bucket css={[tw`inline-flex flex-auto justify-end -mr-4`]}>
                  <Dropdown 
                     trigger={<FilterDropdownTrigger />}
                     content={<FilterDropdownContent />}
                  />
               </Bucket>
            </Bucket>
         </ProfileNavigation>

         <Switch>
            <Route path={`${path}/stories`} children={<StoriesGrid currentUser={currentUser} tab={activeTab} />} />
            <Route path={`${path}/likes`} children={<StoriesGrid currentUser={currentUser} tab={activeTab} />} />
            <Route path={`${path}/followers`} children={<FriendsList currentUser={currentUser} tab={activeTab} />} />
            <Route path={`${path}/following`} children={<FriendsList currentUser={currentUser} tab={activeTab} />} />
            <Route path={`${path}/collections`} children={<StoriesGrid currentUser={currentUser} tab={activeTab} />} />
            <Route path={`${path}/archive`} children={<StoriesGrid currentUser={currentUser} tab={activeTab} />} />
         </Switch>
      </ProfileContainer>
   );
}

const StoriesGrid = ({ currentUser, tab }) => {
   return (
      currentUser[tab].length < 1 ?
      <NoContentPlaceholder message={`No ${tab} to display`} action={{text: "Refresh"}} />
      :
      <StoriesGridWrapper>
         <Bucket as="ul">
            {currentUser[tab].map(story => (
               <StoryCard story={story} />
            ))
            }
         </Bucket>
      </StoriesGridWrapper>
   )
}

const FriendsList = ({ currentUser, tab }) => {
   return (
      currentUser[tab].length < 1 ?
      <NoContentPlaceholder message={`No ${tab} to display`} action={{text: "Refresh"}} />
      :
      <FriendsListWrapper>
         <Bucket css={[tw`px-16`]}>
            <Text css={[tw`text-c-24 font-semibold`]}>5,756 followers</Text>
            <Bucket as="ul" css={[tw`mt-6`]}>
               {currentUser[tab].map((user, idx) => (
                  <FriendsListItem key={idx}>
                     <Avatar css={[tw`w-20 h-20`, "min-width: 5rem;"]}>
                        <Image src={user.avatar.url} alt="user avatar"/>
                     </Avatar>
                     <FlexBox isCol css={[tw`h-full items-start justify-between ml-4`]}>
                        <Bucket as="span">
                           <Text css={[tw`font-semibold`]}>{user.firstname} {user.lastname}</Text>
                           <Text>{user.bio}</Text>
                        </Bucket>
                        <FlexBox css={[tw`items-start justify-start mt-2`]}>
                           <Button css={[tw`bg-chill-gray2 text-chill-gray4 rounded-md hover:bg-chill-gray3`]}>Follow</Button>
                           <FlexBox isCol css={[tw`items-start ml-4`]}>
                              <Text css={[tw`text-c-12 font-semibold`]}>{user.followers.length}</Text>
                              <Text css={[tw`text-c-12`]}>followers</Text>
                           </FlexBox>
                        </FlexBox>
                     </FlexBox>
                     <FlexBox css={[tw`justify-start ml-8`]}>
                        {user.stories.map(story => (
                           <StoryCard isTiny story={story} />
                        ))
                        }
                     </FlexBox>
                  </FriendsListItem>
               ))}
            </Bucket>
         </Bucket>
      </FriendsListWrapper>
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
