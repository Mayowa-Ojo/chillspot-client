import tw, { styled, theme } from "twin.macro";
import { Button, Image } from "../../components";

export const StoryWrapper = styled.div`
   ${tw`bg-white mt-10 relative`}

   border-radius: 12px 12px 0 0;
   height: calc(100vh - 2.5rem);
   overflow-y: scroll;
`;

export const StoryContainerInner = styled.div`
   ${tw`bg-white relative`}
   padding: 64px 120px;
`;

export const StoryHeader = styled.header`
   ${tw`flex justify-between w-full`}
`;

export const HeaderButton = styled(Button)`
   ${tw`rounded-md bg-chill-gray2 ml-4 px-4 py-2 text-chill-gray4 font-semibold hover:bg-chill-gray3`}
`;

export const StoryGallery = styled.div`

`;

export const StorySlider = styled.div`
   ${tw`w-full mt-12 overflow-hidden`}

   border-radius: 8px;
   height: 680px;

   .slick-dots {
      bottom: -110px;
      li {
         width: 80px;
         height: 60px;
         margin: 0 8px;
         border-radius: 8px;
         overflow: hidden;
         border: 2px solid transparent;
         &.slick-active {
            border: 2px solid ${theme`colors.chill.indigo1`};
         }
      }
   }

   &:hover {
      .slider-control {
         visibility: visible;
      }
   }
`;

export const StoryImage = styled(Image)`
   height: 560px;
   border-radius: 8px;
`;

export const SliderArrow = styled.span`
   ${tw`inline-flex items-center justify-center w-6 h-6 rounded-full bg-chill-indigo1 absolute z-10 cursor-pointer invisible`}
`;

export const SliderPaging = styled.div`
   width: 80px;
   height: 60px;
   border-radius: 8px;
`;

export const StoryContent = styled.div`
   ${tw`mt-4`}
`;

export const StoryComments = styled.div`
   ${tw`mt-8 w-full`}
`;

export const CommentInputBox = styled.div`
   ${tw`relative rounded-full flex-auto h-10 ml-4 pl-6 pr-10 py-2 bg-chill-gray2 border border-chill-gray2`}

   transition: background-color .2s linear;
   &:hover {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
   }
   &:focus-within {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.2);
   }
   svg {
      top: 10px;
      right: 12px;
   }
`;

export const CommentInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent text-c-15 font-medium text-chill-gray4 focus:outline-none`}

   &::placeholder {
      font-weight: 500;
   }
`;

export const CommentsFooter = styled.div`
   ${tw`flex items-center justify-center max-w-full h-10 ml-5 mt-2`}
   ${tw`rounded-full bg-chill-gray2 border border-chill-gray3 cursor-pointer hover:bg-chill-gray3`}
`;

export const AuthorDetails = styled.div`
   ${tw`flex flex-col items-center mt-20`}
`;

export const MoreStories = styled.div`
   ${tw`mt-16 w-full`}
`;

export const StoriesGrid = styled.div`
   ${tw`mx-auto mt-4 flex flex-wrap justify-between`}
`;

export const ActionsToolbarWrapper = styled.div`
   ${tw`absolute top-0 right-0 h-full mr-10`}
`;

export const ActionsToolbar = styled.div`
   ${tw`flex flex-col items-center sticky z-10`}

   top: 64px;
   transform: translateX(0);
   will-change: transform;
`;

export const ToolbarButton = styled.button`
   ${tw`mb-4 border border-chill-gray2 relative cursor-pointer`}

   padding: 10px 12px;
   border-radius: 8px;
`;

export const ToolbarButtonIndicator = styled.span`
   ${tw`absolute rounded-full border border-chill-gray2 bg-white text-chill-gray4 font-semibold inline-flex items-center justify-center`}

   top: -12px;
   right: -10px;
   min-width: 25px;
   min-height: 25px;
   font-size: 10px;
`;