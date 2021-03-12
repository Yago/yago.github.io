import React from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

type Props = {
  children: string;
  href: string;
};

const ContentLink = ({ children, href }: Props): JSX.Element => {
  if (href.includes('http')) {
    return (
      <a href={href} className="link">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} passHref>
      <a className="link">{children}</a>
    </Link>
  );
};

export default ContentLink;
