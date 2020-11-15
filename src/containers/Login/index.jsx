import React from 'react';
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { FormInput, FormInputBox, FormLabel, FormWrapper } from "./styles";
import { Bucket, Button, Divider, FlexBox, Image, Text } from "../../components";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitterAlt.svg"
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg"

const Login = () => {
   return (
      <FlexBox css={[tw`w-full h-screen flex`]}>
         <Bucket css={[tw`w-2/5 h-full`]}>
            <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/4590353.jpg" />
         </Bucket>

         <FlexBox isCol css={[tw`w-3/5 h-full relative`]}>
            <Text css={[tw`absolute top-0 right-0 mr-4 mt-4`]}>Not a member? <Link css={[tw`text-chill-indigo2`]} to="/signup">Sign Up now</Link></Text>
            <FormWrapper>
            <Text css={[tw`text-c-24 font-bold`]}>Sign in to Chillspot</Text>

            <FlexBox css={[tw`justify-start mt-6`]}>
               <Button css={[tw`h-10 flex-grow rounded-md bg-chill-indigo2 inline-flex items-center justify-center`]}>
                  <GoogleIcon css={[tw`mr-2`]} />
                  Sign in with Google
               </Button>
               <Button css={[tw`bg-chill-gray3 h-10 px-4 ml-5 rounded-md hover:(bg-chill-gray3 opacity-75)`]}>
                  <TwitterIcon css={[tw`w-4 h-4 fill-current text-chill-gray4`]} />
               </Button>
            </FlexBox>

            <FlexBox css={[tw`justify-start mt-10`]}>
               <Divider />
               <Text css={[tw`mx-8`]}>Or</Text>
               <Divider />
            </FlexBox>

            <FlexBox isCol css={[tw`mt-10 items-start`]}>
               <Bucket css={[tw`w-full`]}>
                  <FormLabel for="email">Username or Email</FormLabel>
                  <FormInputBox>
                     <FormInput id="email" placeholder="" />
                  </FormInputBox>
               </Bucket>
               <Bucket css={[tw`w-full mt-6`]}>
                  <Bucket as="span" css={[tw`inline-flex items-center justify-between w-full`]}>
                     <FormLabel for="password">Password</FormLabel>
                     <Link to="/reset-password" css={[tw`text-c-12 text-chill-gray4 font-medium`]}>Forgot password?</Link>
                  </Bucket>
                  <FormInputBox>
                     <FormInput id="password" placeholder="" />
                  </FormInputBox>
               </Bucket>
               <Button css={[tw`font-semibold mt-6 bg-chill-indigo2 px-10 py-2 rounded-md`]}>Sign In</Button>
            </FlexBox>
            </FormWrapper>
         </FlexBox>
      </FlexBox>
   )
}

export default Login
