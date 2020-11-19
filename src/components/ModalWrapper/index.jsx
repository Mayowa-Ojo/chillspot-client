import React from 'react';
import tw from "twin.macro";
import { Portal } from "react-portal";

import { FlexBox } from '..';
import { ModalOvarlay } from './styles';
import { ReactComponent as XIcon} from "../../assets/svg/x.svg";

const ModalWrapper = ({ children }) => {
   return (
      <Portal node={document && document.getElementById('portal-modal')}>
         <ModalOvarlay>
            <FlexBox css={[tw`absolute top-0 right-0 w-10 h-10 z-10 cursor-pointer`]}>
               <XIcon css={[tw`fill-current text-white w-3 h-3 opacity-75 hover:opacity-100`]} />
            </FlexBox>
            {children}
         </ModalOvarlay>
      </Portal>
   )
}

export default ModalWrapper;
