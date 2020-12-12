import React from 'react';
import tw, { styled } from "twin.macro";

import { Text } from "..";
import { ReactComponent as NoContentIllustration } from "../../assets/svg/no-content.svg";

const NoContentPlaceholder = ({ message }) => {
   return (
      <NoStoriesPlaceholder>
         <NoContentIllustration />
         <Text css={[tw`text-c-18 font-semibold mt-10`]}>{message}</Text>
      </NoStoriesPlaceholder>
   );
}

export const NoStoriesPlaceholder = styled.div`
   ${tw`w-full h-full flex flex-col items-center justify-center py-20`}
`;

export default NoContentPlaceholder;
