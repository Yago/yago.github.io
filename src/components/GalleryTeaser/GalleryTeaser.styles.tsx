import { css } from '@emotion/react';
import tw from 'twin.macro';

export const imageWraper = css`
  img {
    ${tw`transition-opacity duration-1000 opacity-70`}
  }

  & > div:first-of-type {
    ${tw`relative overflow-hidden`}

    &:after {
      content: '';
      ${tw`
        absolute
        transform
        -translate-x-1/2
        -translate-y-1/2
        transition-opacity
        duration-1000
      `}
      top: 50%;
      left: 50%;
      width: 140%;
      padding-bottom: 140%;
      box-shadow: inset 0px 0px 60px 150px rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }
  }

  &:hover > div:first-of-type:after {
    ${tw`opacity-10`}
  }

  &:hover > div:first-of-type {
    ${tw`scale-110`}
  }

  &:hover img {
    ${tw`opacity-100`}
  }
`;
