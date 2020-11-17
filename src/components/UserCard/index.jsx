import React from 'react';
import tw from "twin.macro";

import { Avatar, Image, Text, Button } from '../../components';
import { CardWrapper, CardAvatar, CardStats, CardStat, CardStatsDivider } from './styles';
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";

const UserCard = () => {
   return (
      <CardWrapper>
         <CardAvatar css={[tw`cursor-pointer`]}>
            <Avatar>
               <Image src="https://uifaces.co/our-content/donated/KtCFjlD4.jpg" alt="profile picture" />
            </Avatar>
         </CardAvatar>
         <Text css={[tw`text-c-21 font-semibold mt-2 cursor-pointer`]}>Mike Gosling</Text>
         <Text css={[tw`mt-2 text-center`]}>24yr old | Professional Photograher | Loves nature</Text>
         <CardStats>
            <CardStat>
               <Text css={[tw`font-semibold text-opacity-50`]}>Stories</Text>
               <Text css={[tw`font-semibold text-c-24`]}>20</Text>
            </CardStat>
            <CardStatsDivider />
            <CardStat>
               <Text css={[tw`font-semibold text-opacity-50`]}>Followers</Text>
               <Text css={[tw`font-semibold text-c-24`]}>542</Text>
            </CardStat>
         </CardStats>
         <Button css={[tw`inline-flex items-center px-4 rounded-md mt-4`]}>
            <UserFriendsIcon css={[tw`fill-current text-white w-4 h-4 mr-2`]} />
            Follow
         </Button>
      </CardWrapper>
   )
}

export default UserCard;
