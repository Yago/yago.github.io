import React from 'react';
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import pictures from 'config/pictures';

type Props = {
  title: string;
  cover?: string;
  description?: string;
};

const defaultDesc =
  "Ahoy there ! I'm Yann, Frontend and JavaScript developer by day and photographer when the night comes (or during my days off).";
const titleSuffix = ' | Yann Gouffon, developer and photographer';

const SEO = ({ title, cover, description }: Props): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <Head>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-41124823-1"
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-41124823-1');
            `,
        }}
      />
      <title>
        {title}
        {titleSuffix}
      </title>
      <meta property="og:title" content={`${title}${titleSuffix}`} />
      <meta property="twitter:title" content={`${title}${titleSuffix}`} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content="Yann Gouffon" />
      <meta property="description" content={description ?? defaultDesc} />
      <meta property="og:description" content={description ?? defaultDesc} />
      <meta
        property="twitter:description"
        content={description ?? defaultDesc}
      />
      <meta
        property="og:image"
        content={
          cover && !isNil(pictures[cover])
            ? `https://yago.io${pictures[cover].src}`
            : 'https://yago.io/images/yago-og-image.jpg'
        }
      />
      <meta property="og:url" content={`https://yago.io${asPath}`} />
      <link rel="canonical" href={`https://yago.io${asPath}`} />
    </Head>
  );
};

export default SEO;
