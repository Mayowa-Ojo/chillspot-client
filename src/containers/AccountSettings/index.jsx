import React, { useState, useContext } from 'react';
import { Switch, Route, Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import tw from "twin.macro";

import { StoreContext } from "../../store";
import types from "../../store/types";
import * as Styles from "./styles";
import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { FlexBox, Avatar, Image, Text, Bucket, Button, Divider, DialogBox } from "../../components";
import { ReactComponent as ExclamationTriangle } from "../../assets/svg/exclamation-triangle-alt.svg";
import { ReactComponent as ExclamationCircle } from "../../assets/svg/exclamation-circle-alt.svg";
import { ReactComponent as EyeIcon } from "../../assets/svg/eye.svg";

const AccountSettings = () => {
   const { path, url } = useRouteMatch();
   const { pathname } = useLocation();
   const context = useContext(StoreContext);
   const { state: { auth: { profile }}} = context;
   const [isDialogOpen, setDialogOpen] = useState(false);

   const getHeaderLabel = () => {
      switch(pathname.split("/")[2]) {
         case "profile":
            return "Edit Profile";
         case "settings":
            return "Account Settings";
         case "password":
            return "Password";
         default:
            return;
      }
   }

   const getHeaderDescription = () => {
      switch(pathname.split("/")[2]) {
         case "profile":
            return "Setup your chillspot presence";
         case "settings":
            return "Manage your account";
         case "password":
            return "Manage your password";
         default:
            return;
      }
   }

   return (
      <>
      <Styles.AccountContainer>
         <Styles.AccountContainerInner>
            <Styles.ProfileHeader>
               <Avatar css={[tw`w-12 h-12`]}>
                  <Image src={profile.avatar.url} alt="profile image"/>
               </Avatar>
               <FlexBox isCol css={[tw`items-start ml-4`]}>
                  <Text css={[tw`text-c-21 font-semibold`]}>
                     <Bucket as="span" css={[tw`text-chill-indigo1`]}>{profile.firstname} {profile.lastname}</Bucket> 
                     <Bucket as="span" css={[tw`text-chill-gray3 mx-2`]}>/</Bucket> 
                     { getHeaderLabel() }
                  </Text>
                  <Text>{ getHeaderDescription() }</Text>
               </FlexBox>
            </Styles.ProfileHeader>

            <Styles.ProfileContent>
               <Styles.ProfileSideNav>
                  <Bucket as="ul">
                     <Styles.SideNavItem
                        isActive={pathname.includes("profile")}
                     >
                        <Link to={`${url}/profile`}>Edit Profile</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={pathname.includes("settings")}
                     >
                        <Link to={`${url}/settings`}>Account Settings</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={pathname.includes("password")}
                     >
                        <Link to={`${url}/password`}>Password</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={pathname.includes("notifications")}
                     >
                        <Link to={`${url}/notifications`}>Notifications</Link>
                     </Styles.SideNavItem>
                  </Bucket>
               </Styles.ProfileSideNav>

               <Switch>
                  <Route path={`${path}/profile`} children={<Profile context={context}/>} />
                  <Route path={`${path}/settings`} children={<Settings setDialogOpen={setDialogOpen} context={context}/>} />
                  <Route path={`${path}/password`} children={<Password context={context}/>} />
               </Switch>
            </Styles.ProfileContent>
         </Styles.AccountContainerInner>
      </Styles.AccountContainer>
      { isDialogOpen &&
         <DialogBox>
            <ConfirmDeleteDialog setDialogOpen={setDialogOpen} />
         </DialogBox>
      }
      </>
   );
}

const Profile = ({ context }) => {
   const { state: { auth: { profile }}, dispatch } = context;
   const { register, handleSubmit: handleValidation, errors } = useForm({
      mode: "onBlur"
   });

   const handleUploadAvatar = async (e) => {
      const { files } = e.target;

      if(files[0].size > 5242880) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "warning",
               message: "File is too large, accpeted limit is 5MB."
            }
         });

         return;
      }

      try {
         const fd = new FormData();
         fd.append("image", files[0]);

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: uploadResponse } = await httpRequest(requestEndpoints.images.upload, {
            method: "POST",
            "content-type": "multipart/form-data",
            data: fd,
         });

         const { data: updateResponse } = await httpRequest(requestEndpoints.users.update(profile._id), {
            method: "PATCH",
            data: {
               avatar: {
                  url: uploadResponse.data.url,
                  key: uploadResponse.data.key
               }
            }
         });

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: { ...updateResponse.data.user }
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "info",
               message: "Your profile image has been updated."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Failed to upload, please try again."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });
      }
   }

   const handleUpdate = async (data) => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: updateResponse } = await httpRequest(requestEndpoints.users.update(profile._id), {
            method: "PATCH",
            data: { ...data }
         });

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: { ...updateResponse.data.user }
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "info",
               message: "Your profile has been updated."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Something went wrong, please try again."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });
      }
   }

   return (
      <Bucket css={[tw`w-3/4`]}>
         <FlexBox css={[tw`justify-start`]}>
            <Avatar css={[tw`w-20 h-20`]}>
               <Image src={profile.avatar.url} alt="profile image"/>
            </Avatar>
            <Button as="label" htmlFor="avatar" css={[tw`ml-8 px-4 py-2 font-semibold bg-chill-indigo2 rounded-md cursor-pointer`]}>
               Upload new picture
               <Styles.FileInput autocomplete="off" tabindex="-1" id="avatar" name="image" onChange={handleUploadAvatar}/>
            </Button>
            <Button css={[tw`ml-4 px-4 py-2 rounded-md bg-chill-gray2 text-chill-gray4 font-semibold hover:bg-chill-gray3`]}>Delete</Button>
         </FlexBox>
         <Styles.FormWrapper autocomplete="off" onSubmit={handleValidation(handleUpdate)}>
            <Bucket>
               <FlexBox css={[tw`justify-between`]}>
                  <Bucket css={[tw`w-full`]}>
                     <Styles.FormLabel>Firstname <Bucket as="span" css={[tw`text-red-400`]}>*</Bucket></Styles.FormLabel>
                     <Styles.FormInputBox>
                        <Styles.FormInput
                           name="firstname"
                           defaultValue={profile.firstname}
                           ref={register({ required: true })}
                        />
                     </Styles.FormInputBox>
                     <ValidationError message={"this field is required"} visible={!!errors.firstname}/>
                  </Bucket>
                  <Bucket css={[tw`w-full ml-4`]}>
                     <Styles.FormLabel>Lastname <Bucket as="span" css={[tw`text-red-400`]}>*</Bucket></Styles.FormLabel>
                     <Styles.FormInputBox>
                        <Styles.FormInput
                           name="lastname"
                           defaultValue={profile.lastname}
                           ref={register({ required: true })}
                        />
                     </Styles.FormInputBox>
                     <ValidationError message={"this field is required"} visible={!!errors.lastname}/>
                  </Bucket>
               </FlexBox>
               <Bucket as="span" css={[tw`text-c-12 font-medium text-chill-gray4 text-opacity-50 mt-1 inline-block`]}>
                  The community encourages use of real names
               </Bucket>
            </Bucket>
            <FlexBox isCol css={[tw`mt-8 items-start justify-start`]}>
               <FlexBox css={[tw`justify-between w-full`]}>
                  <Styles.FormLabel>Bio</Styles.FormLabel>
                  <Bucket as="span" css={[tw`text-c-15 font-medium text-chill-gray4 text-opacity-75`]}>250</Bucket>
               </FlexBox>
               <Styles.FormTextArea
                  name="bio"
                  defaultValue={profile.bio}
                  ref={register({ required: true })}
               />
               <ValidationError message={"this field is required"} visible={!!errors.bio}/>
               <Bucket as="span" css={[tw`text-c-12 font-medium text-chill-gray4 text-opacity-50 mt-1 inline-block`]}>
                  Brief description of your profile
               </Bucket>
            </FlexBox>
            <Bucket css={[tw`mt-8`]}>
               <Button type="submit" css={[tw`px-4 py-2 rounded-md font-semibold bg-chill-indigo2`]}>Save Profile</Button>
            </Bucket>
         </Styles.FormWrapper>
      </Bucket>
   );
}

