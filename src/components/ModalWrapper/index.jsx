import React, { useContext, useEffect } from 'react';
import tw from "twin.macro";
import { Portal } from "react-portal";

import { FlexBox } from '..';
import { ModalOvarlay } from './styles';
import { Story, NewStory } from "../../containers";
import { ReactComponent as XIcon} from "../../assets/svg/x.svg";
import { StoreContext } from "../../store";
import types from "../../store/types";

const ModalWrapper = () => {
   const context = useContext(StoreContext);
   const { state: { modal }, dispatch } = context;

   const modalComponents = {
      story: Story,
      newStory: NewStory
   }
   const CurrentModal = modalComponents[modal.component];

   const closeModal = () => {
      dispatch({
         namespace: "modal",
         type: types.TOGGLE_MODAL,
      });
   }

   useEffect(() => {
      if(modal.isOpen) {
         document.body.classList.add("overflow-hidden");
         return;
      }

      document.body.classList.remove("overflow-hidden")
   }, [modal.isOpen]);

   return (
      <Portal node={document && document.getElementById('portal-modal')}>
         { modal.isOpen && 
            <ModalOvarlay>
               <FlexBox css={[tw`absolute top-0 right-0 w-10 h-10 z-10 cursor-pointer`]} onClick={closeModal}>
                  <XIcon css={[tw`fill-current text-white w-3 h-3 opacity-75 hover:opacity-100`]} />
               </FlexBox>
               <CurrentModal />
            </ModalOvarlay>
         }
      </Portal>
   )
}

export default ModalWrapper;
