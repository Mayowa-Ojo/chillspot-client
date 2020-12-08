import React, { useContext, useState, useRef, useEffect } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";

import { StoreContext } from "../../store";
import types from "../../store/types";
import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { parseTimeDiff } from "../../utils/common";
import { Avatar, FlexBox, Image, Text, Bucket, Tooltip, Dropdown, EmojiPicker } from "..";
import { ActionBar, CommentWrapper , CommentInputBox, CommentInput} from "./styles";
import { ReactComponent as HeartIcon } from "../../assets/svg/heart.svg"
import { ReactComponent as BrokenHeartIcon } from "../../assets/svg/broken-heart.svg"
import { ReactComponent as ReplyIcon } from "../../assets/svg/reply.svg"
import { ReactComponent as EmojiIcon } from "../../assets/svg/emoji.svg"
import { ReactComponent as KebabMenuIcon } from "../../assets/svg/kebab-menu.svg"
import { ReactComponent as ExclamationCircleIcon } from "../../assets/svg/exclamation-circle.svg"

const Comment = ({ comment }) => {
   const context = useContext(StoreContext);
   const { state: { auth: { profile }}, dispatch} = context;
   const [isEditing, setIsEditing] = useState(false);
   const [commentInput, setCommentInput] = useState(comment.content);
   const [isLiked, setIsLiked] = useState(false);
   const [isDisliked, setIsDisliked] = useState(false);

   useEffect(() => {
      if(!profile || !profile.likes) return;

      setIsLiked(comment.likedBy.includes(profile._id));
      setIsDisliked(comment.dislikedBy.includes(profile._id));
   }, []);

   const emojiRef = useRef(null);

   const handleCommentInput = (e) => {
      setCommentInput(e.target.value);
   }

   const handleCommentUpdate = async (evt, action) => {
      if(!["edit", "like", "dislike"].includes(action)) return;

      if(action === "edit" && evt.key === "Enter") {
         if(commentInput === "") return;
         try {
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "loading"
            });

            const { data: updatedCommentResponse } = await httpRequest(
               requestEndpoints.comments.update(comment._id), {
               method: "PATCH",
               data: {
                  content: commentInput
               }
            });

            dispatch({
               namespace: "stories",
               type: types.SET_CURRENT_STORY_COMMENTS,
               payload: updatedCommentResponse.data.comments
            });

            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "done"
            });
         } catch (err) {
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "error"
            });
   
            dispatch({
               namespace: "global",
               type: types.SHOW_TOAST,
               payload: {
                  type: "error",
                  message: "Oops! something went wrong, please check your network and try again."
               }
            });
            console.error(err.response || err.message);
         }
         setCommentInput("");
         return;
      }

      if(!evt) {
         try {
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "loading"
            });
   
            const { data: updatedCommentResponse } = await httpRequest(
               requestEndpoints.comments[action](comment._id), {
               method: "PATCH"
            });
   
            dispatch({
               namespace: "stories",
               type: types.SET_CURRENT_STORY_COMMENTS,
               payload: updatedCommentResponse.data.comments
            });
   
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "done"
            });
         } catch (err) {
            dispatch({
               namespace: "global",
               type: types.SET_STATUS,
               payload: "error"
            });
   
            dispatch({
               namespace: "global",
               type: types.SHOW_TOAST,
               payload: {
                  type: "error",
                  message: "Oops! something went wrong, please check your network and try again."
               }
            });
            console.error(err.response || err.message);
         }
      }
   }

   const handleCommentDelete = async () => {
      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: deleteCommentResponse } = await httpRequest(
            requestEndpoints.comments.delete(comment._id), {
            method: "DELETE"
         });

         dispatch({
            namespace: "stories",
            type: types.SET_CURRENT_STORY_COMMENTS,
            payload: deleteCommentResponse.data.comments
         });

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "error"
         });

         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Oops! something went wrong, please check your network and try again."
            }
         });
         console.error(err.response || err.message);
      }
   }

   const setEmojiInput = (emoji) => {
      setCommentInput(`${commentInput}${emoji.native}`);
   }

   const toggleCommentEditor = () => setIsEditing(!isEditing);

   return (
      <CommentWrapper>
         <FlexBox isCol css={[tw`mr-2`]}>
            <Link to={`/u/${comment.author.username}/stories`}>
               <Avatar css={[tw`w-10 h-10 cursor-pointer`]}>
                  <Image src={comment.author.avatar.url} alt="user avatar" />
               </Avatar>
            </Link>
            <Bucket as="span" css={[tw`bg-chill-gray3 rounded-xl mt-2 block flex-auto`, "width: 2px;"]}></Bucket>
         </FlexBox>

         <FlexBox isCol css={[tw`flex-auto items-start pb-5`]}>
            <Link to={`/u/${comment.author.username}/stories`}>
               <Text css={[tw`font-bold cursor-pointer hover:text-chill-indigo1`]}>{comment.author.firstname} {comment.author.lastname}</Text>
            </Link>
            <Text css={[tw`text-opacity-75`]}>{parseTimeDiff(comment.createdAt)}</Text>
            {isEditing ?
               <CommentInputBox>
                  <CommentInput 
                     placeholder="Add a comment"
                     value={commentInput}
                     onChange={handleCommentInput} 
                     onKeyDown={(e) => handleCommentUpdate(e, "edit")}
                  />
                  <EmojiIcon 
                     css={[tw`fill-current text-chill-gray4 absolute cursor-pointer`]}
                     onClick={() => emojiRef.current.toggleEmojiPicker()}
                  />
                  <EmojiPicker style={{position: "absolute", right: 0, top: 50}} ref={emojiRef} setEmoji={setEmojiInput} />
               </CommentInputBox>
            :
               <Text css={[tw`mt-3`]}>{comment.content}</Text>
            }
            <ActionBar>
               <FlexBox>
                  <Bucket 
                     as="span"
                     css={[tw`inline-flex items-center text-c-15 font-medium text-chill-gray4`]}
                     onClick={() => handleCommentUpdate(null, "like")}
                  >
                     <Tooltip content="like" placement="top">
                        <HeartIcon css={[tw`stroke-current text-chill-gray4 w-4 h-4 mr-2 cursor-pointer`, isLiked && tw`text-chill-indigo2`]} />
                     </Tooltip>
                     {comment.likes}
                  </Bucket>
                  <Bucket
                     as="span"
                     css={[tw`inline-flex items-center text-c-15 font-medium text-chill-gray4 ml-3`]}
                     onClick={() => handleCommentUpdate(null, "dislike")}
                  >
                     <Tooltip content="dislike" placement="top">
                        <BrokenHeartIcon css={[tw`fill-current text-chill-gray4 mr-2 cursor-pointer`, isDisliked && tw`text-chill-indigo2`]} />
                     </Tooltip>
                     {comment.dislikes}
                  </Bucket>
                  <Bucket as="span" css={[tw`ml-3 cursor-not-allowed`]}>
                  <Tooltip content="reply" placement="top">
                     <ReplyIcon css={[tw`fill-current text-chill-gray4 mr-2`, "margin-bottom: 2px;"]} />
                  </Tooltip>
                  </Bucket>
               </FlexBox>
               <Dropdown 
                  trigger={<CommentDropdownTrigger />}
                  content={
                     <CommentDropdownContent
                        hideOption={comment.author._id !== profile._id}
                        toggleCommentEditor={toggleCommentEditor}
                        isEditing={isEditing}
                        handleCommentDelete={handleCommentDelete}
                     />
                  }
                  placement="left"
               />
            </ActionBar>
         </FlexBox>
      </CommentWrapper>
   )
}

