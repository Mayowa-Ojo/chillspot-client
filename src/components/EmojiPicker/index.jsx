import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = forwardRef(({ style, setEmoji }, ref) => {
   const [isActive, setIsActive] = useState(false);

   const togglePicker = () => {
      setIsActive(!isActive);
   }

   useImperativeHandle(ref, () => ({
      toggleEmojiPicker: togglePicker
   }));

   return (
      isActive && (
         <div>
            <Picker
               set="twitter"
               title=""
               style={style}
               onClick={setEmoji}
               onSelect={togglePicker}
            />
         </div>
      )
   )
});

export default EmojiPicker;
