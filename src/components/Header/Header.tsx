import React from 'react';
import Link from 'next/link';

import Logo from 'assets/images/yago.svg';
import MenuToggle from 'components/MenuToggle';
import TerminalToggle from 'components/TerminalToggle';

const Header = (): JSX.Element => (
  <header className="flex items-center space-x-4">
    <Link href="/" className="block w-8 ml-0 mr-auto md:w-12">
      <Logo className="w-full" />
    </Link>
    <TerminalToggle />
    <MenuToggle />
  </header>
);

export default Header;
