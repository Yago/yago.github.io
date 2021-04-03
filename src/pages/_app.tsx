import React, { FunctionComponent } from 'react';
import { Global } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';

import { Code, Pre } from 'components/Code';
import GalleryProxy from 'components/Gallery/GalleryProxy';
import Picture from 'components/Picture';
import { Link } from 'components/Typography';
import AppProvider from 'contexts/AppProvider';

import 'prism-themes/themes/prism-duotone-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/types.css';
import '../styles/base.css';
import * as photoswipecss from 'photoswipe/dist/photoswipe.css';

interface AppProps {
  Component: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <AppProvider>
    <MDXProvider
      components={{
        a: Link,
        gallery: GalleryProxy,
        picture: Picture,
        pre: Pre,
        code: Code,
      }}
    >
      <Global styles={photoswipecss} />
      <Component {...pageProps} />
    </MDXProvider>
  </AppProvider>
);

export default MyApp;
