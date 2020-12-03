import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import tw, { styled } from "twin.macro";
import { Portal } from "react-portal";

import types from "../../store/types";
import { StoreContext } from '../../store';
import { Text } from '..';
import { ReactComponent as ExclamationCircleIcon } from "../../assets/svg/exclamation-circle.svg";
import { ReactComponent as ExclamationTriangleIcon } from "../../assets/svg/exclamation-triangle.svg";
import { ReactComponent as InfoCircleIcon } from "../../assets/svg/info-circle.svg";
import { ReactComponent as XIcon } from "../../assets/svg/x.svg";

const Toast = () => {
   const context = useContext(StoreContext);
   const { state: { global: { toast } }, dispatch } = context;
   const [timer, setTimer] = useState(null);

   /**
    * timer is a dependency of the effect below but we dont want
    * to trigger a re-render everytime timer changes so we store
    * the value in a ref and pass the ref to the dependency array
    * instead.
    */
   const timerRef = useRef(timer);
   timerRef.current = timer;

   const dismissToast = useCallback(() => {
      dispatch({
         namespace: "global",
         type: types.DISMISS_TOAST
      });
   }, [dispatch]);

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

   useEffect(() => {
      if(toast.isActive) {
         const timerId = setTimeout(dismissToast, 10000);
         setTimer(timerId);
         return;
      }

      clearTimeout(timerRef.current);
   }, [toast.isActive, dismissToast, timerRef]); // this effect won't run when timerRef changes

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
   tw`fixed top-0 left-0 w-full h-10 px-4 flex justify-between items-center z-30`,

   type === "info" && tw`bg-green-300`,
   type === "warning" && tw`bg-orange-300`,
   type === "error" && tw`bg-red-300`,
]);

export default Toast;

