import React from 'react';
import tw from "twin.macro";

import { Bucket, FlexBox, Text, Button } from "..";
import { ReactComponent as Illustration } from "../../assets/svg/500.svg";

const ErrorFallback = ({resetErrorBoundary}) => {
   return (
      <FlexBox css={[tw`w-1/2 mx-auto`, "height: calc(100vh - 4rem)"]}>
         <Illustration />
         <Bucket css={[tw`ml-8`]}>
            <Text css={[tw`text-c-24 font-bold`]}>Ooops!</Text>
            <Text>Something went wrong internally.</Text>
            <Text as="span" css={[tw`inline-flex items-center mt-6 text-chill-indigo2`]}>
               <Button 
                  onClick={resetErrorBoundary}
                  css={[tw`px-4 py-2 bg-chill-indigo2 font-semibold`]}
               >Refresh
               </Button>
            </Text>
         </Bucket>
      </FlexBox>
   )
}

export default ErrorFallback;
