import React, { useMemo, useCallback } from 'react';
import tw from "twin.macro";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { EditableBox, EditorWrapper, ToolbarButton, ToolbarBox, ToolbarItem, ToolbarItems, VerticalDivider } from './styles';
import { ReactComponent as BoldIcon } from "../../assets/svg/bold.svg";
import { ReactComponent as ItalicIcon } from "../../assets/svg/italic.svg";
import { ReactComponent as UnderlineIcon } from "../../assets/svg/underline.svg";
import { ReactComponent as OrderedListIcon } from "../../assets/svg/ordered-list.svg";
import { ReactComponent as UnorderedListIcon } from "../../assets/svg/unordered-list.svg";
import { ReactComponent as QuoteIcon } from "../../assets/svg/quote.svg";
import { ReactComponent as AtIcon } from "../../assets/svg/at.svg";
import { ReactComponent as EmojiIcon } from "../../assets/svg/emoji.svg";

const ChillEditor = ({ editorValue, setEditorValue }) => {
   const editor = useMemo(() => withReact(createEditor()), []);

   const renderElement = useCallback(props => {
      return <Element {...props}/>
   }, []);

   const renderLeaf = useCallback(props => {
      return <Leaf {...props}/>
   }, []);

   const handleKeyEvent = (e) => {
      if(!e.ctrlKey) return;

      switch(e.key) {
         case "b":
            e.preventDefault();
            EditorCommands.toggleMark(editor, "bold");
            break;
         case "i":
            e.preventDefault();
            EditorCommands.toggleMark(editor, "italic");
            break;
         case "u":
            e.preventDefault();
            EditorCommands.toggleMark(editor, "underline");
            break;
         default:
            console.warn(`[WARNING]: Unrecognized key command [${e.key}]`);
      }
   }

   const handleToolbarAction = (e, type) => {
      e.preventDefault();

      switch(type) {
         case "bold":
         case "italic":
         case "underline":
            EditorCommands.toggleMark(editor, type);
            break;
         case "block-quote":
         case "ordered-list":
         case "unordered-list":
         case "list-item":
            EditorCommands.toggleBlock(editor, type);
            break;
         default:
            console.warn(`[WARNING]: Unrecognized toolbar command [${type}]`);
      }
   }

   return (
      <EditorWrapper>
         <EditableBox>
            <Slate editor={editor} value={editorValue} onChange={value => setEditorValue(value)}>
               <Editable 
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  onKeyDown={handleKeyEvent}
                  placeholder="write about your experience..."
               />
            </Slate>
         </EditableBox>
         <ToolbarBox>
            <ToolbarItems>
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "bold")}>
                     <BoldIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "italic")}>
                     <ItalicIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "underline")}>
                     <UnderlineIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <VerticalDivider />
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "ordered-list")}>
                     <OrderedListIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "unordered-list")}>
                     <UnorderedListIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <VerticalDivider />
               <ToolbarItem>
                  <ToolbarButton onClick={(e) => handleToolbarAction(e, "block-quote")}>
                     <QuoteIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <ToolbarItem>
                  <ToolbarButton>
                     <AtIcon css={[tw`fill-current text-chill-gray4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
               <ToolbarItem>
                  <ToolbarButton>
                     <EmojiIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 opacity-75`]}/>
                  </ToolbarButton>
               </ToolbarItem>
            </ToolbarItems>
         </ToolbarBox>
      </EditorWrapper>
   )
}

const Leaf = ({attributes, leaf, children}) => (
   <span
      {...attributes}
      style={{ 
         fontWeight: leaf.bold ? 'bold' : 'normal',
         fontStyle: leaf.italic ? 'italic' : 'normal',
         textDecoration: leaf.underline ? 'underline' : 'initial'
      }}
   >
      {children}
   </span>
);

const Element = ({attributes, element, children}) => {
   switch(element.type) {
      case "block-quote":
         return <blockquote {...attributes}>{children}</blockquote>
      case "ordered-list":
         return <ol {...attributes}>{children}</ol>
      case "unordered-list":
         return <ul {...attributes}>{children}</ul>
      case "list-item":
         return <li {...attributes}>{children}</li>
      default:
         return <p {...attributes}>{children}</p>
   }
}

const EditorCommands = {
   isMarkActive(editor, format) {
      const [match] = Editor.nodes(editor, {
         match: n => n[format] === true,
         universal: true
      });

      return !!match;
   },
   isBlockActive(editor, format) {
      const [match] = Editor.nodes(editor, {
         match: n => n.type === format
      });

      return !!match;
   },
   toggleMark(editor, format) {
      const markItems = ["bold", "italic", "underline"];
      if(!markItems.includes(format)) return;

      const isActive = EditorCommands.isMarkActive(editor, format);

      Transforms.setNodes(
         editor,
         { [format]: isActive ? null : true },
         { match: n => Text.isText(n), split: true }
      );
   },
   toggleBlock(editor, format) {
      const listTypes = ["ordered-list", "unordered-list"];
      const isActive = EditorCommands.isBlockActive(editor, format);
      const isListType = listTypes.includes(format);

      Transforms.unwrapNodes(editor, {
         match: n => listTypes.includes(n.type),
         split: true
      });

      Transforms.setNodes(editor, {
         type: isActive ? "paragraph" : isListType ? "list-item" : format
      });

      if(!isActive && isListType) {
         const block = { type: format, children: []}
         Transforms.wrapNodes(editor, block);
      }
   }
}

export default ChillEditor;
