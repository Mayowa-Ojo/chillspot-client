import tw, { styled } from "twin.macro";

export const DropdownWrapper = styled.div`
   ${tw`relative`}
`;

export const ContentWrapper = styled.div`
   ${tw`absolute bg-white rounded-md mt-2 hidden z-10`}
   ${({ isOpen }) => isOpen && tw`block`}

   box-shadow: 0 3px 5px rgba(0,0,0,0.04);
   border: 1px solid rgba(0,0,0,0.05);
`;