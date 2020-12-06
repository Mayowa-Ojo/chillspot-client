import tw, { styled, css } from "twin.macro";

export const CardWrapper = styled.div``;

export const CardThumbnail = styled.div(({ isSlider, isSmall, isTiny, thumbnail }) => [
   tw`relative overflow-hidden mr-8`,
   css`
      background-image: url(${thumbnail});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
   `,

   !isSlider && css`
      width: 275px;
      height: 205px;
      border-radius: 8px;
   `,
   isSlider && css`
      width: 189px;
      height: 258px;
      border-radius: 25px;
   `,
   isSmall && css`
      width: 245px;
      height: 185px;
      border-radius: 8px;
   `,
   isTiny && css`
      width: 145px;
      height: 110px;
      border-radius: 8px;
      & >a {
         display: none;
      }
   `

]);

export const CardOverlay = styled.div`
   ${tw`absolute w-full h-full p-4 top-0 left-0 flex flex-col justify-between cursor-pointer opacity-0 hover:opacity-100`}

   background-color: rgba(0, 0, 0, 0.6);
   transition: opacity .2s linear;
`;

export const CardDetails = styled.div`
   ${tw`flex items-center mt-4 pr-1`}

   width: 280px;
   ${({ showActionBar }) => !showActionBar && tw`hidden`}
`;