import React from 'react';
import tw from "twin.macro";
import { Link, useLocation } from "react-router-dom";

import { FooterContainer, FooterContent } from './styles';
import { Text, FlexBox, Bucket } from "..";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";
import { ReactComponent as GithubIcon } from "../../assets/svg/github.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg";

const Footer = () => {
   const location = useLocation();
   const showFooter = !["/login", "/signup", "/"].includes(location.pathname);

   return (
      showFooter &&
      <FooterContainer>
         <FooterContent>
            <Logo css={[tw`w-32 h-32`]}/>
            <Text css={[tw`text-c-18`]}>
               Chillspot is a community where amazing experiences from the most beautiful places in the world are shared by explorers like you.
            </Text>
            <FlexBox css={[tw`justify-start mt-6`]}>
               <InstagramIcon css={[tw`fill-current text-chill-gray4 w-5 h-5 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
               <TwitterIcon css={[tw`fill-current text-chill-gray4 w-5 h-5 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
               <GithubIcon css={[tw`fill-current text-chill-gray4 w-5 h-5 mr-4 cursor-pointer hover:text-chill-indigo1`]}/>
            </FlexBox>
            <Text css={[tw`inline-flex items-center mt-6`]}>
               Made with
               <HeartIcon css={[tw`fill-current text-red-400 w-4 h-4 mx-1`]}/>
               by 
               <Bucket as="span" css={[tw`ml-1 cursor-pointer hover:underline`]}>Mayowa Ojo</Bucket>
               <Bucket as="span" css={[tw`inline-block h-full bg-chill-gray3 mx-3`, "width: 2px;"]}></Bucket>
               <Link to="https://github.com/Mayowa-Ojo">
                  <Bucket as="span" css={[tw`cursor-pointer hover:underline`]}>view source</Bucket>
               </Link>
            </Text>
         </FooterContent>
      </FooterContainer>
   );
}

export default Footer;
