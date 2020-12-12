import React, { Fragment, useState, useEffect, useContext, useCallback } from 'react';
import tw from "twin.macro";

import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { StoreContext } from "../../store";
import types from "../../store/types";
import {
   FilterCategories,
   FilterCategory,
   FilterSettings,
   FilterViews,
   FilterViewsContent,
   StoriesFilter,
   StoriesGrid
} from "./styles";
import { Bucket, Dropdown, FlexBox, StoryCard, Text, UserCard, NoContentPlaceholder } from "../../components";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
// import { ReactComponent as LoadingIcon } from "../../assets/svg/loading.svg";
import { Link, useLocation } from "react-router-dom";

const DropdownTrigger = ({ filterView }) => (
   <FilterViews>
      {filterView}
      <ChevronIcon css={[tw`w-3 h-3 stroke-current text-chill-gray4 ml-2 transform rotate-90`]} />
   </FilterViews>
);

const DropdownContent = ({ filterView, setFilterView }) => (
   <FilterViewsContent>
      <Text 
         as="li"
         css={[filterView === "popular" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("popular")}
      >popular</Text>
      <Text 
         as="li"
         css={[filterView === "following" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("following")}
      >following</Text>
      <Text 
         as="li"
         css={[filterView === "approval" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("approval")}
      >approval</Text>
      <Text 
         as="li"
         css={[filterView === "recent" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("recent")}
      >recent</Text>
      <Text 
         as="li"
         css={[tw`border-t border-chill-gray2`, filterView === "recommended" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("recommended")}
      >Recommended</Text>
   </FilterViewsContent>
)

const Stories = () => {
   const location = useLocation();
   const context = useContext(StoreContext);
   const { state: { stories, users, global }, dispatch } = context;
   const [filterView, setFilterView] = useState("recent");
   const [filterCategory, setFilterCategory] = useState("all");

   const fetchFollowSuggestions = async () => {
      try {
         const {data: suggestionsResponse } = await httpRequest(requestEndpoints.users.followSuggestions, {
            method: "GET"
         });

         return suggestionsResponse;
      } catch (err) {
         throw new Error(err);
      }
   };

   const fetchStories = useCallback(async () => {
      const searchQuery = location.search.split("=")[1];
      const validQueries = ["beach", "resort", "park", "museum", "campground", "mountain", "tour"];

      try {
         let storiesResponse;

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         if(searchQuery && validQueries.includes(searchQuery)) {
            const { data: response } = await httpRequest(
               requestEndpoints.stories.byTag(searchQuery), {
               method: "GET"
            });

            storiesResponse = response
         } else {
            const { data: response } = await httpRequest(
               requestEndpoints.stories.feed(filterView, "100"), {
               method: "GET"
            });

            storiesResponse = response;
         }

         const suggestionsResponse = await fetchFollowSuggestions();

         dispatch({
            namespace: "stories",
            type: types.SET_STORIES_FEED,
            payload: storiesResponse.data.stories
         });

         dispatch({
            namespace: "users",
            type: types.SET_SUGGESTED_USERS,
            payload: suggestionsResponse.data.users
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
   }, [dispatch, location, filterView]);

   useEffect(() => {
      void async function() {
         await fetchStories();
      }();
   }, [fetchStories, location, filterView]);

   return (
      <Fragment>
         <StoriesFilter>
            <Dropdown 
               trigger={<DropdownTrigger filterView={filterView} />}
               content={<DropdownContent setFilterView={setFilterView} filterView={filterView} />}
            />
            <FilterCategories>
               <Link to="/stories">
                  <FilterCategory isActive={filterCategory === "all"} onClick={() => setFilterCategory("all")}>all</FilterCategory>
               </Link>
               <Link to="/stories?tag=beach">
                  <FilterCategory isActive={filterCategory === "beach"} onClick={() => setFilterCategory("beach")}>beach</FilterCategory>
               </Link>
               <Link to="/stories?tag=resort">
                  <FilterCategory isActive={filterCategory === "resort"} onClick={() => setFilterCategory("resort")}>resort</FilterCategory>
               </Link>
               <Link to="/stories?tag=park">
                  <FilterCategory isActive={filterCategory === "park"} onClick={() => setFilterCategory("park")}>park</FilterCategory>
               </Link>
               <Link to="/stories?tag=museum">
                  <FilterCategory isActive={filterCategory === "museum"} onClick={() => setFilterCategory("museum")}>museum</FilterCategory>
               </Link>
               <Link to="/stories?tag=campground">
                  <FilterCategory isActive={filterCategory === "campground"} onClick={() => setFilterCategory("campground")}>campground</FilterCategory>
               </Link>
               <Link to="/stories?tag=mountain">
                  <FilterCategory isActive={filterCategory === "mountain"} onClick={() => setFilterCategory("mountain")}>mountain</FilterCategory>
               </Link>
               <Link to="/stories?tag=tour">
                  <FilterCategory isActive={filterCategory === "tour"} onClick={() => setFilterCategory("tour")}>tour</FilterCategory>
               </Link>
            </FilterCategories>
            <FilterSettings>
               <FilterIcon css={[tw`w-4 h-4 fill-current text-chill-gray4 mr-2`]} />
               Filters
            </FilterSettings>
         </StoriesFilter>

         <Bucket css={[tw`px-16`]}>
            {
               global.status === "done" &&
               stories.feed.length < 1 ?
               <NoContentPlaceholder message="No stories to display"/>
               :
               <StoriesGrid>
                  {stories.feed.map((story, idx) => (
                     <StoryCard showActionBar story={story} key={idx}/>
                  ))}
               </StoriesGrid>
            }

            <Bucket css={[tw`my-12`]}>
               {users.suggestedUsers.length > 0 &&
                  <>
                  <Text css={[tw`text-c-21 font-semibold`]}>You might also like stories from...</Text>
                  <FlexBox css={[tw`mt-2 justify-start flex-wrap`]}>
                     {users.suggestedUsers.map((user, idx) => (
                        <UserCard user={user} key={idx}/>
                     ))}
                  </FlexBox>
                  </>
               }
            </Bucket>

            {/* <FlexBox css={[tw`mt-12`]}>
               <LoadingIcon css={[tw`w-12 h-12 mr-4`]} />
               <Text css={[tw`font-semibold`]}>Loading more...</Text>
            </FlexBox> */}
         </Bucket>
      </Fragment>
   )
}

export default Stories;
