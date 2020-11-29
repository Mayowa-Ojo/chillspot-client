import React from 'react';
import tw from "twin.macro";
import Select from "react-select";
import { useDropzone } from "react-dropzone";

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
} from './styles';
import { ReactComponent as ImageIcon } from "../../assets/svg/image.svg";
import { ReactComponent as GifIcon } from "../../assets/svg/gif.svg";
import { ReactComponent as UploadIcon } from "../../assets/svg/upload.svg";
import { ReactComponent as QuestionMarkIcon } from "../../assets/svg/question-mark.svg";

const NewStory = () => {
   const tagOptions = [
      { value: 'beach', label: 'Beach' },
      { value: 'resort', label: 'Resort' },
      { value: 'park', label: 'Park' },
      { value: 'museum', label: 'Museum' },
      { value: 'campground', label: 'Campground' },
      { value: 'mountain', label: 'Mountain' },
      { value: 'desert', label: 'Desert' },
   ]

   const handleUpload = (files) => {
      if(files.length > 1) {
         console.warn("[WARNING]: you can only upload one file at once.");
         // display toast notification
         return
      }
      console.log(files)
      // make api call to upload image to s3 bucket
   }

   const { getInputProps, getRootProps } = useDropzone({
      accept: "image/*",
      onDrop: handleUpload
   });

   return (
      <UploadContainer>
         <UploadContainerInner>
            <ImageUpload>
               <ImageUploadMain {...getRootProps()}>
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
                     <Text as="h1" css={[tw`text-c-18 mt-1`]}>(1600x12000 or larger recommended, up to 5MB each)</Text>
                  </FlexBox>
                  <FileInput {...getInputProps()}/>
               </ImageUploadMain>
               <Text css={[tw`text-c-18 font-semibold mt-6`]}>Multiple Images</Text>
               <FlexBox css={[tw`justify-between mt-4`]}>
                  { Array(8).fill().map((_, index) => (
                        <Bucket key={index}>
                           <ImageUploadThumbnail {...getRootProps()}>
                              <FileInput {...getInputProps()}/>
                           </ImageUploadThumbnail>
                        </Bucket>
                     ))
                  }
               </FlexBox>
            </ImageUpload>

            <UploadDetails>
               <FormContainer>
                  <FormField>
                     <FormLabel htmlFor="title">Title</FormLabel>
                     <FormInputBox>
                        <FormInput id="title" placeholder="e.g Niagara Falls"/>
                     </FormInputBox>
                  </FormField>
                  <FormField>
                     <FormLabel htmlFor="location">Location</FormLabel>
                     <FormInputBox>
                        <FormInput id="location" placeholder="e.g Ontario, Canada"/>
                     </FormInputBox>
                  </FormField>
                  <FormField>
                     <Bucket as="span" css={[tw`inline-flex items-center`]}>
                        <FormLabel htmlFor="tags">Tags</FormLabel>
                        <Tooltip content="Select one or more tags. You can create a new tag if you don't find a match." placement="top">
                           <QuestionMarkIcon css={[tw`fill-current text-chill-gray4 ml-2 text-opacity-75`]}/>
                        </Tooltip>
                     </Bucket>
                     <FormSelectBox>
                        <Select 
                           options={tagOptions}
                           isMulti
                           name="tags"
                           className="select-tags"
                           classNamePrefix="select"
                           placeholder="Select tags..."
                        />
                     </FormSelectBox>
                  </FormField>
                  <FormField>
                     <FormLabel>Story</FormLabel>
                     <Editor />
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
               </FormContainer>
            </UploadDetails>
         </UploadContainerInner>

         <UploadFooter>
            <FooterAction css={[tw`border border-chill-gray3 hover:text-chill-indigo1`]}>Cancel</FooterAction>
            <FooterAction css={[tw`bg-chill-indigo2 text-white hover:bg-chill-indigo1`]}>Publish Story</FooterAction>
         </UploadFooter>
      </UploadContainer>
   )
}


export default NewStory;
