import React from 'react';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";

import { TooltipWrapper } from './styles';

const Tooltip = ({ content, placement, children }) => {
   return (
      <TooltipWrapper
         content={content}
         placement={placement}
         animation="scale-subtle"
      >
         {children}
      </TooltipWrapper>
   )
}

export default Tooltip;
