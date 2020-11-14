import tw, { styled, theme } from "twin.macro";

export const FormWrapper = styled.div`
   ${tw``}

   width: 420px;
`;

export const FormInputBox = styled.div`
   ${tw`w-full h-10 rounded-md bg-chill-gray2 flex items-center px-4 py-1 mt-2`}

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
   ${tw`w-full h-full appearance-none bg-transparent focus:outline-none text-c-15 text-chill-gray4`}
`;

export const FormLabel = styled.label`
   ${tw`text-c-15 font-semibold text-chill-gray4`}
`;