import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import styles from './Blank.styles';

type Props = {
  title: string;
};

const Blank = ({ title }: Props): JSX.Element => {
  const title2 = `Hello world${title}`;

  return <div css={styles}>{title2}</div>;
};

Blank.defaultProps = {};

export default Blank;
