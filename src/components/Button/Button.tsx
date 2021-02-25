import React from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

import styles from './Button.styles';

type Props = {
  href: string;
  children: string;
};

const Button = ({ href, children }: Props): JSX.Element => (
  <Link href={href} passHref>
    <a css={styles}>{children}</a>
  </Link>
);

Button.defaultProps = {};

export default Button;
