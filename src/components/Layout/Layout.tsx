import React, { useContext } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import Footer from 'components/Footer';
import Header from 'components/Header';
import Icons from 'components/Icons';
import Menu from 'components/Menu';
import Terminal from 'components/Terminal';
import { AppContext } from 'contexts/AppProvider';

type Props = {
  children: React.ReactNode;
  outsideChildren?: React.ReactNode;
  noContainer?: boolean;
};

const Layout = ({
  children,
  outsideChildren,
  noContainer = false,
}: Props): JSX.Element => {
  const { menuOpen, terminalOpen } = useContext(AppContext);

  return (
    <>
      <Icons />
      <div className="antialiased">
        <div className="w-full">
          <div
            className={clsx(
              'w-full transition-transform transform duration-700',
              (menuOpen || terminalOpen) && 'md:-translate-x-1/2'
            )}
          >
            <div className="px-4 py-4 mx-auto max-w-screen-2xl md:px-14 md:pt-14">
              <Header />
            </div>
          </div>
        </div>

        <AnimatePresence>
          <div
            className={clsx(
              'fixed bottom-0 right-0 z-50 w-full text-white md:inset-y-0 md:w-1/2 bg-gray-950 transform translate-x-full transition-transform duration-700 top-[66px]',
              (menuOpen || terminalOpen) && 'translate-x-0'
            )}
          >
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 w-full"
              >
                <Menu />
              </motion.div>
            )}
            {terminalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 w-full"
              >
                <Terminal />
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        <div className="w-full">
          <div
            className={clsx(
              'w-full transition-transform transform duration-700',
              (menuOpen || terminalOpen) && 'md:-translate-x-1/2'
            )}
          >
            <div
              className={clsx(
                !noContainer && 'px-4 mx-auto max-w-screen-2xl md:px-14'
              )}
            >
              {children}
            </div>
            <div className="px-4 mx-auto max-w-screen-2xl md:px-14">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {outsideChildren}
    </>
  );
};

export default Layout;
