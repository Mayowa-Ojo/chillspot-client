import React, { useState, useContext } from 'react';
import tw from "twin.macro";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import httpRequest from "../../services/http";
import { requestEndpoints } from "../../constants";
import { StoreContext } from "../../store";
import types from "../../store/types";
import { Bucket, FlexBox, Text , Editor, Tooltip} from "../../components";
import { FormContainer,
   FormField,
   FormLabel,
   FormInputBox,
   ImageUpload,
   ImageUploadMain,
   ImageUploadThumbnail,
   MediaTypes,
   UploadContainer,
   UploadContainerInner,
   UploadDetails,
   FormInput,
   FormSelectBox,
   FileInput,
   CheckBoxLabel,
   CheckBox,
   CheckBoxSwitch,
   UploadFooter,
   FooterAction,
   ImageDeleteButton,
} from './styles';
import { ReactComponent as ImageIcon } from "../../assets/svg/image.svg";
import { ReactComponent as GifIcon } from "../../assets/svg/gif.svg";
import { ReactComponent as UploadIcon } from "../../assets/svg/upload.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete.svg";
import { ReactComponent as QuestionMarkIcon } from "../../assets/svg/question-mark.svg";

const NewStory = () => {
   const history = useHistory();
   const context = useContext(StoreContext);
   const { state: { auth: { profile }}, dispatch } = context;

   const [editorValue, setEditorValue] = useState([
      {
         type: 'paragraph',
         children: [{ text: '' }],
      },
   ]);
   const [thumbnails, setThumbnails] = useState([]);

   const tagOptions = [
      { value: 'beach', label: 'Beach' },
      { value: 'resort', label: 'Resort' },
      { value: 'park', label: 'Park' },
      { value: 'museum', label: 'Museum' },
      { value: 'campground', label: 'Campground' },
      { value: 'mountain', label: 'Mountain' },
      { value: 'monument', label: 'Monument' },
      { value: 'tour', label: 'Tour' },
      { value: 'landmark', label: 'Landmark' },
      { value: 'desert', label: 'Desert' },
   ];

   const { register, handleSubmit: handleValidation, errors, control } = useForm({
      mode: "onBlur"
   });

   const handleUpload = async (files) => {
      if(files.length > 1) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "You can only upload one file at once."
            }
         });
         return
      }

      if(files[0].size > 5242880) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "warning",
               message: "File is too large, accpeted limit is 5MB."
            }
         });

         return;
      }

      try {
         const fd = new FormData();
         fd.append("image", files[0])

         const { data: response } = await httpRequest(requestEndpoints.images.upload, {
            method: "POST",
            "content-type": "multipart/form-data",
            data: fd,
         });

         setThumbnails([...thumbnails, { url: response.data.url, key: response.data.key }]);
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Failed to upload, please try again."
            }
         });
      }
   }

   const handleImageDelete = async (event, index) => {
      event.preventDefault();
      event.stopPropagation();

      try {
         // make api call to delete image from bucket
         await httpRequest(requestEndpoints.images.delete(thumbnails[index].key), {
            method: "DELETE",
         });
   
         const copy = [...thumbnails];
         copy.splice(index, 1);
         setThumbnails(copy);
      } catch (err) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "error",
               message: "Failed to delete, please try again."
            }
         });
      }
   }

   const { getInputProps, getRootProps } = useDropzone({
      accept: "image/*",
      onDrop: handleUpload
   });

   const handleSubmit = async (data) => {
      const tags = data.tags.map(tag => tag.value);
      const content = JSON.stringify(editorValue);

      const payload = {
         ...data,
         tags,
         thumbnails,
         content
      }

      if(thumbnails.length < 1) {
         dispatch({
            namespace: "global",
            type: types.SHOW_TOAST,
            payload: {
               type: "warning",
               message: "Please upload one or more images."
            }
         });

         return;
      }

      try {
         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "loading"
         });

         const { data: response } = await httpRequest(requestEndpoints.stories.create, {
            method: "POST",
            data: payload
         });

         console.log(response);

         dispatch({
            namespace: "global",
            type: types.SET_STATUS,
            payload: "done"
         });

         history.push(`/u/${profile.username}/stories`); // NOTE: path should indicate user id
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
               message: "An error occured, please try again."
            }
         });
      }
   }

   return (
      <UploadContainer>
         <FormContainer autocomplete="off" onSubmit={handleValidation(handleSubmit)}>
         <UploadContainerInner>
            <ImageUpload>
               <ImageUploadMain {...getRootProps()} showPreview={!!thumbnails[0]} url={thumbnails[0]?.url}>
                  <ImageDeleteButton data-delete-thumbnail onClick={(e) => handleImageDelete(e, 0)}>
                     <DeleteIcon css={[tw`fill-current text-white w-4 h-4`]} />
                  </ImageDeleteButton>
                  <MediaTypes>
                     <FlexBox>
                        <ImageIcon css={[tw`fill-current text-chill-gray3 w-10 h-10`]}/>
                        <FlexBox isCol css={[tw`items-start ml-3`]}>
                           <Text css={[tw`font-semibold`]}>One high resolution image</Text>
                           <Text>PNG, JPG, GIF + Cropping</Text>
                        </FlexBox>
                     </FlexBox>
                     <Bucket as="span" css={[tw`inline-block mx-8 h-8 bg-chill-gray3`, "width: 1px;"]}/>
                     <FlexBox>
                        <GifIcon css={[tw`fill-current text-chill-gray3 w-10 h-10`]}/>
                        <FlexBox isCol css={[tw`items-start ml-3`]}>
                           <Text css={[tw`font-semibold`]}>Animated GIF</Text>
                           <Text>400x300, 800x600 or 1600x1200</Text>
                        </FlexBox>
                     </FlexBox>
                  </MediaTypes>

                  <FlexBox isCol>
                     <UploadIcon className="is-hover" css={[tw`fill-current text-chill-gray3`]} />
                     <Text as="h1" css={[tw`text-c-24 font-semibold mt-4`]}>Drag and drop an Image</Text>
                     <Text as="h1" css={[tw`text-c-18 mt-1`]}>Or browse to choose a file</Text>
                     <Text as="h1" css={[tw`text-c-18 mt-1`]}>(1600x1200 or larger recommended, up to 5MB each)</Text>
                  </FlexBox>
                  <FileInput {...getInputProps()}/>
               </ImageUploadMain>
               <Text css={[tw`text-c-18 font-semibold mt-6`]}>Multiple Images</Text>
               <FlexBox css={[tw`justify-between mt-4`]}>
                  { Array(8).fill().map((_, index) => (
                        <Bucket key={index}>
                           <ImageUploadThumbnail {...getRootProps()} showPreview={!!thumbnails[index+1]} url={thumbnails[index+1]?.url}>
                              <ImageDeleteButton data-delete-thumbnail isSmall onClick={(e) => handleImageDelete(e, index+1)}>
                                 <DeleteIcon css={[tw`fill-current text-white w-3 h-3`]} />
                              </ImageDeleteButton>
                              <FileInput {...getInputProps()}/>
                           </ImageUploadThumbnail>
                        </Bucket>
                     ))
                  }
               </FlexBox>
            </ImageUpload>

            <UploadDetails>
               <FormField>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormInputBox>
                     <FormInput id="title" placeholder="e.g Niagara Falls" name="title" ref={register({required: true})} />
                  </FormInputBox>
                  <ValidationError message={"this field is required"} visible={!!errors.title}/>
               </FormField>
               <FormField>
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <FormInputBox>
                     <FormInput id="location" placeholder="e.g Ontario, Canada" name="location" ref={register({required: true})}/>
                  </FormInputBox>
                  <ValidationError message={"this field is required"} visible={!!errors.location}/>
               </FormField>
               <FormField>
                  <Bucket as="span" css={[tw`inline-flex items-center`]}>
                     <FormLabel htmlFor="tags">Tags</FormLabel>
                     <Tooltip content="Select one or more tags. You can create a new tag if you don't find a match." placement="top">
                        <QuestionMarkIcon css={[tw`fill-current text-chill-gray4 ml-2 text-opacity-75`]}/>
                     </Tooltip>
                  </Bucket>
                  <FormSelectBox>
                     <Controller
                        name="tags"
                        as={Select} // passing the Select component to controller for react-hook-form to handle logic
                        options={tagOptions}
                        isMulti
                        className="select-tags"
                        classNamePrefix="select"
                        placeholder="Select tags..."
                        defaultValue=""
                        control={control}
                        rules={{ required: true }}
                     />
                     <ValidationError message={"select one or more tags"} visible={!!errors.tags}/>
                  </FormSelectBox>
               </FormField>
               <FormField>
                  <FormLabel>Story</FormLabel>
                  <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
               </FormField>
               <FormField>
                  <FormLabel css={[tw`text-c-15`]}>Settings</FormLabel>
                  <CheckBoxLabel>
                     <CheckBox />
                     <CheckBoxSwitch>Only people I follow can comment</CheckBoxSwitch>
                  </CheckBoxLabel>
                  <CheckBoxLabel>
                     <CheckBox />
                     <CheckBoxSwitch>Comments are disabled</CheckBoxSwitch>
                  </CheckBoxLabel>
                  <CheckBoxLabel>
                     <CheckBox />
                     <CheckBoxSwitch>Private
                        <Tooltip content="This story will be saved in your 'archives' and can only be viewed by you." placement="top">
                           <QuestionMarkIcon css={[tw`fill-current text-chill-gray4 text-opacity-75 ml-2 w-4 h-4`]} />
                        </Tooltip>
                     </CheckBoxSwitch>
                  </CheckBoxLabel>
               </FormField>
            </UploadDetails>
         </UploadContainerInner>

         <UploadFooter>
            <FooterAction css={[tw`border border-chill-gray3 hover:bg-chill-gray2`]} onClick={() => history.goBack()}>Cancel</FooterAction>
            <FooterAction css={[tw`bg-chill-indigo2 text-white hover:bg-chill-indigo1`]} type="submit">Publish Story</FooterAction>
         </UploadFooter>
         </FormContainer>
      </UploadContainer>
   );
}

const ValidationError = ({ message, visible }) => (
   <FlexBox css={[tw`justify-start mt-1`, visible && tw`visible`, !visible && tw`invisible`]}>
      <Bucket as="span" css={[tw`inline-block w-1 h-1 mr-2 rounded-full bg-red-500`]}/>
      <Text css={[tw`text-c-12 text-red-500`]}>{message}</Text>
   </FlexBox>
);


export default NewStory;
