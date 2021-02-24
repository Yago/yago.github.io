import { css } from '@emotion/react';
import tw from 'twin.macro';

export default css`
  ${tw`
    inline-flex
    self-center
    justify-center
    items-center
    relative
  `}
  top: -0.1em;
  width: 1em;
  height: 1em;
  font-size: 0.7em;

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`;
