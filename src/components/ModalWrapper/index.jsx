import React from 'react';
import { Portal } from "react-portal";

import { ModalOvarlay } from './styles';

const ModalWrapper = ({ children }) => {
   return (
      <Portal node={document && document.getElementById('portal-modal')}>
         <ModalOvarlay>
            {children}
         </ModalOvarlay>
      </Portal>
   )
}

export default ModalWrapper;
