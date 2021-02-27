import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import Head from 'next/head';
import tw from 'twin.macro';

import Header from 'components/Header';
import Icons from 'components/Icons';
import Menu from 'components/Menu';
import Terminal from 'components/Terminal';
import { AppContext } from 'contexts/AppProvider';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  const { menuOpen, terminalOpen } = useContext(AppContext);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/jjy6lvf.css" />
      </Head>
      <Icons />
      <div tw="antialiased">
        <div tw="w-full overflow-x-hidden">
          <div
            tw="w-full transition-transform transform duration-500"
            css={(menuOpen || terminalOpen) && tw`-translate-x-1/2`}
          >
            <div tw="container mx-auto p-14">
              <Header />
            </div>
          </div>
        </div>

        <div
          tw="fixed inset-y-0 right-0 w-1/2 text-white bg-gray-950 transform translate-x-full transition-transform duration-500"
          css={(menuOpen || terminalOpen) && tw`translate-x-0`}
        >
          <div
            tw="hidden opacity-0 duration-200 transition-opacity"
            css={menuOpen && tw`block opacity-100`}
          >
            <Menu />
          </div>
          <div
            tw="hidden opacity-0 duration-200 transition-opacity"
            css={terminalOpen && tw`block opacity-100`}
          >
            <Terminal />
          </div>
        </div>

        <div tw="w-full overflow-x-hidden">
          <div
            tw="w-full transition-transform transform duration-500"
            css={(menuOpen || terminalOpen) && tw`-translate-x-1/2`}
          >
            <div tw="container mx-auto p-14">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = {};

export default Layout;
