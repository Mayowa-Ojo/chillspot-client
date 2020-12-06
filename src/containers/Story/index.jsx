import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import tw from "twin.macro";
import Slick from "react-slick";
import { useLocation } from 'react-router-dom';

import { StoreContext } from "../../store";
import types from "../../store/types";
import { requestEndpoints } from "../../constants";
import httpRequest from "../../services/http";
import { serializer } from "../../utils/common";

import { 
   Avatar,
   Bucket,
   FlexBox,
   Image,
   Text,
   Comment,
   Divider,
   Button,
   StoryCard,
   Tooltip, 
   EmojiPicker
} from '../../components';
import { 
   HeaderButton,
   StoryHeader,
   StoryImage,
   StorySlider,
   StoryWrapper,
   SliderArrow,
   SliderPaging,
   StoryContent,
   StoryComments,
   CommentInputBox,
   CommentInput,
   CommentsFooter,
   AuthorDetails,
   MoreStories,
   StoriesGrid,
   ActionsToolbar,
   ActionsToolbarWrapper,
   StoryContainerInner, 
   ToolbarButton,
   ToolbarButtonIndicator,
   StoryTag,
   StoryTextBox
} from './styles';
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as CommentIcon } from "../../assets/svg/comment.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/save.svg";
import { ReactComponent as ShareIcon } from "../../assets/svg/share.svg";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as EmojiIcon } from "../../assets/svg/emoji.svg";
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete.svg";

const SliderArrowPrev = ({ onClick }) => (
   <SliderArrow className="slider-control" css={["left: 4px; top: 50%; transform: translate(0, -50%);"]} onClick={onClick}>
      <ChevronIcon css={[tw`w-2 h-2 stroke-current text-white transform rotate-180`]} />
   </SliderArrow>
);

const SliderArrowNext = ({ onClick }) => (
   <SliderArrow className="slider-control" css={["right: 4px; top: 50%; transform: translate(0, -50%);"]} onClick={onClick}>
      <ChevronIcon css={[tw`w-2 h-2 stroke-current text-white`]} />
   </SliderArrow>
);

const AppendStoryContent = ({ content }) => {
   const getContent = () => ({ __html: serializer(JSON.parse(content)) });
   return (
      <StoryTextBox dangerouslySetInnerHTML={ getContent() } />
   );
}

