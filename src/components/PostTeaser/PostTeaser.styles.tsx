import { css } from '@emotion/react';
import tw from 'twin.macro';

export default css`
  &:hover span,
  &:hover p {
    ${tw`opacity-100`}
  }
`;
