import React, { useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import Prism from 'prismjs';
import { isNil } from 'ramda';
import tw from 'twin.macro';

// import 'prismjs/components/prism-tsx';
import styles from './Code.styles';

type PreProps = {
  children: React.ReactNode;
};

type CodeProps = {
  children: React.ReactNode;
  className: string;
};

export const Pre = ({ children }: PreProps): JSX.Element => (
  <div css={styles} className="line-numbers" tw="md:-mx-10">
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
