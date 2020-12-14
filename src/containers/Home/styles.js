import tw, { styled, css, theme } from "twin.macro";

export const Jumbotron = styled.div`
   ${tw`w-3/5 h-screen bg-red-200 overflow-hidden relative`}

   border-top-right-radius: 50px;
   &::before {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(15, 14, 82, 0.8);
      top: 0;
      left: 0;
   }
`;

export const JumbotronButton = styled.button`
   ${tw`bg-white border-2 border-transparent px-6 py-2 mt-8 text-chill-indigo2 text-c-18`}
   ${tw`font-semibold rounded-md inline-flex items-center hocus:(text-white bg-transparent border-white outline-none)`}

   transition: background .2s ease-in;
   &:hover {
      svg {
         color: ${theme`colors.white`};
      }
   }
`;

export const SearchBox = styled.div`
   ${tw`mx-auto pl-6 pr-10 py-2 h-10 bg-white rounded-full border border-chill-gray3 relative`}

   max-width: 400px;
   width: 450px;
   &:hover {
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(146, 145, 232, 0.10);
   }
   &:focus-within {
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(146, 145, 232, 0.15);
   }
   transition: box-shadow .2s linear;
`;

export const SearchInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent focus:outline-none text-c-15 font-medium text-chill-gray4`}

   &::placeholder {
      opacity: 75%;
      font-size: 13px;
   }
`;

export const Marker = styled.span(({ top, left }) => [
   tw`absolute`,
   css`
      top: ${top};
      left: ${left};
   `
]);

export const StorieSlider = styled.div`
   ${tw`mt-8 overflow-hidden`}

   .slick-slider {
      margin-left: -50px;
   }
   .slick-slide {
      &:focus {
         outline: none;
      }
   }
`;

export const SliderArrow = styled.span`
   ${tw`inline-flex items-center justify-center w-5 h-5 rounded-full bg-chill-indigo1 absolute z-10 cursor-pointer`}
`;

export const SliderFilter = styled.span(({ isActive }) => [
   tw`inline-flex flex-col items-center relative mr-8`,

   isActive && css`
      p {
         color: ${theme`colors.chill.indigo2`};
      }
      span {
         visibility: visible;
      }
   `
]);