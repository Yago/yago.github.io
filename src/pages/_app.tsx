/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FunctionComponent } from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Code, Pre } from 'components/Code';
import GalleryProxy from 'components/Gallery/GalleryProxy';
import Picture from 'components/Picture';
import { Link } from 'components/Typography';
import AppProvider from 'contexts/AppProvider';

import 'prism-themes/themes/prism-duotone-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
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
        gallery: GalleryProxy,
        // @ts-ignore
        picture: Picture,
        // @ts-ignore
        pre: Pre,
        // @ts-ignore
        code: Code,
      }}
    >
      <Component {...pageProps} />
    </MDXProvider>
  </AppProvider>
);

export default MyApp;
