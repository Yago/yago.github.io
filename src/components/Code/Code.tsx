/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import {
  duotoneDark,
  nightOwl,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeProps = {
  children: string;
  className: string;
  theme?: 'nightOwl' | 'duotoneDark';
};

const themes = {
  nightOwl,
  duotoneDark,
};

const Code = ({
  children,
  className,
  theme = 'nightOwl',
}: CodeProps): JSX.Element => {
  if (!className?.includes('language-')) {
    return <code>{children}</code>;
  }

  return (
    // @ts-ignore
    <SyntaxHighlighter
      language={className.replace('language-', '')}
      PreTag="div"
      style={themes[theme]}
      codeTagProps={{
        style: { fontSize: 16, backgroundColor: 'transparent', padding: 0 },
      }}
      showLineNumbers
      className="font-mono rounded-lg"
    >
      {children.trim()}
    </SyntaxHighlighter>
  );
};

export default Code;
