import React from 'react';
import clsx from 'clsx';

type Props = {
  direction?: 'left' | 'right';
};

const Arrow = ({ direction = 'right' }: Props): JSX.Element => (
  <span
    className={clsx(
      'arrow',
      direction === 'left' && 'transform rotate-180',
      'inline-flex items-center justify-end pointer-events-none w-11'
    )}
  >
    <span className="inline-block w-0 h-0 border-t-2 border-black transition-all duration-200" />
    <span className="inline-block w-4 h-4 border-b-2 border-r-2 border-black transform -rotate-45 -translate-x-4" />
  </span>
);

export default Arrow;
