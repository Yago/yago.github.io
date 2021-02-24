import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import { IconNames } from 'components/Icons/Icons';

import styles from './Icon.styles';

export type Props = {
  name?: IconNames;
  className?: string;
};

const Icon = ({ name, className }: Props): JSX.Element => (
  <svg css={styles} className={className} aria-hidden="true">
    <use xlinkHref={`#${name}`} />
  </svg>
);

Icon.defaultProps = {
  name: 'tipi',
};

export default Icon;
