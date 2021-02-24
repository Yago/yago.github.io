import React, { FunctionComponent } from 'react';

import '../styles/base.css';

interface AppProps {
  Component: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
);

export default MyApp;
