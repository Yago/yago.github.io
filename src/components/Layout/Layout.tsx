import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
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
            tw="w-full transition-transform transform duration-700"
            css={(menuOpen || terminalOpen) && tw`md:-translate-x-1/2`}
          >
            <div tw="container px-4 py-4 mx-auto md:px-14 md:pt-14">
              <Header />
            </div>
          </div>
        </div>

        <AnimatePresence>
          <div
            tw="fixed bottom-0 right-0 z-50 w-full text-white md:inset-y-0 md:w-1/2 bg-gray-950 transform translate-x-full transition-transform duration-700"
            css={[
              { top: '66px' },
              (menuOpen || terminalOpen) && tw`translate-x-0`,
            ]}
          >
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                tw="absolute top-0 left-0 w-full"
              >
                <Menu />
              </motion.div>
            )}
            {terminalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                tw="absolute top-0 left-0 w-full"
              >
                <Terminal />
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        <div tw="w-full overflow-x-hidden">
          <div
            tw="w-full transition-transform transform duration-700"
            css={(menuOpen || terminalOpen) && tw`md:-translate-x-1/2`}
          >
            <div tw="container px-4 mx-auto md:px-14">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = {};

export default Layout;
