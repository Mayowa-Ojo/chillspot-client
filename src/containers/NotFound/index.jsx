import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw from "twin.macro";

import { Bucket, FlexBox, Text } from '../../components';
import { ReactComponent as Illustration } from "../../assets/svg/404.svg";

const NotFound = () => {
   const history = useHistory();

   return (
      <FlexBox css={[tw`w-1/2 mx-auto`, "height: calc(100vh - 4rem)"]}>
         <Illustration />
         <Bucket css={[tw`ml-8`]}>
            <Text css={[tw`text-c-24 font-bold`]}>Ooops!</Text>
            <Text>We searched everywhere but couldn't find the page you requested</Text>
            <Text as="span" css={[tw`inline-flex items-center mt-6 text-chill-indigo2`]}>
               <Bucket 
                  as="span"
                  onClick={history.goBack}
                  css={[tw`cursor-pointer`]}>Go Back</Bucket
               >
               <Bucket as="span" css={[tw`inline-block w-1 h-1 bg-chill-indigo2 rounded-full mx-2`]} />
               <Link to="/">Home</Link>
            </Text>
         </Bucket>
      </FlexBox>
   )
}

export default NotFound
