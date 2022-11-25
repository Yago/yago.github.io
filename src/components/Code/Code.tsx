import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Prism from 'prismjs';
import { isNil } from 'ramda';

// import 'prismjs/components/prism-tsx';
import styles from './Code.module.css';

type PreProps = {
  children: React.ReactNode;
};

type CodeProps = {
  children: React.ReactNode;
  className: string;
};

export const Pre = ({ children }: PreProps): JSX.Element => (
  <div className={clsx(styles.default, 'line-numbers md:-mx-10')}>
    <pre>{children}</pre>
  </div>
);

export const Code = ({ children, className }: CodeProps): JSX.Element => {
  const codeElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isNil(codeElement?.current)) {
      Prism.highlightElement(codeElement.current);
    }
  }, [codeElement]);

  return (
    <code ref={codeElement} className={className}>
      {children}
    </code>
  );
};
