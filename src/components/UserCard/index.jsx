import React from 'react';
import tw from "twin.macro";
import { Link } from 'react-router-dom';

import { Avatar, Image, Text, Button } from '../../components';
import { CardWrapper, CardAvatar, CardStats, CardStat, CardStatsDivider } from './styles';
import { ReactComponent as UserFriendsIcon } from "../../assets/svg/user-friends.svg";

const UserCard = ({ user }) => {
   return (
      <CardWrapper>
         <Link to={`/u/${user.username}/stories`}>
         <CardAvatar css={[tw`cursor-pointer`]}>
            <Avatar>
               <Image src={user.avatar.url} alt="profile picture" />
            </Avatar>
         </CardAvatar>
         </Link>
         <Link to={`/u/${user.username}/stories`}>
            <Text css={[tw`text-c-21 font-semibold mt-2 cursor-pointer`]}>{user.firstname} {user.lastname}</Text>
         </Link>
         <Text css={[tw`mt-2 text-center`]}>{user.bio}</Text>
         <CardStats>
            <CardStat>
               <Text css={[tw`font-semibold text-opacity-50`]}>Stories</Text>
               <Text css={[tw`font-semibold text-c-24`]}>{user.stories.length}</Text>
            </CardStat>
            <CardStatsDivider />
            <CardStat>
               <Text css={[tw`font-semibold text-opacity-50`]}>Followers</Text>
               <Text css={[tw`font-semibold text-c-24`]}>{user.followers.length}</Text>
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
