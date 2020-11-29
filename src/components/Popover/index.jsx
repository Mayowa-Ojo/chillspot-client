import React from 'react';
import "tippy.js/dist/tippy.css";

import { PopoverWrapper } from "./styles";

const Popover = ({ placement, content, trigger, children }) => {
   return (
      <PopoverWrapper
         placement={placement}
         animation="scale-subtle"
         interactive={true}
         content={content}
         trigger={trigger}
      >
         {children}
      </PopoverWrapper>
   )
}

export default Popover;
