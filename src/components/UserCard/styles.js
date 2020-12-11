import tw, { styled } from "twin.macro";

export const CardWrapper = styled.div`
   ${tw`flex flex-col items-center p-6 rounded-xl bg-chill-gray1 border border-chill-gray2 mr-8 mt-8`}

   width: 370px;
   height: 350px;
`;

export const CardAvatar = styled.div`
   ${tw`inline-flex items-center justify-center bg-white border-2 border-chill-indigo1 rounded-full`}

   width: 80px;
   height: 80px;
   span {
      width: 72px;
      height: 72px;
   }
`;

export const CardStats = styled.div`
   ${tw`flex items-center justify-center mt-4`}
`;

export const CardStat = styled.div`
   ${tw`flex flex-col items-center`}
`;

export const CardStatsDivider = styled.div`
   ${tw`block h-full bg-chill-gray3 mx-6`}

   width: 2px;
`;

export const CardButton = styled.div``;
