import React, { FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';

import Counter from 'components/Counter';

import '../styles/base.css';

interface AppProps {
  Component: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <MDXProvider components={{ Counter }}>
    <Component {...pageProps} />
  </MDXProvider>
);

export default MyApp;