const Settings = ({ setDialogOpen, context }) => {
   const { state: { auth: { profile } }, dispatch } = context;
   const { register, handleSubmit: handleValidation, errors } = useForm({
      mode: "onBlur"
   });

   const handleUpdate = async (data) => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: updateResponse } = await httpRequest(requestEndpoints.users.update(profile._id), {
            method: "PATCH",
            data: { ...data }
         });

         dispatch({
            namespace: "auth",
            type: types.SET_USER,
            payload: { ...updateResponse.data.user }
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "info",
               message: "Your profile has been updated."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Something went wrong, please try again."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });
      }
   }

   return (
      <Bucket css={[tw`w-3/4`]}>
         <Styles.FormWrapper autocomplete="off" onSubmit={handleValidation(handleUpdate)}>
            <Bucket>
               <Styles.FormLabel>Username</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput
                     name="username"
                     defaultValue={profile.username}
                     ref={register({ required: true })}
                  />
               </Styles.FormInputBox>
               <ValidationError message={"this field is required"} visible={!!errors.username}/>
               <Text css={[tw`text-c-12 text-chill-gray4 text-opacity-50 mt-1`]}>
                  Your Chillspot URL: 
                  <Bucket as="span" css={[tw`font-semibold`]}> https://chillspot.vercel.app/u/Jonathan-Buckenbeur</Bucket>
               </Text>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Styles.FormLabel>Email</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput
                     name="email"
                     defaultValue={profile.email}
                     ref={register({ required: true })}
                  />
               </Styles.FormInputBox>
               <ValidationError message={"this field is required"} visible={!!errors.email}/>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Bucket as="span" css={[tw`inline-flex items-center`]}>
                  <ExclamationTriangle css={[tw`fill-current text-red-400 w-4 h-4 mr-2`]} />
                  <Text css={[tw`font-semibold`]}>Account Changes</Text>
               </Bucket>
               <Divider css={[tw`my-1`]}/>
               <FlexBox css={[tw`justify-between mt-4`]}>
                  <Bucket>
                     <Text css={[tw`text-c-24 font-bold`]}>Close Account</Text>
                     <Text>Delete your account and data</Text>
                  </Bucket>
                  <Button 
                     css={[tw`font-semibold bg-red-500 rounded-md px-4 py-2 hover:bg-red-400`]}
                     onClick={() => setDialogOpen(true)}
                  >Close Account</Button>
               </FlexBox>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Button type="submit" css={[tw`px-4 py-2 rounded-md font-semibold bg-chill-indigo2`]}>Save Changes</Button>
            </Bucket>
         </Styles.FormWrapper>
      </Bucket>
   );
}

