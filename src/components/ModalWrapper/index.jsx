import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import tw from "twin.macro";
import { Portal } from "react-portal";

import { FlexBox } from '..';
import { ModalOvarlay } from './styles';
import { Story, NewStory } from "../../containers";
import { ReactComponent as XIcon} from "../../assets/svg/x.svg";

const ModalWrapper = ({ component }) => {
   const history = useHistory();

   const modalComponents = {
      story: Story,
      newStory: NewStory
   }
   const CurrentModal = modalComponents[component];

   const closeModal = (e) => {
      e.stopPropagation();
      history.goBack();
   }

   useEffect(() => {
      document.body.classList.add("overflow-hidden");

      return () => {
         document.body.classList.remove("overflow-hidden");
      }

   }, []);

   return (
      <Portal node={document && document.getElementById('portal-modal')}>
         <ModalOvarlay>
            <FlexBox css={[tw`absolute top-0 right-0 w-10 h-10 z-10 cursor-pointer`]} onClick={closeModal}>
               <XIcon css={[tw`fill-current text-white w-3 h-3 opacity-75 hover:opacity-100`]} />
            </FlexBox>
            <CurrentModal />
         </ModalOvarlay>
      </Portal>
   )
}

export default ModalWrapper;
