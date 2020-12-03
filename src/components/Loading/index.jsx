import React, { useContext } from 'react';
import tw from "twin.macro";
import { Portal } from "react-portal";

import { StoreContext } from "../../store";
import { FlexBox } from '..';
import { ReactComponent as LoadingSpinner } from "../../assets/svg/loading2.svg";

const Loading = () => {
   const context = useContext(StoreContext);
   const { state: { global } } = context;

   return (
      global.status === "loading" && <Portal node={document && document.getElementById('portal-loading')}>
         <FlexBox css={[tw`w-screen h-screen absolute inset-0 bg-black bg-opacity-50 z-30`]}>
            <LoadingSpinner />
         </FlexBox>
      </Portal>
   )
}

export default Loading;