const Password = ({ context }) => {
   const { state: { auth: { profile }}, dispatch } = context;
   const { register, handleSubmit: handleValidation, errors } = useForm({
      mode: "onBlur"
   });

   const [isPasswordVisible, setPasswordVisible] = useState(false);
   const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);

   const handleUpdate = async (data) => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         await httpRequest(requestEndpoints.users.resetPassword(profile._id), {
            method: "PATCH",
            data: { ...data }
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "info",
               message: "Your password has been updated."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Something went wrong, please try again."
            }
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });
      }
   }

   return (
      <Bucket css={[tw`w-3/4`]}>
         <Styles.FormWrapper autocomplete="off" onSubmit={handleValidation(handleUpdate)}>
            <Bucket>
               <Styles.FormLabel>Old Password</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput
                     type={isOldPasswordVisible ? "text" : "password"}
                     name="oldPassword"
                     css={["font-family: system-ui"]}
                     ref={register({ required: true })}
                  />
                  <Bucket as="span" css={[tw`cursor-pointer`]} onClick={() => setOldPasswordVisible(!isOldPasswordVisible)}>
                     <EyeIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]} />
                  </Bucket>
               </Styles.FormInputBox>
               <ValidationError message={"this field is required"} visible={!!errors.oldPassword}/>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Styles.FormLabel>Password</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput
                     type={isPasswordVisible ? "text" : "password"}
                     name="password"
                     css={["font-family: system-ui"]}
                     ref={register({ required: true })}
                  />
                  <Bucket as="span" css={[tw`cursor-pointer`]} onClick={() => setPasswordVisible(!isPasswordVisible)}>
                     <EyeIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]} />
                  </Bucket>
               </Styles.FormInputBox>
               <ValidationError message={"this field is required"} visible={!!errors.password}/>
               <Text css={[tw`text-c-12 text-chill-gray4 text-opacity-50 mt-1`]}>Minimum 6 characters</Text> 
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Button type="submit" css={[tw`px-4 py-2 rounded-md font-semibold bg-chill-indigo2`]}>Change</Button>
            </Bucket>
         </Styles.FormWrapper>
      </Bucket>
   );
}

