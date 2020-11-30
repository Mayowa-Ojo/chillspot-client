import React, { useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import tw from "twin.macro";

import * as Styles from "./styles";
import { FlexBox, Avatar, Image, Text, Bucket, Button, Divider } from "../../components";
import { ReactComponent as ExclamationTriangle } from "../../assets/svg/exclamation-triangle-alt.svg";

const AccountSettings = () => {
   const [navItem, setNavItem] = useState("profile");
   const { path, url } = useRouteMatch();

   const getHeaderLabel = () => {
      switch(navItem) {
         case "profile":
            return "Edit Profile";
         case "account":
            return "Account Settings";
         case "password":
            return "Password";
         default:
            return;
      }
   }

   const getHeaderDescription = () => {
      switch(navItem) {
         case "profile":
            return "Setup your chillspot presence";
         case "account":
            return "Manage your account";
         case "password":
            return "Manage your password";
         default:
            return;
      }
   }

   return (
      <Styles.AccountContainer>
         <Styles.AccountContainerInner>
            <Styles.ProfileHeader>
               <Avatar css={[tw`w-12 h-12`]}>
                  <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image"/>
               </Avatar>
               <FlexBox isCol css={[tw`items-start ml-4`]}>
                  <Text css={[tw`text-c-21 font-semibold`]}>
                     <Bucket as="span" css={[tw`text-chill-indigo1`]}>Jonathan Buckenbeur</Bucket> 
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
                        isActive={navItem === "profile"}
                        onClick={() => setNavItem("profile")}
                     >
                        <Link to={`${url}/profile`}>Edit Profile</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={navItem === "account"}
                        onClick={() => setNavItem("account")}
                     >
                        <Link to={`${url}/settings`}>Account Settings</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={navItem === "password"}
                        onClick={() => setNavItem("password")}
                     >
                        <Link to={`${url}/password`}>Password</Link>
                     </Styles.SideNavItem>
                     <Styles.SideNavItem
                        isActive={navItem === "notifications"}
                        onClick={() => setNavItem("notifications")}
                     >
                        <Link to={`${url}/notifications`}>Notifications</Link>
                     </Styles.SideNavItem>
                  </Bucket>
               </Styles.ProfileSideNav>

               <Switch>
                  <Route path={`${path}/profile`} component={Profile} />
                  <Route path={`${path}/settings`} component={Settings} />
                  <Route path={`${path}/password`} component={Password} />
               </Switch>
            </Styles.ProfileContent>
         </Styles.AccountContainerInner>
      </Styles.AccountContainer>
   );
}

const Profile = () => {
   return (
      <Bucket css={[tw`w-3/4`]}>
         <FlexBox css={[tw`justify-start`]}>
            <Avatar css={[tw`w-20 h-20`]}>
               <Image src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg" alt="profile image"/>
            </Avatar>
            <Button css={[tw`ml-8 px-4 py-2 font-semibold bg-chill-indigo2 rounded-md`]}>Upload new picture</Button>
            <Button css={[tw`ml-4 px-4 py-2 rounded-md bg-chill-gray2 text-chill-gray4 font-semibold hover:bg-chill-gray3`]}>Delete</Button>
         </FlexBox>
         <Styles.FormWrapper>
            <Bucket>
               <FlexBox css={[tw`justify-between`]}>
                  <Bucket css={[tw`w-full`]}>
                     <Styles.FormLabel>Firstname <Bucket as="span" css={[tw`text-red-400`]}>*</Bucket></Styles.FormLabel>
                     <Styles.FormInputBox>
                        <Styles.FormInput defaultValue="Jonathan" />
                     </Styles.FormInputBox>
                  </Bucket>
                  <Bucket css={[tw`w-full ml-4`]}>
                     <Styles.FormLabel>Lastname <Bucket as="span" css={[tw`text-red-400`]}>*</Bucket></Styles.FormLabel>
                     <Styles.FormInputBox>
                        <Styles.FormInput defaultValue="Buckenbeur" />
                     </Styles.FormInputBox>
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
               <Styles.FormTextArea defaultValue="Travel blogger" />
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

const Settings = () => {
   return (
      <Bucket css={[tw`w-3/4`]}>
         <Styles.FormWrapper>
            <Bucket>
               <Styles.FormLabel>Username</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput defaultValue="Jonathan-Buckenbeur" />
               </Styles.FormInputBox>
               <Text css={[tw`text-c-12 text-chill-gray4 text-opacity-50 mt-1`]}>
                  Your Chillspot URL: 
                  <Bucket as="span" css={[tw`font-semibold`]}> https://chillspot.vercel.app/Jonathan-Buckenbeur</Bucket>
               </Text>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Styles.FormLabel>Email</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput defaultValue="jj@hey.com" />
               </Styles.FormInputBox>
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
                  <Button css={[tw`font-semibold bg-red-500 rounded-md px-4 py-2 hover:bg-red-400`]}>Close Account</Button>
               </FlexBox>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Button type="submit" css={[tw`px-4 py-2 rounded-md font-semibold bg-chill-indigo2`]}>Save Changes</Button>
            </Bucket>
         </Styles.FormWrapper>
      </Bucket>
   );
}

const Password = () => {
   return (
      <Bucket css={[tw`w-3/4`]}>
         <Styles.FormWrapper>
            <Bucket>
               <Styles.FormLabel>Old Password</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput />
               </Styles.FormInputBox>
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Styles.FormLabel>Password</Styles.FormLabel>
               <Styles.FormInputBox>
                  <Styles.FormInput />
               </Styles.FormInputBox>
               <Text css={[tw`text-c-12 text-chill-gray4 text-opacity-50 mt-1`]}>Minimum 6 characters</Text> 
            </Bucket>
            <Bucket css={[tw`mt-8`]}>
               <Button type="submit" css={[tw`px-4 py-2 rounded-md font-semibold bg-chill-indigo2`]}>Change</Button>
            </Bucket>
         </Styles.FormWrapper>
      </Bucket>
   );
}

export default AccountSettings;
