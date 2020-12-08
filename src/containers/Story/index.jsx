import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import tw from "twin.macro";
import Slick from "react-slick";
import { Link, useLocation } from 'react-router-dom';

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
   EmojiPicker,
   NoContentPlaceholder,
   Dropdown
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
import { ReactComponent as KebabMenuIcon } from "../../assets/svg/kebab-menu.svg";

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
   const { 
      state: { 
         stories: { currentStory, currentStoryComments, moreStoriesFromUser },
         global,
         auth: { profile }
      },
      dispatch 
   } = context;
   const [isLiked, setIsLiked] = useState(false);
   const [isSaved, setIsSaved] = useState(false);
   const [isFollowing, setIsFollowing] = useState(false);

   useEffect(() => {
      if(!currentStory || !profile || !profile.likes) return;

      setIsLiked(profile.likes.includes(currentStory._id));
      setIsSaved(profile.collections.includes(currentStory._id));
      setIsFollowing(profile.following.includes(currentStory.author._id));
   }, []);


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

   const handleCommentSubmit = async (e) => {
      if(comment === "") return;

      if(e.key === "Enter") {
         try {
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "loading"
            });
   
            const { data: newCommentResponse } = await httpRequest(
               requestEndpoints.comments.create(currentStory._id), {
               method: "POST",
               data: {
                  content: comment
               }
            });

            dispatch({
               namespace: "stories",
               type: types.SET_CURRENT_STORY_COMMENTS,
               payload: newCommentResponse.data.comments
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
         setComment("");
      }
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

         const { data: commentsResponse } = await httpRequest(
            requestEndpoints.stories.comments(response.data.story._id), {
            method: "GET"
         });

         const { data: moreStoriesResponse } = await httpRequest(
            requestEndpoints.users.stories(response.data.story.author._id), {
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
            type: types.SET_CURRENT_STORY_COMMENTS,
            payload: commentsResponse.data.comments
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

   const handleStoryAction = async (action) => {
      if(!["save", "like"].includes(action)) return;

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: updateStoryResponse } = await httpRequest(
            requestEndpoints.stories[action](currentStory._id), {
            method: "PATCH"
         });

         if(action === "like") {
            dispatch({
               namespace: "stories",
               type: types.SET_CURRENT_STORY,
               payload: updateStoryResponse.data.story
            });
         }

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: updateStoryResponse.data.user,
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

   const handleUserAction = async (action) => {
      if(!["follow", "unfollow"].includes(action)) return;

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: updateUserResponse } = await httpRequest(
            requestEndpoints.users[action](currentStory.author._id), {
            method: "PATCH"
         });

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: updateUserResponse.data.user,
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
                     <ToolbarButtonIndicator>{currentStoryComments.length}</ToolbarButtonIndicator>
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
                     <ToolbarButtonIndicator>{currentStory.likes}</ToolbarButtonIndicator>
                  </ToolbarButton>
               </Tooltip>
               <Tooltip content="Share" placement="left">
                  <ToolbarButton>
                     <ShareIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
                  </ToolbarButton>
               </Tooltip>
               {currentStory.author._id === profile._id &&
                  <Dropdown
                     content={<ToolbarDropdownContent />}
                     trigger={<ToolbarDropdownTrigger />}
                     placement="left"
                  />
               }
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
                        <Link to={`/u/${currentStory.author.username}/stories`}>
                        <Avatar css={[tw`w-12 h-12 cursor-pointer`]}>
                           <Image src={currentStory.author.avatar.url} alt="profile image" />
                        </Avatar>
                        </Link>
                        <Bucket css={[tw`ml-4`]}>
                           <Link to={`/u/${currentStory.author.username}/stories`}>
                              <Text css={[tw`font-bold cursor-pointer`]}>
                                 {currentStory.author.firstname} {currentStory.author.lastname}
                              </Text>
                           </Link>
                           <Bucket as="span" css={[tw`inline-flex items-center`]}>
                              <Text>Travel blogger</Text>
                              <Bucket as="span" css={[tw`w-1 h-1 bg-chill-gray4 inline-block rounded-full mx-2`]} />
                              <Text
                                 css={[tw`font-semibold cursor-pointer hover:text-chill-indigo1`]}
                                 onClick={() => handleUserAction(isFollowing ? "unfollow" : "follow")}
                              >{isFollowing ? "Following" : "Follow"}</Text>
                           </Bucket>
                        </Bucket>
                     </FlexBox>
                     <FlexBox>
                        <HeaderButton onClick={() => handleStoryAction("save")}>
                           {isSaved ? "Saved" : "Save"}
                        </HeaderButton>
                        <HeaderButton css={[tw`inline-flex items-center`]} onClick={() => handleStoryAction("like")}>
                           <HeartIcon css={[tw`w-4 h-4 fill-current text-chill-gray4 mr-2`]} />
                           {isLiked ? "Liked" : "Like"}
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
                     <Bucket 
                        as="span"
                        css={[tw`px-2 py-1 inline-block bg-chill-indigo1 bg-opacity-25 text-chill-indigo1 text-c-12 font-semibold mt-1 rounded`]}
                     >
                        {currentStory.location}
                     </Bucket>
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
                           <Image src={profile.avatar.url} alt="profile image"/>
                        </Avatar>
                        <CommentInputBox>
                           <CommentInput 
                              placeholder="Add a comment"
                              value={comment}
                              onChange={handleCommentInput} 
                              onKeyDown={handleCommentSubmit}
                           />
                           <EmojiIcon css={[tw`fill-current text-chill-gray4 absolute cursor-pointer`]} onClick={() => emojiRef.current.toggleEmojiPicker()} />
                           <EmojiPicker style={{position: "absolute", right: 0, top: 50}} ref={emojiRef} setEmoji={setEmojiInput} />
                        </CommentInputBox>
                     </FlexBox>
                     <Bucket css={[tw`mt-8`]}>
                        {currentStoryComments.length < 1 ?
                           <NoContentPlaceholder message="No Comments to display" action="Refresh"/>
                        :
                           currentStoryComments.map((comment, idx) => (
                              <Comment comment={comment} key={idx}/>
                           ))
                        }
                     </Bucket>
                     {currentStoryComments.length > 0 &&
                        <CommentsFooter>
                           <Text>View More Comments</Text>
                           <ChevronIcon css={[tw`w-3 h-3 stroke-current text-chill-gray4 ml-2 transform rotate-90`]} />
                        </CommentsFooter>
                     }
                  </StoryComments>
               </FlexBox>

               <Bucket>
                  <AuthorDetails>
                     <FlexBox css={[tw`justify-start w-full`]}>
                        <Divider css={[tw`w-auto flex-auto border-t-2 border-chill-gray3`]} />
                        <Link to={`/u/${currentStory.author.username}/stories`}>
                           <Avatar css={[tw`w-20 h-20 mx-5`]}>
                              <Image src={currentStory.author.avatar.url} alt="user avatar" />
                           </Avatar>
                        </Link>
                        <Divider css={[tw`w-auto flex-auto border-t-2 border-chill-gray3`]} />
                     </FlexBox>
                     <Link to={`/u/${currentStory.author.username}/stories`}>
                        <Text css={[tw`text-c-24 font-bold mt-5`]}>{currentStory.author.firstname} {currentStory.author.lastname}</Text>
                     </Link>
                     <Text css={[tw`text-c-18 mt-2`]}>Travel Blogger</Text>
                     <Button
                        css={[tw`px-4 py-2 bg-chill-indigo2 rounded-lg mt-3 inline-flex items-center`]}
                        onClick={() => handleUserAction(isFollowing ? "unfollow" : "follow")}
                     >
                        <UserFriendsIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]} />
                        {isFollowing ? "Following" : "Follow"}
                     </Button>
                  </AuthorDetails>

                  <MoreStories>
                     <Text css={[tw`text-c-18 font-bold`]}>More by {currentStory.author.firstname} {currentStory.author.lastname}</Text>
                     <StoriesGrid>
                        {moreStoriesFromUser.map((story, idx) => (
                           <StoryCard isSmall story={story} key={idx}/>
                        ))}
                     </StoriesGrid>
                  </MoreStories>
               </Bucket>
            </StoryContainerInner>
         </Bucket>
         }
      </StoryWrapper>
   )
}

const ToolbarDropdownContent = () => (
   <Bucket as="ul" css={[tw`py-2 w-full`, "width: max-content"]}>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Archive story</Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Disable comments</Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`]}>Delete story</Text>
   </Bucket>
);

const ToolbarDropdownTrigger = () => (
   <Tooltip content="More actions" placement="left">
   <ToolbarButton css={[tw`-mb-1`]}>
      <KebabMenuIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
   </ToolbarButton>
   </Tooltip>
)

export default Story;
