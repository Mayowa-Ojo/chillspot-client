import React, { Fragment, useState } from 'react'
import tw from "twin.macro";

import {
   FilterCategories,
   FilterCategory,
   FilterSettings,
   FilterViews,
   FilterViewsContent,
   StoriesFilter,
   StoriesGrid
} from './styles';
import { Bucket, Dropdown, FlexBox, StoryCard, Text, UserCard } from '../../components';
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
import { ReactComponent as LoadingIcon } from "../../assets/svg/loading.svg";

const DropdownTrigger = ({ filterView }) => (
   <FilterViews>
      {filterView}
      <ChevronIcon css={[tw`w-3 h-3 stroke-current text-chill-gray4 ml-2 transform rotate-90`]} />
   </FilterViews>
)
const DropdownContent = ({ filterView, setFilterView }) => (
   <FilterViewsContent>
      <Text 
         as="li"
         css={[filterView === "popular" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("popular")}
      >popular</Text>
      <Text 
         as="li"
         css={[filterView === "rating" && tw`text-chill-indigo2`]}
         onClick={() => setFilterView("rating")}
      >rating</Text>
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
   const [filterView, setFilterView] = useState("popular");
   const [filterCategory, setFilterCategory] = useState("all");

   return (
      <Fragment>
         <StoriesFilter>
            <Dropdown 
               trigger={<DropdownTrigger filterView={filterView} />}
               content={<DropdownContent setFilterView={setFilterView} filterView={filterView} />}
            />
            <FilterCategories>
               <FilterCategory isActive={filterCategory === "all"} onClick={() => setFilterCategory("all")}>all</FilterCategory>
               <FilterCategory isActive={filterCategory === "beach"} onClick={() => setFilterCategory("beach")}>beach</FilterCategory>
               <FilterCategory isActive={filterCategory === "resort"} onClick={() => setFilterCategory("resort")}>resort</FilterCategory>
               <FilterCategory isActive={filterCategory === "park"} onClick={() => setFilterCategory("park")}>park</FilterCategory>
               <FilterCategory isActive={filterCategory === "museum"} onClick={() => setFilterCategory("museum")}>museum</FilterCategory>
               <FilterCategory isActive={filterCategory === "campground"} onClick={() => setFilterCategory("campground")}>campground</FilterCategory>
               <FilterCategory isActive={filterCategory === "mountain"} onClick={() => setFilterCategory("mountain")}>mountain</FilterCategory>
               <FilterCategory isActive={filterCategory === "desert"} onClick={() => setFilterCategory("desert")}>desert</FilterCategory>
            </FilterCategories>
            <FilterSettings>
               <FilterIcon css={[tw`w-4 h-4 fill-current text-chill-gray4 mr-2`]} />
               Filters
            </FilterSettings>
         </StoriesFilter>

         <Bucket css={[tw`px-16`]}>
            <StoriesGrid>
               <StoryCard />
               <StoryCard />
               <StoryCard />
               <StoryCard />
               <StoryCard />
               <StoryCard />
               <StoryCard />
               <StoryCard />
            </StoriesGrid>

            <Bucket css={[tw`mt-20`]}>
               <Text css={[tw`text-c-21 font-semibold`]}>You might also like stories from...</Text>
               <FlexBox css={[tw`mt-10 justify-between`]}>
                  <UserCard />
                  <UserCard />
                  <UserCard />
               </FlexBox>
            </Bucket>

            <FlexBox css={[tw`mt-12`]}>
               <LoadingIcon css={[tw`w-12 h-12 mr-4`]} />
               <Text css={[tw`font-semibold`]}>Loading more...</Text>
            </FlexBox>
         </Bucket>
      </Fragment>
   )
}

export default Stories;
