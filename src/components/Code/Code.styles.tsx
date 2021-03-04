import { css } from '@emotion/react';
import tw from 'twin.macro';

export default css`
  pre,
  code {
    ${tw`font-mono text-sm md:text-base`}
    -webkit-font-feature-settings: "liga" on, "calt" on;
    -webkit-font-smoothing: antialiased;
  }

  .line-numbers-rows {
    ${tw`border-0 opacity-60`}

    span:before {
      ${tw`text-gray-500`}
    }
  }
`;
