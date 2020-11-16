import tw, { styled, css } from "twin.macro";

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
   ${tw`px-2 py-1 rounded bg-chill-indigo1 text-c-15 text-white font-semibold mr-2 hover:bg-opacity-75`}
   ${({ isTransparent }) => isTransparent && tw`bg-transparent text-chill-gray4 hover:(text-chill-indigo2)`}
`