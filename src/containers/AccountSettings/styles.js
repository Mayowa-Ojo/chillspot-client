import tw, { styled, css, theme } from "twin.macro";

export const AccountContainer = styled.div`
   ${tw`p-8 w-full`}
`;
export const AccountContainerInner = styled.div`
   ${tw`mx-auto py-8`}

   max-width: 800px;
`;

export const ProfileHeader = styled.header`
   ${tw`w-full flex items-start`}
`;

export const ProfileContent = styled.div`
   ${tw`mt-8 flex`}
`;

export const ProfileSideNav = styled.aside`
   ${tw`w-1/4`}
`;

export const SideNavItem = styled.li(({ isActive }) => [
   tw`text-c-15 font-medium text-chill-gray4 my-2 text-opacity-75 cursor-pointer hover:text-opacity-100`,
   isActive && tw`text-opacity-100`,

   isActive && css`
      border-left: 3px solid ${theme`colors.chill.gray3`};
      padding-left: 8px;
      font-weight: 600;
   `
]);

export const FormWrapper = styled.form`
   ${tw`mt-4 w-full`}
`;

export const FormInputBox = styled.div`
   ${tw`w-full h-10 rounded-md bg-gray-200 flex items-center px-4 py-1 mt-2`}

   transition: box-shadow .2s linear;
   transition: background-color .2s linear;
   &:hover, &:focus-within {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
   }
`;

export const FormInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent focus:outline-none text-c-15 text-chill-gray4 font-medium`}
`;

export const FormLabel = styled.label`
   ${tw`text-c-15 font-semibold text-chill-gray4`}
`;

export const FormTextArea = styled.textarea.attrs(() => ({
   autocomplete: "chrome-off",
   maxLength: 250,
}))`
   ${tw`w-full mt-2 px-4 py-2 text-c-15 font-medium text-chill-gray4 bg-gray-200 rounded-md`}
   ${tw`focus:outline-none`}

   min-height: 100px;
   resize: none;
   transition: box-shadow .2s linear;
   transition: background-color .2s linear;
   &:hover, &:focus {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
   }
`;