import React, { FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';

import Counter from 'components/Counter';
import { Link } from 'components/Typography';
import AppProvider from 'contexts/AppProvider';

import '../styles/types.css';
import '../styles/base.css';

interface AppProps {
  Component: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppProvider>
    <MDXProvider components={{ Counter, a: Link }}>
      <Component {...pageProps} />
    </MDXProvider>
  </AppProvider>
);

export default MyApp;
