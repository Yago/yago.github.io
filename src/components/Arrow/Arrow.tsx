import React from 'react';
import { Global, jsx } from '@emotion/react';
import tw from 'twin.macro';

import styles from './Arrow.styles';

type Props = {
  direction?: 'left' | 'right';
};

const Arrow = ({ direction }: Props): JSX.Element => (
  <>
    <Global styles={styles} />
    <span
      className="arrow"
      css={direction === 'left' && tw`transform rotate-180`}
      tw="inline-flex items-center justify-end pointer-events-none w-11"
    >
      <span tw="inline-block w-0 h-0 border-t-2 border-black transition-all duration-200" />
      <span tw="inline-block w-4 h-4 border-b-2 border-r-2 border-black transform -rotate-45 -translate-x-4" />
    </span>
  </>
);

Arrow.defaultProps = {
  direction: 'right',
};

export default Arrow;
