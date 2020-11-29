import React from 'react';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-subtle.css";

import { TooltipWrapper } from './styles';

const Tooltip = ({ content, placement, children, isLight }) => {
   return (
      <TooltipWrapper
         content={content}
         placement={placement}
         animation="scale-subtle"
         isLight={isLight}
         maxWidth={220}
      >
         {children}
      </TooltipWrapper>
   )
}

export default Tooltip;
