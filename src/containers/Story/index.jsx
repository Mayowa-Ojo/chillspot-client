import React, { useRef, useState } from 'react';
import tw from "twin.macro";
import Slick from "react-slick";

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
   EmojiPicker } from '../../components';
import { HeaderButton,
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
   ToolbarButtonIndicator} from './styles';
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";
import { ReactComponent as CommentIcon } from "../../assets/svg/comment.svg";
import { ReactComponent as SaveIcon } from "../../assets/svg/save.svg";
import { ReactComponent as ShareIcon } from "../../assets/svg/share.svg";
import { ReactComponent as ChevronIcon } from "../../assets/svg/chevron.svg";
import { ReactComponent as EmojiIcon } from "../../assets/svg/emoji.svg";
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";

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

const SliderPagingFn = (i) => (
   <SliderPaging>
      <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/taj-mahal-1209004_640.jpg" alt="story media gallery thumbnail"/>
   </SliderPaging>
)

const Story = () => {
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
      setComment(e.target.value)
   }

   const setEmojiInput = (emoji) => {
      setComment(`${comment}${emoji.native}`)
   }

   return (
      <StoryWrapper>
         <Bucket css={[tw`relative`]}>
         <ActionsToolbarWrapper>
            <ActionsToolbar>
               <Avatar css={[tw`w-10 h-10 cursor-pointer mb-4`]}>
                  <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image" />
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
            </ActionsToolbar>
         </ActionsToolbarWrapper>

         <StoryContainerInner>
            <FlexBox isCol css={[tw`justify-start mx-auto`, "max-width: 768px"]}>
               <StoryHeader>
                  <FlexBox css={[tw`justify-start`]}>
                     <Avatar css={[tw`w-12 h-12 cursor-pointer`]}>
                        <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image" />
                     </Avatar>
                     <Bucket css={[tw`ml-4`]}>
                        <Text css={[tw`font-bold cursor-pointer`]}>Jonathan Buckenbeur</Text>
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
                     <StoryImage src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/taj-mahal-1209004_640.jpg" alt="story media gallery" />
                     <StoryImage src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/taj-mahal-1209004_640.jpg" alt="story media gallery" />
                  </Slick>
               </StorySlider>

               <StoryContent>
                  <Text css={[tw`text-c-18`]}>Ah, sydney. My experience here was nothing short of amazing. In western Sydney, or westwards from Bankstown, where most Sydneysiders live, winter nights can get cold, reaching 0C a few mornings a year, where frost may be present — Frost is more severe or pronounced in the far western suburbs such as Penrith, Richmond and Campbelltown, which are further inland.</Text>
                  <Text css={[tw`text-c-18 mt-2`]}>More severe or pronounced in the far western suburbs such as Penrith, Richmond and Campbelltown, which are further inland.</Text>
               </StoryContent>

               <StoryComments>
                  <FlexBox>
                     <Divider />
                     <Text css={[tw`text-c-18 font-semibold mx-4`]}>Comments</Text>
                     <Divider />
                  </FlexBox>
                  <FlexBox css={[tw`justify-start mt-8`]}>
                     <Avatar css={[tw`w-10 h-10`]}>
                        <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image"/>
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
                        <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="user avatar" />
                     </Avatar>
                     <Divider css={[tw`w-auto flex-auto border-t-2 border-chill-gray3`]} />
                  </FlexBox>
                  <Text css={[tw`text-c-24 font-bold mt-5`]}>Jonathan Buckenbeur</Text>
                  <Text css={[tw`text-c-18 mt-2`]}>Travel Blogger</Text>
                  <Button css={[tw`px-4 py-2 bg-chill-indigo2 rounded-lg mt-3 inline-flex items-center`]}>
                     <UserFriendsIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]} />
                     Follow
                  </Button>
               </AuthorDetails>

               <MoreStories>
                  <Text css={[tw`text-c-18 font-bold`]}>More by Jonathan Buckenbeur</Text>
                  <StoriesGrid>
                     <StoryCard isSmall />
                     <StoryCard isSmall />
                     <StoryCard isSmall />
                     <StoryCard isSmall />
                  </StoriesGrid>
               </MoreStories>
            </Bucket>
         </StoryContainerInner>
         </Bucket>
      </StoryWrapper>
   )
}

export default Story;
