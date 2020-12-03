import tw, { styled, css, theme } from "twin.macro";

export const UploadContainer = styled.div`
   ${tw`bg-white px-4 relative mt-10`}

   border-radius: 12px 12px 0 0;
   height: calc(100vh - 2.5rem);
   overflow-y: scroll;
`;

export const UploadContainerInner = styled.div`
   ${tw`mx-auto w-full pt-8 pb-32`}

   max-width: 900px;
`;

export const ImageUpload = styled.div`
   ${tw`mx-auto w-full`}

   max-width: 800px;
`;

export const ImageUploadMain = styled.div(({ showPreview, url }) => [
   tw`relative p-6 flex flex-col items-center justify-center overflow-hidden cursor-pointer focus:outline-none`,

   css`
      height: 600px;
      border: dashed 2px ${theme`colors.chill.gray3`};
      border-radius: 8px;
      transition: border-color .2s linear;
      .is-hover {
         transition: color .2s linear;
      }
      &:hover {
         border-color: ${theme`colors.chill.indigo1`};
         .is-hover {
            color: ${theme`colors.chill.indigo1`};
         }
      }
   `,

   showPreview && css`
      border: none;
      &::before {
         content: "";
         display: block;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         position: absolute;
         z-index: 10;
         background-image: url(${url});
         background-repeat: no-repeat;
         background-position: center;
         background-size: cover;
      }
      span[data-delete-thumbnail] {
         display: inline-flex;
         opacity: 0;
         transition: opacity .2s ease-in;
      }
      &:hover {
         span[data-delete-thumbnail] {
            opacity: 100%;
         }
      }
   `
]);

export const ImageUploadThumbnail = styled.div(({ showPreview, url }) => [
   tw`relative overflow-hidden cursor-pointer focus:outline-none`,

   css`
      width: 90px;
      height: 68px;
      border: dashed 2px ${theme`colors.chill.gray3`};
      border-radius: 8px;
      transition: border-color .2s linear;
      &:hover {
         border-color: ${theme`colors.chill.indigo1`};
         .is-hover {
            color: ${theme`colors.chill.indigo1`};
         }
      }
   `,

   showPreview && css`
      border: none;
      &::before {
         content: "";
         display: block;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         position: absolute;
         z-index: 10;
         background-image: url(${url});
         background-repeat: no-repeat;
         background-position: center;
         background-size: cover;
      }
      span[data-delete-thumbnail] {
         display: inline-flex;
         opacity: 0;
         transition: opacity .2s ease-in;
      }
      &:hover {
         span[data-delete-thumbnail] {
            opacity: 100%;
         }
      }
   `
]);

export const ImageDeleteButton = styled.span(({ isSmall }) => [
   tw`items-center justify-center w-8 h-8 mr-2 mt-2 rounded-full hidden`,
   tw`absolute top-0 right-0 cursor-pointer bg-red-400 z-20 hover:bg-red-500`,

   isSmall && tw`w-6 h-6 mt-1 mr-1`
]);

export const MediaTypes = styled.ul`
   ${tw`flex items-center absolute`}

   top: 24px;
`;

export const UploadDetails = styled.div`
   ${tw`mt-8 mx-auto`}

   max-width: 475px;
`;

export const FormContainer = styled.form`
   ${tw`w-full`}
`;

export const FormField = styled.fieldset`
   ${tw`flex flex-col mt-6`}
`;

export const FormLabel = styled.label`
   ${tw`text-c-18 font-semibold text-chill-gray4`}
`;

export const FormInputBox = styled.div`
   ${tw`w-full h-10 bg-chill-gray2 mt-2 px-4 py-1`}

   border-radius: 8px;
   transition: box-shadow .2s linear;
   transition: background-color .2s linear;
   &:hover {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
   }
   &:focus-within {
      background-color: white;
      border: 1px solid ${theme`colors.chill.gray3`};
      box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.2);
   }
`;

