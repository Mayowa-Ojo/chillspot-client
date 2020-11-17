import React from 'react';
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { FormInput, FormInputBox, FormLabel, FormWrapper } from "./styles";
import { Bucket, Button, Divider, FlexBox, Image, Text } from "../../components";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitterAlt.svg"
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg"

const Signup = () => {
   return (
      <FlexBox css={[tw`w-full h-screen flex`]}>
         <Bucket css={[tw`w-2/5 h-full`]}>
            <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/4590350.jpg" />
         </Bucket>

         <FlexBox isCol css={[tw`w-3/5 h-full relative`]}>
            <Text css={[tw`absolute top-0 right-0 mr-4 mt-4`]}>Already a member? <Link css={[tw`text-chill-indigo2`]} to="/login">Sign In</Link></Text>
            <FormWrapper>
            <Text css={[tw`text-c-24 font-bold`]}>Sign Up for Chillspot</Text>

            <FlexBox css={[tw`justify-start mt-6`]}>
               <Button css={[tw`h-10 flex-grow rounded-md bg-chill-indigo2 inline-flex items-center justify-center`]}>
                  <GoogleIcon css={[tw`mr-2`]} />
                  Sign up with Google
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
               <FlexBox css={[tw`w-full justify-between`]}>
                  <Bucket css={["width: 12.5rem"]}>
                     <FormLabel htmlFor="firstname">Firstname</FormLabel>
                     <FormInputBox>
                        <FormInput id="firstname" placeholder="" />
                     </FormInputBox>
                  </Bucket>
                  <Bucket css={["width: 12.5rem"]}>
                     <FormLabel htmlFor="lastname">Lastname</FormLabel>
                     <FormInputBox>
                        <FormInput id="lastname" placeholder="" />
                     </FormInputBox>
                  </Bucket>
               </FlexBox>
               <Bucket css={[tw`w-full mt-4`]}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInputBox>
                     <FormInput id="email" placeholder="" />
                  </FormInputBox>
               </Bucket>
               <Bucket css={[tw`w-full mt-4`]}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormInputBox>
                     <FormInput id="password" placeholder="6+ characters" />
                  </FormInputBox>
               </Bucket>
               <Button css={[tw`font-semibold mt-6 bg-chill-indigo2 px-10 py-2 rounded-md`]}>Create Acccount</Button>
            </FlexBox>
            </FormWrapper>
         </FlexBox>
      </FlexBox>
   )
}

export default Signup;