const CommentDropdownTrigger = () => (
   <Tooltip content="more actions" placement="top">
   <Bucket as="span" css={[tw`inline-flex items-center justify-center w-8 h-8 bg-transparent rounded-full cursor-pointer hover:bg-gray-200`]}>
      <KebabMenuIcon css={[tw`fill-current text-chill-gray4`]} />
   </Bucket>
   </Tooltip>
);

const CommentDropdownContent = ({ hideOption, toggleCommentEditor, isEditing, handleCommentDelete }) => (
   <Bucket as="ul" css={[tw`py-2 w-full`, "width: max-content"]}>
      <Text 
         as="li"
         css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`, hideOption && tw`hidden`]}
         onClick={toggleCommentEditor}
      >{isEditing ? "Cancel" : "Edit comment"}</Text>
      <Text
         as="li"
         css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer`, hideOption && tw`hidden`]}
         onClick={handleCommentDelete}
      >Delete comment</Text>
      <Text as="li" css={[tw`px-4 py-2 text-c-12 hover:bg-chill-gray2 cursor-pointer flex items-center`]}>
         <ExclamationCircleIcon css={[tw`fill-current text-chill-gray4 w-4 h-4 mr-2`]}/>
         Report
      </Text>
   </Bucket>
);

export default Comment;
