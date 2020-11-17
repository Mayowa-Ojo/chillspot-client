import tw, { styled, css, theme } from "twin.macro";

export const StoriesFilter = styled.header`
   ${tw`flex justify-between items-center mt-12 px-16`}
`;

export const FilterViews = styled.button`
   ${tw`px-4 py-2 rounded-lg border-2 border-chill-gray2 text-c-15 text-chill-gray4 font-medium flex items-center capitalize`}

   transition: box-shadow .2s linear;
   svg {
      transition: transform .2s linear;
   }
   &:hover, &:focus {
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
      outline: none;
   }
   &:focus {
      svg {
         transform: rotate(270deg);
      }
   }
`;

export const FilterViewsContent = styled.ul`
   ${tw`py-2`}

   min-width: 140px;
   li {
      padding: 8px 16px;
      text-transform: capitalize;
      font-size: ${theme`fontSize.c-15`}
      font-weight: medium;
      cursor: pointer;
      &:hover {
         background: ${theme`colors.chill.gray2`};
      }
   }
`;

export const FilterCategories = styled.div`
   ${tw`flex items-center`}
`;

export const FilterCategory = styled.span`
   ${tw`px-3 py-2 mx-4 rounded-md text-c-15 font-medium text-chill-gray4 capitalize cursor-pointer hover:text-chill-gray5`}

   ${({ isActive }) => isActive && css`background: #EDF2F7; font-weight: 600`}
`;

export const FilterSettings = styled.button`
   ${tw`px-4 py-2 rounded-lg border-2 border-chill-gray2 text-c-15 text-chill-gray4 font-medium flex items-center`}

   &:focus {
      background: ${theme`colors.chill.gray2`};
      outline: none;
   }
`;

export const StoriesGrid = styled.div`
   ${tw`mx-auto mt-16`}

   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
   gap: 52px 32px;
`;