const ConfirmDeleteDialog = ({ setDialogOpen }) => {
   const { register, handleSubmit: handleValidation, errors } = useForm({
      mode: "onBlur"
   });

   const handleSubmit = (data) => {
      console.log(data)
   }

   return (
      <Bucket css={[tw`bg-white rounded-md overflow-hidden relative`, "min-width: 534px"]}>
         <Styles.FormWrapper autocomplete="off" onSubmit={handleValidation(handleSubmit)}>
         <Bucket as="span" css={[tw`inline-flex items-center justify-center ml-4 mt-8 w-8 h-8 rounded-full bg-red-200 absolute left-0 top-0`]}>
            <ExclamationCircle css={[tw`fill-current text-red-400`]} />
         </Bucket>
         <Bucket css={[tw`w-full px-4`]}>
            <Bucket css={[tw`justify-start mt-8 mx-auto w-4/5`]}>
               <Text css={[tw`font-semibold`]}>Are you sure you want to delete your account?</Text>
               <Text css={[tw`text-c-12 mt-1 flex items-center`]}>
                  <Bucket as="span" css={[tw`inline-block w-1 h-1 rounded-full bg-chill-gray4 mr-2`]} />
                  This is not a reversible action
               </Text>
               <Text css={[tw`text-c-12 mt-1 flex items-center`]}>
                  <Bucket as="span" css={[tw`inline-block w-1 h-1 rounded-full bg-chill-gray4 mr-2`]} />
                  You will lose all data
               </Text>
            </Bucket>
            <Bucket css={[tw`mt-4 w-4/5 mx-auto`]}>
               <Styles.FormLabel css={[tw`text-c-12`]}>Enter your password</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput
                     type="password"
                     name="password"
                     css={["font-family: system-ui"]}
                     ref={register({ required: true })}
                  />
               </Styles.FormInputBox>
               <ValidationError message={"this field is required"} visible={!!errors.password}/>
            </Bucket>
         </Bucket>
         <FlexBox css={[tw`mt-6 bg-chill-gray1 justify-end items-center py-2 px-4`]}>
            <Button 
               css={[tw`bg-transparent text-chill-gray4 border border-chill-gray3 px-4 py-2 rounded-md hover:(bg-chill-gray3)`]}
               onClick={() => setDialogOpen(false)}
               >Cancel</Button>
            <Button type="submit" css={[tw`bg-red-400 px-4 py-2 ml-4 rounded-md hover:bg-red-500`]}>Delete</Button>
         </FlexBox>
         </Styles.FormWrapper>
      </Bucket>
   );
}

const ValidationError = ({ message, visible }) => (
   <FlexBox css={[tw`justify-start mt-1`, visible && tw`visible`, !visible && tw`invisible`]}>
      <Bucket as="span" css={[tw`inline-block w-1 h-1 mr-2 rounded-full bg-red-500`]}/>
      <Text css={[tw`text-c-12 text-red-500`]}>{message}</Text>
   </FlexBox>
);

export default AccountSettings;
