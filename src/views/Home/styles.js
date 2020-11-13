import tw, { styled, css } from "twin.macro";

export const Jumbotron = styled.div`
   ${tw`w-3/5 h-screen bg-red-200 overflow-hidden relative`}
   border-top-right-radius: 50px;
   &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(13, 12, 45, 0.6);
      top: 0;
      left: 0;
   }
`;

export const SearchBox = styled.div`
   ${tw`mx-auto pl-6 pr-10 py-2 h-10 bg-white rounded-full border border-chill-gray3 relative`}
   max-width: 400px;
   width: 450px;
`;

export const SearchInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent focus:outline-none text-c-15 font-medium text-chill-gray4`}
   &::placeholder {
      opacity: 75%;
   }
`;

export const Marker = styled.span(({ top, left }) => [
   tw`absolute`,
   css`
      top: ${top};
      left: ${left};
   `
]);