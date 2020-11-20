import { styled, theme } from "twin.macro";
import Tippy from "@tippyjs/react";

export const TooltipWrapper = styled(Tippy)`
   background: ${theme`colors.chill.gray4`};
   font-size: 12px;
   font-weight: 500;

   &[data-placement^=left]>.tippy-arrow::before,
   &[data-placement^=right]>.tippy-arrow::before,
   &[data-placement^=top]>.tippy-arrow::before,
   &[data-placement^=bottom]>.tippy-arrow::before {
      transform: scale(0.8);
   }
   .tippy-arrow {
      color: ${theme`colors.chill.gray4`};
   }
`;