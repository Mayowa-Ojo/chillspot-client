import tw, { styled } from "twin.macro";

export const ModalOvarlay = styled.div`
   ${tw`w-full h-full fixed top-0 left-0 z-30`}

   background: rgba(0,0,0,.8);
   overflow-y: hidden;
`;