import React, { useEffect } from 'react';
import tw, { styled } from "twin.macro";
import { Portal } from "react-portal";

const DialogBox = ({ children }) => {
   useEffect(() => {
      document.body.classList.add("overflow-hidden");

      return () => {
         document.body.classList.remove("overflow-hidden");
      }

   }, []);

   return (
      <Portal node={document && document.getElementById('portal-dialog-box')}>
         <ModalOvarlay>
         <DialogContainer>
            {children}
         </DialogContainer>
         </ModalOvarlay>
      </Portal>
   )
}

const ModalOvarlay = styled.div`
   ${tw`w-full h-full fixed top-0 left-0 z-30`}

   background: rgba(0,0,0,.8);
   overflow-y: hidden;
`;

const DialogContainer = styled.div`
   ${tw`w-full h-full flex justify-center items-center`}
`;

export default DialogBox;
