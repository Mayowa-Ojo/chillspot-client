import tw, { styled, theme } from "twin.macro";

export const CommentWrapper = styled.div`
   ${tw`flex mt-2`}
`;

export const ActionBar = styled.div`
   ${tw`w-full flex items-center justify-between mt-3`}
`;

export const CommentInputBox = styled.div`
   ${tw`relative rounded-full flex-auto h-10 mt-2 w-full pl-6 pr-10 py-2 bg-chill-gray2 border border-chill-gray2`}

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