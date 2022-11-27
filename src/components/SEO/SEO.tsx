import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';

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
      <title>{title + titleSuffix}</title>
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

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#616161" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />

      <meta name="application-name" content="Yago.io" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Yago.io" />
      <meta name="description" content={defaultDesc} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#212529" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#ffffff" />

      {/* <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
      <link
        href="https://use.typekit.net/jjy6lvf.css"
        rel="preload"
        as="style"
        crossOrigin=""
      /> */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js"
        integrity="sha512-v/wOVTkoU7mXEJC3hXnw9AA6v32qzpknvuUF6J2Lbkasxaxn2nYcl+HGB7fr/kChGfCqubVr1n2sq1UFu3Gh1w=="
        crossOrigin="anonymous"
      />
      <script>
        {`WebFont.load({
          typekit: { id: 'jjy6lvf' }
        });`}
      </script>

      <noscript>
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            .fade-in {
              opacity: 1 !important;
              transform: none !important;
            }
          `,
          }}
        />
      </noscript>
    </Head>
  );
};

export default SEO;
