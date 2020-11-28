import React, { useContext } from 'react';
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import httpRequest from "../../services/http";
import LocalStorage from "../../utils/localstorage";
import types from "../../store/types";
import { requestEndpoints } from "../../constants";
import { StoreContext } from "../../store";
import { FormInput, FormInputBox, FormLabel, FormWrapper } from "./styles";
import { Bucket, Button, Divider, FlexBox, Image, Text } from "../../components";
import { ReactComponent as TwitterIcon } from "../../assets/svg/twitterAlt.svg";
import { ReactComponent as GoogleIcon } from "../../assets/svg/google.svg";

const ls = new LocalStorage();

const Signup = ({ history }) => {
   const context = useContext(StoreContext);
   const { dispatch } = context;

   const { register, handleSubmit: handleValidation, errors } = useForm({
      mode: "onBlur"
   });

   const handleSubmit = async (data) => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(requestEndpoints.auth.signUp, {
            method: "POST",
            data: { ...data }
         });

         ls.set("user", {
            id: response.data.user._id,
            email: response.data.user.email,
            token: response.data.token
         });

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: { ...response.data.user }
         });
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });

         history.push("/stories");

         console.log("[INFO]: user signed up...")
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });
         console.error(err.response || err.message);
      }
   }

   return (
      <FlexBox css={[tw`w-full h-screen flex`]}>
         <Bucket css={[tw`w-2/5 h-full`]}>
            <Image src="https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/4590350.jpg" />
         </Bucket>

         <FlexBox isCol css={[tw`w-3/5 h-full relative`]}>
            <Text css={[tw`absolute top-0 right-0 mr-4 mt-4`]}>Already a member? <Link css={[tw`text-chill-indigo2`]} to="/login">Sign In</Link></Text>
            <FormWrapper autocomplete="off" onSubmit={handleValidation(handleSubmit)}>
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
                           <FormInput
                              id="firstname"
                              name="firstname"
                              placeholder=""
                              ref={register({ required: true })}
                           />
                        </FormInputBox>
                        <ValidationError visible={!!errors.firstname} message={"this field is required"}/>
                     </Bucket>
                     <Bucket css={["width: 12.5rem"]}>
                        <FormLabel htmlFor="lastname">Lastname</FormLabel>
                        <FormInputBox>
                           <FormInput
                              id="lastname"
                              name="lastname"
                              placeholder=""
                              ref={register({ required: true })}
                           />
                        </FormInputBox>
                        <ValidationError visible={!!errors.lastname} message={"this field is required"}/>
                     </Bucket>
                  </FlexBox>
                  <Bucket css={[tw`w-full mt-4`]}>
                     <FormLabel htmlFor="email">Email</FormLabel>
                     <FormInputBox>
                        <FormInput
                           id="email"
                           name="email"
                           placeholder=""
                           ref={register({ 
                              required: true,
                              pattern: { value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, message: "please enter a valid email" }
                              })
                           }
                        />
                     </FormInputBox>
                     <ValidationError message={errors?.email?.message || "this field is required"} visible={!!errors.email}/>
                  </Bucket>
                  <Bucket css={[tw`w-full mt-4`]}>
                     <FormLabel htmlFor="password">Password</FormLabel>
                     <FormInputBox>
                        <FormInput
                           id="password"
                           name="password"
                           placeholder="6+ characters"
                           type="password"
                           ref={register({
                              required: true,
                              minLength: { value: 6, message: "at least 6 characters"}
                              })
                           }
                           css={["font-family: system-ui"]}
                        />
                     </FormInputBox>
                     <ValidationError message={errors?.password?.message || "this field is required"} visible={!!errors.password}/>
                  </Bucket>
                  <Button
                     css={[tw`font-semibold mt-6 bg-chill-indigo2 px-10 py-2 rounded-md`]}
                     type={'submit'}
                  >Create Acccount</Button>
               </FlexBox>
            </FormWrapper>
         </FlexBox>
      </FlexBox>
   )
}

const ValidationError = ({ message, visible }) => (
   <FlexBox css={[tw`justify-start mt-1`, visible && tw`visible`, !visible && tw`invisible`]}>
      <Bucket as="span" css={[tw`inline-block w-1 h-1 mr-2 rounded-full bg-red-500`]}/>
      <Text css={[tw`text-c-12 text-red-500`]}>{message}</Text>
   </FlexBox>
);

export default Signup;
