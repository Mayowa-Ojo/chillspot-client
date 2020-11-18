import React from 'react';
import tw from "twin.macro";

import { Avatar, FlexBox, Image, Text, Bucket } from '..';
import { ActionBar, CommentWrapper } from './styles';
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg"
import { ReactComponent as BrokenHeartIcon } from "../../assets/svg/broken-heart.svg"
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg"
import { ReactComponent as KebabMenuIcon } from "../../assets/svg/kebab-menu.svg"

const Comment = () => {
   return (
      <CommentWrapper>
         <FlexBox isCol css={[tw`mr-2`]}>
            <Avatar css={[tw`w-10 h-10 cursor-pointer`]}>
               <Image src="https://uifaces.co/our-content/donated/gPZwCbdS.jpg" alt="user avatar" />
            </Avatar>
            <Bucket as="span" css={[tw`bg-chill-gray3 rounded-xl mt-2 block flex-auto`, "width: 2px;"]}></Bucket>
         </FlexBox>

         <FlexBox isCol css={[tw`flex-auto items-start pb-5`]}>
            <Text css={[tw`font-bold cursor-pointer`]}>Andrew Garfield</Text>
            <Text css={[tw`text-opacity-75`]}>8 hours ago</Text>
            <Text css={[tw`mt-3`]}>Awesome! I’ve been meaning to visit Sydney for years now. I guess it’s time to check that off my bucket list. Nice pictures btw!</Text>
            <ActionBar>
               <FlexBox>
                  <Bucket as="span" css={[tw`inline-flex items-center text-c-15 font-medium text-chill-gray4`]}>
                     <HeartIcon css={[tw`stroke-current text-chill-gray4 w-4 h-4 mr-2 cursor-pointer`]} />
                     12
                  </Bucket>
                  <Bucket as="span" css={[tw`inline-flex items-center text-c-15 font-medium text-chill-gray4 ml-3`]}>
                     <BrokenHeartIcon css={[tw`fill-current text-chill-gray4 mr-2 cursor-pointer`]} />
                     3
                  </Bucket>
                  <Bucket as="span" css={[tw`ml-3`]}>
                     <EditIcon css={[tw`fill-current text-chill-gray4 mr-2 cursor-pointer`]} />
                  </Bucket>
               </FlexBox>
               <Bucket as="span" css={[tw`inline-flex items-center justify-center w-8 h-8 bg-transparent rounded-full cursor-pointer hover:bg-gray-200`]}>
                  <KebabMenuIcon css={[tw`fill-current text-chill-gray4`]} />
               </Bucket>
            </ActionBar>
         </FlexBox>
      </CommentWrapper>
   )
}

export default Comment;
