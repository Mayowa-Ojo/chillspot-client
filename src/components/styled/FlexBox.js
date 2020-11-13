import tw, { styled } from "twin.macro";

const FlexBox = styled.div`
   ${tw`flex justify-center items-center`}
   ${({ isCol }) => isCol && tw`flex-col` }
`;

export default FlexBox;