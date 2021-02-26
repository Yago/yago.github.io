import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

import Logo from 'assets/images/yago.svg';
import MenuToggle from 'components/MenuToggle';
import TerminalToggle from 'components/TerminalToggle';

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <header tw="flex items-center space-x-4">
      <Link href="/" passHref>
        <a tw="block w-12 mr-auto">
          <Logo tw="w-full" />
        </a>
      </Link>
      <TerminalToggle open={open} onClick={() => setOpen(!open)} />
      <MenuToggle open={open} onClick={() => setOpen(!open)} />
    </header>
  );
};

Header.defaultProps = {};

export default Header;
