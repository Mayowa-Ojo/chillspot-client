import tw, { styled } from "twin.macro";

export const DropdownWrapper = styled.div`
   ${tw`relative`}
`;

export const ContentWrapper = styled.div`
   ${tw`absolute bg-white rounded-lg border border-chill-gray2 mt-2 hidden z-10`}
   ${({ isOpen }) => isOpen && tw`block`}
   ${({ placement }) => placement === "left" ? tw`right-0` : tw`left-0`}

   box-shadow: 0 3px 5px rgba(0,0,0,0.04);
`;