const Story = () => {
   const location = useLocation()
   const context = useContext(StoreContext);
   const { state: { stories: { currentStory, moreStoriesFromUser }, global }, dispatch } = context;

   const SliderPagingFn = (i) => (
      <SliderPaging>
         <Image src={currentStory.thumbnails[i].url} alt="story media gallery thumbnail"/>
      </SliderPaging>
   );

   const sliderSettings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 300,
      className: "chillspot-carousel",
      nextArrow: <SliderArrowNext />,
      prevArrow: <SliderArrowPrev />,
      customPaging: SliderPagingFn
   }

   const emojiRef = useRef(null);

   const [comment, setComment] = useState("");

   const handleCommentInput = (e) => {
      setComment(e.target.value);
   }

   const setEmojiInput = (emoji) => {
      setComment(`${comment}${emoji.native}`);
   }

   const fetchStory = useCallback(async () => {
      let slug = location.pathname.split("/");
      slug = slug[slug.length-1];

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(requestEndpoints.stories.oneBySlug(slug), {
            method: "GET"
         });

         const { data: moreStoriesResponse } = await httpRequest(requestEndpoints.users.stories(response.data.story.author._id), {
            method: "GET"
         });

         moreStoriesResponse.data.stories.forEach(story => {
            story.author = response.data.story.author;
         });

         dispatch({
            namespace: "stories",
            type: types.SET_CURRENT_STORY,
            payload: response.data.story
         });

         dispatch({
            namespace: "stories",
            type: types.SET_MORE_STORIES_FROM_USER,
            payload: moreStoriesResponse.data.stories
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
   }, [dispatch, location]);

   useEffect(() => {
      void async function() {
         await fetchStory();
      }();
   }, [fetchStory]);

   return (
      <StoryWrapper>
         {global.status === "done" && currentStory &&
         <Bucket css={[tw`relative`]}>
         <ActionsToolbarWrapper>
            <ActionsToolbar>
               <Avatar css={[tw`w-10 h-10 cursor-pointer mb-4`]}>
                  <Image src={currentStory.author.avatar.url} alt="profile image" />
               </Avatar>
               <Tooltip content="Comment" placement="left">
                  <ToolbarButton>
                     <CommentIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                     <ToolbarButtonIndicator>23</ToolbarButtonIndicator>
                  </ToolbarButton>
               </Tooltip>
               <Tooltip content="Save" placement="left">
                  <ToolbarButton>
                     <SaveIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                  </ToolbarButton>
               </Tooltip>
               <Tooltip content="Like" placement="left">
                  <ToolbarButton>
                     <HeartIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                     <ToolbarButtonIndicator>175</ToolbarButtonIndicator>
                  </ToolbarButton>
               </Tooltip>
               <Tooltip content="Share" placement="left">
                  <ToolbarButton>
                     <ShareIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                  </ToolbarButton>
               </Tooltip>
               <Tooltip content="Delete" placement="left">
                  <ToolbarButton>
                     <DeleteIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                  </ToolbarButton>
               </Tooltip>
            </ActionsToolbar>
         </ActionsToolbarWrapper>

            <StoryContainerInner>
               <FlexBox isCol css={[tw`justify-start items-start mx-auto`, "max-width: 768px"]}>
                  <FlexBox css={[tw`justify-start`]}>
                     { currentStory.tags.map((tag, idx) => 
                        <StoryTag key={idx}>{tag}</StoryTag>
                     )}
                  </FlexBox>
                  <StoryHeader>
                     <FlexBox css={[tw`justify-start`]}>
                        <Avatar css={[tw`w-12 h-12 cursor-pointer`]}>
                           <Image src={currentStory.author.avatar.url} alt="profile image" />
                        </Avatar>
                        <Bucket css={[tw`ml-4`]}>
                           <Text css={[tw`font-bold cursor-pointer`]}>{currentStory.author.firstname} {currentStory.author.lastname}</Text>
                           <Bucket as="span" css={[tw`inline-flex items-center`]}>
                              <Text>Travel blogger</Text>
                              <Bucket as="span" css={[tw`w-1 h-1 bg-chill-gray4 inline-block rounded-full mx-2`]} />
                              <Text css={[tw`font-semibold cursor-pointer hover:text-chill-indigo1`]}>Follow</Text>
                           </Bucket>
                        </Bucket>
                     </FlexBox>
                     <FlexBox>
                        <HeaderButton>Save</HeaderButton>
                        <HeaderButton css={[tw`inline-flex items-center`]}>
                           <HeartIcon css={[tw`w-4 h-4 fill-current text-chill-gray4 mr-2`]} />
                           Like
                        </HeaderButton>
                     </FlexBox>
                  </StoryHeader>

                  <StorySlider>
                     <Slick {...sliderSettings}>
                        {currentStory.thumbnails.map((thumbnail, idx) => 
                           <StoryImage src={thumbnail.url} alt="story media gallery" key={idx} />
                        )}
                     </Slick>
                  </StorySlider>

                  <StoryContent>
                     <Text css={[tw`text-c-24 font-semibold`]}>{currentStory.title}</Text>
                     <Bucket as="span" css={[tw`px-2 py-1 inline-block bg-chill-indigo1 bg-opacity-25 text-chill-indigo1 text-c-12 font-semibold mt-1 rounded`]}>{currentStory.location}</Bucket>
                     <AppendStoryContent content={currentStory.content}/>
                  </StoryContent>

                  <StoryComments>
                     <FlexBox>
                        <Divider />
                        <Text css={[tw`text-c-18 font-semibold mx-4`]}>Comments</Text>
                        <Divider />
                     </FlexBox>
                     <FlexBox css={[tw`justify-start mt-8`]}>
                        <Avatar css={[tw`w-10 h-10`]}>
                           <Image src={currentStory.author.avatar.url} alt="profile image"/>
                        </Avatar>
                        <CommentInputBox>
                           <CommentInput placeholder="Add a comment" value={comment} onChange={handleCommentInput} />
                           <EmojiIcon css={[tw`fill-current text-chill-gray4 absolute cursor-pointer`]} onClick={() => emojiRef.current.toggleEmojiPicker()} />
                           <EmojiPicker style={{position: "absolute", right: 0, top: 50}} ref={emojiRef} setEmoji={setEmojiInput} />
                        </CommentInputBox>
                     </FlexBox>
                     <Bucket css={[tw`mt-8`]}>
                        <Comment />
                        <Comment />
                     </Bucket>
                     <CommentsFooter>
                        <Text>View More Comments</Text>
                        <ChevronIcon css={[tw`w-3 h-3 stroke-current text-chill-gray4 ml-2 transform rotate-90`]} />
                     </CommentsFooter>
                  </StoryComments>
               </FlexBox>

               <Bucket>
                  <AuthorDetails>
                     <FlexBox css={[tw`justify-start w-full`]}>
                        <Divider css={[tw`w-auto flex-auto border-t-2 border-chill-gray3`]} />
                        <Avatar css={[tw`w-20 h-20 mx-5`]}>
                           <Image src={currentStory.author.avatar.url} alt="user avatar" />
                        </Avatar>
                        <Divider css={[tw`w-auto flex-auto border-t-2 border-chill-gray3`]} />
                     </FlexBox>
                     <Text css={[tw`text-c-24 font-bold mt-5`]}>{currentStory.author.firstname} {currentStory.author.lastname}</Text>
                     <Text css={[tw`text-c-18 mt-2`]}>Travel Blogger</Text>
                     <Button css={[tw`px-4 py-2 bg-chill-indigo2 rounded-lg mt-3 inline-flex items-center`]}>
                        <UserFriendsIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]} />
                        Follow
                     </Button>
                  </AuthorDetails>

                  <MoreStories>
                     <Text css={[tw`text-c-18 font-bold`]}>More by {currentStory.author.firstname} {currentStory.author.lastname}</Text>
                     <StoriesGrid>
                        {moreStoriesFromUser.map((story, idx) => (
                              <StoryCard isSmall story={story} key={idx}/>
                           ))
                        }
                     </StoriesGrid>
                  </MoreStories>
               </Bucket>
            </StoryContainerInner>
         </Bucket>
         }
      </StoryWrapper>
   )
}

export default Story;
