import React from 'react';
import tw, { styled } from "twin.macro";

import { Text, Button } from "..";
import { ReactComponent as NoContentIllustration } from "../../assets/svg/no-content.svg";

const NoContentPlaceholder = ({ message, action }) => {
   return (
      <NoStoriesPlaceholder>
         <NoContentIllustration />
         <Text css={[tw`text-c-18 font-semibold mt-10`]}>{message}</Text>
         <Button css={[tw`mt-4 py-2 px-4 bg-chill-indigo2 rounded-lg`]}>{action.text}</Button>
      </NoStoriesPlaceholder>
   );
}

export const NoStoriesPlaceholder = styled.div`
   ${tw`w-full h-full flex flex-col items-center justify-center py-20`}
`;

export default NoContentPlaceholder;
