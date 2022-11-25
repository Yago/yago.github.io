import React from 'react';
import Link from 'next/link';

type Props = {
  children: string | null;
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
    <Link href={href} className="link">
      {children}
    </Link>
  );
};

export default ContentLink;
