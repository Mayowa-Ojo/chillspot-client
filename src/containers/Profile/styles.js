import tw, { styled, theme, css } from "twin.macro";

export const ProfileContainer = styled.div`
   ${tw`w-full`}
`;

export const ProfileInfo = styled.section`
   ${tw`w-full pt-20 pb-8 flex justify-center`}
`;

export const ProfileButton = styled.button(({ isTransparent }) => [
   tw`px-4 py-2 mr-4 text-c-15 font-semibold border-2 rounded-lg text-chill-gray4`,
   tw`inline-flex items-center`,
   isTransparent && tw`bg-transparent border-chill-gray2 hover:bg-chill-gray2`,
   !isTransparent && tw`bg-chill-gray2 border-chill-gray2 hover:bg-transparent`
]);

export const ProfileNavigation = styled.div`
   ${tw`px-20`}

   &>ul {
      border-bottom: 1px solid ${theme`colors.chill.gray3`};
   }
`;

export const ProfileNavItem = styled.li(({ isActive }) => [
   tw`mr-8 text-c-18 font-semibold text-chill-gray4 inline-flex`,
   tw`items-center text-opacity-50 cursor-pointer hover:text-opacity-100`,

   isActive && tw`text-opacity-100`,

   css`
      span:first-of-type {
         visibility: ${isActive ? "visible" : "hidden"};
      }
   `
]);

export const ActiveTabIndicator = styled.span`
   ${tw`inline-block rounded-full bg-chill-gray4 mr-2`}

   width: 6px;
   height: 6px;
`;

export const NoStoriesPlaceholder = styled.div`
   ${tw`flex flex-col items-center py-20`}
`;