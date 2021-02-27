import React from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

const Menu = (): JSX.Element => (
  <nav tw="flex flex-col p-14 space-y-8">
    <Link href="/" passHref>
      <a tw="text-2xl font-light hover:text-green transition-colors duration-200">
        Homepage
      </a>
    </Link>
    <Link href="/" passHref>
      <a tw="text-2xl font-light hover:text-green transition-colors duration-200">
        Projects
      </a>
    </Link>
    <Link href="/" passHref>
      <a tw="text-2xl font-light hover:text-green transition-colors duration-200">
        Blog
      </a>
    </Link>
    <Link href="/" passHref>
      <a tw="text-2xl font-light hover:text-green transition-colors duration-200">
        Photographs
      </a>
    </Link>
  </nav>
);

Menu.defaultProps = {};

export default Menu;
