import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './Button.module.css';

type Props = {
  href: string;
  children: string;
};

const Button = ({ href, children }: Props): JSX.Element => (
  <Link href={href} className={clsx(styles.default)}>
    {children}
  </Link>
);

export default Button;
