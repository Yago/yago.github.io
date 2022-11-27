import React from 'react';
import clsx from 'clsx';

import { IconNames } from 'components/Icons/Icons';

import styles from './Icon.module.css';

export type Props = {
  name?: IconNames;
  className?: string;
};

const Icon = ({ name = 'tipi', className }: Props): JSX.Element => (
  <svg
    className={clsx(styles.default, className ?? 'text-[0.7em]')}
    aria-hidden="true"
  >
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;
