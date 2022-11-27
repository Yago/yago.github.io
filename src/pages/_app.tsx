/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';

import Code from 'components/Code';
import { Link } from 'components/Typography';
import AppProvider from 'contexts/AppProvider';

import 'photoswipe/dist/photoswipe.css';
import 'styles/types.css';
import 'styles/base.css';

interface AppProps {
  Component: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppProvider>
    <MDXProvider
      components={{
        // @ts-ignore
        a: Link,
        // @ts-ignore
        code: Code,
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  </AppProvider>
);

export default MyApp;
