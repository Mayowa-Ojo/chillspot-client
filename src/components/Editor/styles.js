import tw, { styled, theme } from "twin.macro";

export const EditorWrapper = styled.div`
   ${tw`w-full mt-4 bg-chill-gray2 border-2 border-chill-gray2 flex flex-col overflow-hidden`}

   border-radius: 8px;
   min-height: 220px;
`;

export const EditableBox = styled.div`
   ${tw`flex-auto w-full p-2 text-c-15 font-medium text-chill-gray4`}

   [data-slate-editor] {
      white-space: pre-wrap;
      overflow-wrap: break-word;
   }
   blockquote {
      border-left: 2px solid ${theme`colors.gray.500`};
      margin: 8px 0px;
      padding-left: 10px;
      color: ${theme`colors.chill.gray4`};
      font-style: italic;
   }
   ol, ul {
      margin: 8px 0px;
      padding-inline-start: 24px;
   }
   ol {
      list-style-type: decimal;
   }
   ul {
      list-style-type: disc;
   }
`;

export const ToolbarBox = styled.div`
   ${tw`h-10 py-1 bg-white w-full`}
`;

export const ToolbarItems = styled.ul`
   ${tw`flex items-center justify-center w-full h-full`}
`;

export const ToolbarItem = styled.li`
   ${tw`mx-2`}
`;

export const ToolbarButton = styled.button.attrs(() => ({
   type: "button"
}))`
   ${tw`p-1 opacity-50 focus:outline-none hocus:opacity-100`}
`;

export const VerticalDivider = styled.span`
   ${tw`inline-block h-full mx-3 bg-chill-gray2 rounded-lg`}

   width: 2px;
`;