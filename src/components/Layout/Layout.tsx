import React from 'react';
import { jsx } from '@emotion/react';
import Head from 'next/head';
import tw from 'twin.macro';

import Header from 'components/Header';
import Icons from 'components/Icons';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => (
  <>
    <Head>
      <link rel="stylesheet" href="https://use.typekit.net/jjy6lvf.css" />
    </Head>
    <Icons />
    <div tw="container mx-auto antialiased p-14">
      <Header />
      {children}
    </div>
  </>
);

Layout.defaultProps = {};

export default Layout;
