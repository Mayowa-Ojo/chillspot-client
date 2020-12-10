import tw, { styled, css, theme } from "twin.macro";

export const Nav = styled.nav(({ hasShadow, hidden }) => [
   tw`bg-chill-gray1 h-16 w-full flex items-center justify-between px-8`,

   hasShadow && css`
      box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.1);
   `,
   hidden && css`
      display: none;
   `
])

export const NavItem = styled.button`
   ${tw`px-2 py-1 inline-flex items-center rounded bg-chill-indigo1 text-c-15 text-white font-semibold mr-2 hover:bg-opacity-75`}
   ${({ isTransparent }) => isTransparent && tw`bg-transparent text-chill-gray4 hover:(text-chill-indigo2)`}
`

export const SearchBox = styled.div`
   ${tw`py-1 bg-chill-gray2 border border-chill-gray2 relative`}

   max-width: 240px;
   width: 180px;
   height: 38px;
   padding: .25rem .5rem .25rem 2rem;
   border-radius: 8px;
   transition: box-shadow .2s linear, width .2s ease-in-out;
   &:hover {
      border: 1px solid ${theme`colors.chill.gray3`};
      background-color: white;
      box-shadow: 0px 0px 0px 4px rgba(146, 145, 232, 0.10);
   }
   &:focus-within {
      border: 1px solid ${theme`colors.chill.gray3`};
      background-color: white;
      box-shadow: 0px 0px 0px 4px rgba(146, 145, 232, 0.15);
      width: 240px;
   }
`;

export const SearchInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent focus:outline-none text-c-12 font-medium text-chill-gray4`}

   &::placeholder {
      opacity: 75%;
   }
`;

export const ProfilePopoverWrapper = styled.ul`
   ${tw`py-8 w-full`}
`;

export const ProfilePopoverItem = styled.li`
   ${tw`px-8 py-2 text-chill-gray4 font-medium text-c-15 hover:bg-chill-gray2`}
`;
