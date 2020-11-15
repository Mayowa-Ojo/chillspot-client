import React from 'react'
import tw from "twin.macro";

import { CardWrapper, CardOverlay } from "./styles";
import { Text, FlexBox, Bucket } from "../../components";
import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as BookmarkIcon } from "../../assets/svg/bookmark.svg";
import { ReactComponent as MarkerIcon } from "../../assets/svg/marker.svg";

const StoryCard = () => {
   return (
      <CardWrapper>
         <CardOverlay>
            <FlexBox css={[tw`justify-between items-start`]}>
               <Bucket>
                  <Text css={[tw`font-semibold text-white`]}>Niagara Falls</Text>
                  <Bucket as="span" css={[tw`text-white text-c-12 font-medium inline-flex items-center`]}>
                     <StarIcon css={[tw`fill-current text-white w-3 h-3 mr-1`, "margin-bottom: 1px;" ]}/>
                     4.5
                  </Bucket>
               </Bucket>

               <Bucket css={[tw`flex flex-col items-center`]}>
                  <HeartIcon css={[tw`stroke-current text-white w-4 h-4 mt-1`]} />
                  <Bucket css={[tw`inline-flex items-center justify-center rounded-full bg-chill-indigo1 w-6 h-6 mt-2`]}>
                     <BookmarkIcon css={[tw`fill-current text-white w-3 h-3`]} />
                  </Bucket>
               </Bucket>
            </FlexBox>

            <FlexBox css={[tw`justify-start`]}>
               <MarkerIcon css={[tw`fill-current text-white w-4 h-4`]} />
               <Text css={[tw`text-c-12 font-semibold text-white ml-1`]}>Ontario, Canada</Text>
            </FlexBox>
         </CardOverlay>
      </CardWrapper>
   )
}

export default StoryCard
