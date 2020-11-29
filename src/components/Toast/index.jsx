import React, { useContext } from 'react';
import tw, { styled } from "twin.macro";
import { Portal } from "react-portal";

import { Text } from '..';
import { ReactComponent as ExclamationCircleIcon } from "../../assets/svg/exclamation-circle.svg";
import { ReactComponent as ExclamationTriangleIcon } from "../../assets/svg/exclamation-triangle.svg";
import { ReactComponent as InfoCircleIcon } from "../../assets/svg/info-circle.svg";
import { ReactComponent as XIcon } from "../../assets/svg/x.svg";
import { StoreContext } from '../../store';
import types from "../../store/types";

const Toast = () => {
   const context = useContext(StoreContext);
   const { state: { global: { toast } }, dispatch } = context;

   const dismissToast = () => {
      dispatch({
         namespace: "global",
         type: types.DISMISS_TOAST
      });
   }

   const renderIcon = () => {
      switch(toast.type) {
         case "info":
            return <InfoCircleIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]} />
         case "warning":
            return <ExclamationTriangleIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]} />
         case "error":
            return <ExclamationCircleIcon css={[tw`fill-current text-chill-gray4 w-4 h-4`]}/>
         default:
            return;
      }
   }

   return (
      toast.isActive &&
      <Portal node={document && document.getElementById("portal-toast")}>
         <ToastWrapper type={toast.type}>
            {renderIcon()}
            <Text css={[tw`text-chill-gray4`]}>{ toast.message }</Text>
            <XIcon
               css={[tw`fill-current text-chill-gray4 w-3 h-3 cursor-pointer`]}
               onClick={dismissToast}
            />
         </ToastWrapper>
      </Portal>
   );
}

const ToastWrapper = styled.div(({type}) => [
   tw`fixed top-0 left-0 w-full h-10 px-4 flex justify-between items-center`,

   type === "info" && tw`bg-green-300`,
   type === "warning" && tw`bg-orange-300`,
   type === "error" && tw`bg-red-300`,
]);

export default Toast;