export const FormInput = styled.input`
   ${tw`w-full h-full appearance-none bg-transparent text-c-15 text-chill-gray4 font-medium focus:outline-none`}
`;

export const FileInput = styled.input``;

export const CheckBox = styled.input.attrs(() => ({
   type: "checkbox"
}))``;

export const CheckBoxLabel = styled.label`
   display: block;
   margin-top: 12px;
   cursor: pointer;
   width: max-content;
   input {
      display: none;
      &:checked + span::after {
         background: ${theme`colors.indigo.300`};
         transform: translateX(12px) scale(0.9);
         transition: background 0.3s ease,
            transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
      }
   }

   input:checked + span::before {
      background: white;
      border: 2px solid ${theme`colors.indigo.300`};
   }

   span {
      padding-left: 40px;
      height: 22px;
      position: relative;
      &::before {
         content: "";
         display: block;
         width: 30px;
         height: 16.5px;
         margin-top: 2px;
         background: ${theme`colors.chill.gray3`};
         border: 2px solid ${theme`colors.chill.gray3`};
         border-radius: 11px;
         position: absolute;
         top: 0;
         left: 0;
         transition: background 0.3s ease, border-color 0.3s ease;
      }
      &::after {
         content: "";
         display: block;
         position: absolute;
         width: 13px;
         height: 13px;
         margin-top: 2px;
         background: white;
         border-radius: 50%;
         left: 2px;
         top: 2px;
         transition: transform 0.3s ease, opacity 0.2s ease, background 0.2s ease;
      }
   }
`;

export const CheckBoxSwitch = styled.span`
   ${tw`text-c-12 font-semibold text-chill-gray4 inline-flex items-center`}
`;

export const FormSelectBox = styled.div`
   ${tw`w-full mt-2`}

   .select-tags {
      background: ${theme`colors.chill.gray2`};
      border: none;
      border-radius: 8px;
      height: 40px;
      &:hover {
         background-color: white;
         border: 1px solid ${theme`colors.chill.gray3`};
         box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.1);
      }
      &:focus {
         background-color: white;
         border: 1px solid ${theme`colors.chill.gray3`};
         box-shadow: 0px 0px 0px 4px rgba(125, 124, 228, 0.2);
      }
   }
   .select {
      &__control {
         background: transparent;
         border: none;
         border-radius: 8px;
         font-size: ${theme`fontSize.c-15`};
         font-weight: 500;
         font-family: 'Montserrat', sans-serif;
         color: ${theme`colors.chill.gray4`};
         box-shadow: none !important;
      }
      &__multi-value {
         background: ${theme`colors.gray.400`}
      }
      &__multi-value__label {
         color: ${theme`colors.chill.gray4`};
      }
      &__multi-value__remove {
         cursor: pointer;
      }
      &__multi-value__remove:hover {
         background: ${theme`colors.gray.500`};
         svg {
            color: ${theme`colors.chill.gray4`};
         }
      }
      &__placeholder {
         color: ${theme`colors.chill.gray4`};
         opacity: 50%;
      }
      &__menu {
         .select__option {
            color: ${theme`colors.chill.gray4`};
            font-weight: 500;
            &:hover {
               background: ${theme`colors.chill.gray3`};
            }
         }
      }
      &__indicators {
         .select__indicator {
            color: ${theme`colors.gray.500`};
         }
         .select__clear-indicator {
            cursor: pointer;
         }
      }
   }
`;

export const UploadFooter = styled.footer`
   ${tw`w-full flex items-center justify-between px-6 fixed bottom-0 left-0`}
   ${tw`bg-chill-gray1 border-t border-chill-gray3 z-10`}

   height: 70px;
`;

export const FooterAction = styled.button`
   ${tw`text-c-15 font-semibold text-chill-gray4`}
   padding: 10px 16px;
   border-radius: 8px;
`;