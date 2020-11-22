import React, { useContext } from 'react'
import tw from "twin.macro";

import { CardWrapper, CardOverlay, CardThumbnail, CardDetails } from "./styles";
import { Text, FlexBox, Bucket, Avatar, Image } from "../../components";
import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/save.svg";
import { ReactComponent as MarkerIcon } from "../../assets/svg/marker.svg";
import { ReactComponent as CommentIcon } from "../../assets/svg/comment.svg";
import { StoreContext } from "../../store";
import types from "../../store/types";

const StoryCard = ({ isSlider, showActionBar, isSmall }) => {
   const context = useContext(StoreContext);
   const { dispatch } = context;

   const viewStory = () => {
      dispatch({
         namespace: "modal",
         type: types.SET_MODAL_COMPONENT,
         payload: "story"
      });

      dispatch({
         namespace: "modal",
         type: types.TOGGLE_MODAL
      });
   }

   return (
      <CardWrapper>
         <CardThumbnail isSlider={isSlider} isSmall={isSmall}>
            <CardOverlay onClick ={viewStory}>
               <FlexBox css={[tw`justify-between items-start`]}>
                  <Bucket>
                     <Text css={[tw`font-semibold text-white`]}>Niagara Falls</Text>
                     <Bucket as="span" css={[tw`text-white text-c-12 font-medium inline-flex items-center`]}>
                        <StarIcon css={[tw`fill-current text-white w-3 h-3 mr-1`, "margin-bottom: 1px;" ]}/>
                        4.5
                     </Bucket>
                  </Bucket>

                  <Bucket css={[tw`flex flex-col items-center`]}>
                     <HeartIcon css={[tw`stroke-current text-white w-4 h-4 mt-1 mb-2`]} />
                  </Bucket>
               </FlexBox>

               <FlexBox css={[tw`justify-between`]}>
                  <Bucket as="span" css={[tw`inline-flex items-center`]}>
                     <MarkerIcon css={[tw`fill-current text-white w-4 h-4`]} />
                     <Text css={[tw`text-c-12 font-semibold text-white ml-1`]}>Ontario, Canada</Text>
                  </Bucket>
                  { !isSlider && <Bucket css={[tw`inline-flex items-center justify-center`]}>
                     <SaveIcon css={[tw`fill-current text-white w-5 h-5`]} />
                  </Bucket>}
               </FlexBox>
            </CardOverlay>
         </CardThumbnail>

         { !isSlider && 
            <CardDetails showActionBar={showActionBar}>
               <Avatar>
                  <Image src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" />
               </Avatar>
               <Text css={[tw`font-semibold ml-2 flex-auto`]}>Anna Schoger</Text>
               <Bucket as="span" css={[tw`ml-2 text-c-12 font-medium text-chill-gray4 inline-flex items-center`]}>
                  <CommentIcon css={[tw`fill-current text-chill-gray4 mr-2 `]} />
                  14
               </Bucket>
               <Bucket as="span" css={[tw`ml-2 text-c-12 font-medium text-chill-gray4 inline-flex items-center`]}>
                  <HeartIcon css={[tw`fill-current text-chill-gray4  mr-2 w-4 h-4`]} />
                  234
               </Bucket>
            </CardDetails>
         }
      </CardWrapper>
   )
}

export default StoryCard
