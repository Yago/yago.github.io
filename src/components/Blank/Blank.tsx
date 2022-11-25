import React from 'react';
import clsx from 'clsx';

import styles from './Blank.module.css';

type Props = {
  title: string;
};

const Blank = ({ title }: Props): JSX.Element => {
  const title2 = `Hello world${title}`;

  return <div className={clsx(styles.default)}>{title2}</div>;
};

export default Blank;
