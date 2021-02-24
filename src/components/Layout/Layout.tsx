import React from 'react';
import { jsx } from '@emotion/react';
import Head from 'next/head';
import tw from 'twin.macro';

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
    <main tw="container px-10 mx-auto my-10 antialiased font-light">
      {children}
    </main>
  </>
);

Layout.defaultProps = {};

export default Layout;
