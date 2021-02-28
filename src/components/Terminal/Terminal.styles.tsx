import { css } from '@emotion/react';
import tw from 'twin.macro';

export default css`
  .terminalContainer {
    ${tw`font-mono leading-8 p-8 md:p-14`}
    overflow-y: auto !important;

    @media only screen and (min-width: 762px) {
      transform: translateX(15px);
    }

    .terminalInput {
      span {
        ${tw`text-green`}
      }

      input,
      input:focus {
        ${tw`font-mono shadow-none outline-none`}
        padding: 0 0.25em !important;
        padding-left: 0 !important;
        background: transparent !important;
        border: none !important;
        color: #fcfcfc !important;
      }
    }

    .terminalOutput > div {
      ${tw`whitespace-pre-wrap`}
    }
  }
`;
