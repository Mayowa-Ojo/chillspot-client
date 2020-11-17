import tw, { styled, css } from "twin.macro";

export const CardWrapper = styled.div``;

export const CardThumbnail = styled.div(({ isSlider }) => [
   tw`relative overflow-hidden mr-8`,
   css`
      background-image: url(https://chillspot-s3-bucket.s3.us-east-2.amazonaws.com/images/london-2393098_1280.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
   `,

   isSlider && css`
      width: 280px;
      height: 230px;
      border-radius: 8px;
   `,
   !isSlider && css`
      width: 189px;
      height: 258px;
      border-radius: 25px;
   `
]);

export const CardOverlay = styled.div`
   ${tw`absolute w-full h-full p-4 top-0 left-0 flex flex-col justify-between cursor-pointer opacity-0 hover:opacity-100`}

   background-color: rgba(0, 0, 0, 0.6);
   transition: opacity .2s linear;
`;

export const CardDetails = styled.div`
   ${tw`flex items-center mt-4`}
`;