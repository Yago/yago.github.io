import { css } from '@emotion/react';
import tw from 'twin.macro';

import { theme } from '../../../tailwind.config';

export default css`
  ${tw`
    inline-block
    relative
    border
    border-gray-300
    duration-300
    transition
    box-border
    hover:text-blue
    cursor-pointer
    px-4
    py-2
    focus:outline-none
    focus:ring-4
    focus:ring-blue
    focus:ring-opacity-10
  `}
  border-image-slice: 1;

  &:after {
    ${tw`
      absolute
      border
      border-blue
      transition-opacity
      duration-300
      opacity-0
    `}
    content: '';
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border-image: linear-gradient(
      to right,
      ${theme.colors.blue} 0%,
      ${theme.colors.teal} 98%
    );
    border-image-slice: 1;
  }

  &:hover:after,
  &:focus:after {
    ${tw`opacity-100`}
  }
`;
