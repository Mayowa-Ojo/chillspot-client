import tw, { styled, theme } from "twin.macro";
import Tippy from "@tippyjs/react";

export const PopoverWrapper = styled(Tippy)`
   ${tw`bg-white border border-chill-gray2`}

   min-width: 245px;
   border-radius: 8px;
   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
   .tippy-content {
      padding: 0;
   }

   &[data-placement^=bottom]>.tippy-arrow::after {
      border-color: transparent;
      border-bottom-color: ${theme`colors.chill.gray2`};
      border-width: 0 7px 7px 7px;
      bottom: 17px;
      left: 1px;
      border-style: solid;
      content: "";
      position: absolute;
      z-index: -1;
   }
   .tippy-arrow {
      color: ${theme`colors.white`};
   }
`;