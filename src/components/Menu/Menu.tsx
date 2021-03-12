/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

import { AppContext } from 'contexts/AppProvider';

const Menu = (): JSX.Element => {
  const { setMenuOpen, setTerminalOpen } = useContext(AppContext);
  console.log(setMenuOpen, setTerminalOpen);

  return (
    <nav tw="flex flex-col p-8 md:p-14 space-y-8">
      {[
        ['/', 'Homepage'],
        ['/projects', 'Projects'],
        ['/blog', 'Blog'],
        ['/photographs', 'Photographs'],
      ].map(([href, label]) => (
        <Link href={href} passHref key={`menuitem-${href}`}>
          <a
            tw="text-2xl font-light hover:text-green transition-colors duration-200"
            onClick={() => {
              // setMenuOpen(false);
              // setTerminalOpen(false);
            }}
          >
            {label}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Menu;
