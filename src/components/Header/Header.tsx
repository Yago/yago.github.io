import React from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

import Logo from 'assets/images/yago.svg';
import MenuToggle from 'components/MenuToggle';
import TerminalToggle from 'components/TerminalToggle';

const Header = (): JSX.Element => (
  <header tw="flex items-center space-x-4">
    <Link href="/" passHref>
      <a tw="block w-8 md:w-12" css={{ marginRight: '0 !important' }}>
        <Logo tw="w-full" />
      </a>
    </Link>
    <TerminalToggle />
    <MenuToggle />
  </header>
);

export default Header;
