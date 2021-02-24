import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import styles from './Blank.styles';

const Blank = (): JSX.Element => {
  const title = 'Hello world';

  return <div css={styles}>{title}</div>;
};

Blank.defaultProps = {};

export default Blank;
