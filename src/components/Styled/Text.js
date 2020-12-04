import tw, { styled, css } from "twin.macro";

const Text = styled.p(({ truncate }) => [
   tw`text-c-15 font-medium text-chill-gray4`,

   truncate && css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   `
]);

export default Text;