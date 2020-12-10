import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import tw from "twin.macro";

import { StoreContext } from "../../store";
import types from "../../store/types";
import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { CardWrapper, CardOverlay, CardThumbnail, CardDetails } from "./styles";
import { Text, FlexBox, Bucket, Avatar, Image, Tooltip } from "../../components";
import { ReactComponent as EyeIcon } from "../../assets/svg/eye.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/save.svg";
import { ReactComponent as MarkerIcon } from "../../assets/svg/marker.svg";
import { ReactComponent as CommentIcon } from "../../assets/svg/comment.svg";

const StoryCard = ({ story, isSlider, showActionBar, isSmall, isTiny }) => {
   const location = useLocation();
   const context = useContext(StoreContext);
   const { state: { auth: { profile }}, dispatch } = context;
   const [isLiked, setIsLiked] = useState(false);
   const [isSaved, setIsSaved] = useState(false);

   useEffect(() => {
      if(!profile || !profile.likes) return;
      setIsLiked(profile.likes.includes(story._id));
      setIsSaved(profile.collections.includes(story._id));
   }, []);

   const handleStoryAction = async (evt, action) => {
      evt.preventDefault();
      evt.stopPropagation();

      if(!["like", "save"].includes(action)) return;

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(
            requestEndpoints.stories[action](story._id), {
            method: "PATCH"
         });

         if(action === "like") {
            dispatch({
               namespace: "stories",
               type: types.UPDATE_STORIES_FEED,
               payload: response.data.story,
               id: response.data.story._id
            });
         }

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: response.data.user,
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
   }

   return (
      <CardWrapper>
         <CardThumbnail isSlider={isSlider} isSmall={isSmall} isTiny={isTiny} thumbnail={story.thumbnails[0].url}>
            <Link to={{pathname: `/x/story/${story.slug}`, state: {background: location, component: "story"}}}>
            <CardOverlay>
               <FlexBox css={[tw`justify-between items-start`]}>
                  <Bucket css={["max-width: 80%"]}>
                     <Text css={[tw`font-semibold text-white`]} truncate>{story.title}</Text>
                     <Bucket as="span" css={[tw`text-white text-c-12 font-medium inline-flex items-center`]}>
                        <EyeIcon css={[tw`fill-current text-white mr-1`, "margin-bottom: 1px;" ]}/>
                        {story.views > 0 ? story.views : ""}
                     </Bucket>
                  </Bucket>

                  <Bucket css={[tw`flex flex-col items-center`]} onClick={(e) => handleStoryAction(e, "like")}>
                  <Tooltip content="Like this story" placement="left" isLight>
                     <HeartIcon css={[tw`stroke-current text-white w-4 h-4 mt-1 mb-2`]} />
                  </Tooltip>
                  </Bucket>
               </FlexBox>

               <FlexBox css={[tw`justify-between`]}>
                  <Bucket as="span" css={[tw`inline-flex items-center`]}>
                     <MarkerIcon css={[tw`fill-current text-white w-4 h-4`]} />
                     <Text css={[tw`text-c-12 font-semibold text-white ml-1`]}>{story.location}</Text>
                  </Bucket>
                  {!isSlider &&
                     <Bucket css={[tw`inline-flex items-center justify-center`]} onClick={(e) => handleStoryAction(e, "save")}>
                     <Tooltip content="Save to collection" placement="left" isLight>
                        <SaveIcon css={[tw`fill-current text-white w-5 h-5`]} />
                     </Tooltip>
                     </Bucket>
                  }
               </FlexBox>
            </CardOverlay>
            </Link>
         </CardThumbnail>

         { !isSlider && 
            <CardDetails showActionBar={showActionBar}>
               <Link to={`/u/${story.author.username}/stories`}>
               <Avatar css={[tw`mt-2`]}>
                  <Image src={story.author.avatar.url} />
               </Avatar>
               </Link>
               <Text css={[tw`font-semibold ml-2 flex-auto`]} truncate>
                  <Link to={`/u/${story.author.username}/stories`}>
                  {story.author.firstname} {story.author.lastname}
                  </Link>
               </Text>
               <Bucket as="span" css={[tw`ml-2 text-c-12 font-medium text-chill-gray4 inline-flex items-center`]}>
                  <CommentIcon css={[tw`fill-current text-chill-gray4 mr-2 w-4 h-4`]} />
                  {story.comments.length}
               </Bucket>
               <Bucket as="span" css={[tw`ml-2 text-c-12 font-medium text-chill-gray4 inline-flex items-center`]}>
                  <HeartIcon css={[tw`fill-current text-chill-gray4  mr-2`, "width: 1.15rem; height: 1.15rem", isLiked && tw`text-red-400`]} />
                  {story.likes}
               </Bucket>
            </CardDetails>
         }
      </CardWrapper>
   )
}

export default StoryCard
