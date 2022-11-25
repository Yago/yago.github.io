import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Logo from 'assets/images/yago.svg';
import MenuToggle from 'components/MenuToggle';
import TerminalToggle from 'components/TerminalToggle';

const Header = (): JSX.Element => (
  <header className="flex items-center space-x-4">
    <Link
      href="/"
      className={clsx('block w-8 md:w-12', { marginLeft: '0 !important' })}
    >
      <Logo className="w-full" />
    </Link>
    <TerminalToggle />
    <MenuToggle />
  </header>
);

export default Header;
