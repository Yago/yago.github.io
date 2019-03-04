import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import image from '../static-assets/yago.png';
import widetile from '../static-assets/widetile.png';
import smalltile from '../static-assets/smalltile.png';
import mediumtile from '../static-assets/mediumtile.png';
import largetile from '../static-assets/largetile.png';
import favicon from '../static-assets/favicon.ico';
import icon96x96 from '../static-assets/favicon-96x96.png';
import icon32x32 from '../static-assets/favicon-32x32.png';
import icon180x180 from '../static-assets/apple-touch-icon-180x180.png';
import icon16x16 from '../static-assets/favicon-16x16.png';
import icon152x152 from '../static-assets/apple-touch-icon-152x152.png';
import icon144x144 from '../static-assets/apple-touch-icon-144x144.png';
import icon120x120 from '../static-assets/apple-touch-icon-120x120.png';
import icon114x114 from '../static-assets/apple-touch-icon-114x114.png';
import icon72x72 from '../static-assets/apple-touch-icon-72x72.png';
import icon76x76 from '../static-assets/apple-touch-icon-76x76.png';
import icon60x60 from '../static-assets/apple-touch-icon-60x60.png';
import icon57x57 from '../static-assets/apple-touch-icon-57x57.png';
import icon192x192 from '../static-assets/android-chrome-192x192.png';

function SEO({
  description, lang, meta, keywords, title,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription = description || data.site.siteMetadata.description;
        const seoKeywords = keywords > 0 ? keywords : data.site.siteMetadata.keywords;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: `${title} | ${data.site.siteMetadata.title}`,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.author,
              },
              {
                name: 'twitter:title',
                content: `${title} | ${data.site.siteMetadata.title}`,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                property: 'og:image',
                content: image,
              },
              {
                property: 'msapplication-square70x70logo',
                content: smalltile,
              },
              {
                property: 'msapplication-square150x150logo',
                content: mediumtile,
              },
              {
                property: 'msapplication-wide310x150logo',
                content: widetile,
              },
              {
                property: 'msapplication-square310x310logo',
                content: largetile,
              },
            ]
              .concat({
                name: 'keywords',
                content: seoKeywords.join(', '),
              })
              .concat(meta)}
          >
            <link rel="stylesheet" href="https://use.typekit.net/jjy6lvf.css" />
            <link rel="shortcut icon" type="image/x-icon" href={favicon} />
            <link rel="apple-touch-icon" sizes="57x57" href={icon57x57} />
            <link rel="apple-touch-icon" sizes="60x60" href={icon60x60} />
            <link rel="apple-touch-icon" sizes="72x72" href={icon72x72} />
            <link rel="apple-touch-icon" sizes="76x76" href={icon76x76} />
            <link rel="apple-touch-icon" sizes="114x114" href={icon114x114} />
            <link rel="apple-touch-icon" sizes="120x120" href={icon120x120} />
            <link rel="apple-touch-icon" sizes="144x144" href={icon144x144} />
            <link rel="apple-touch-icon" sizes="152x152" href={icon152x152} />
            <link rel="apple-touch-icon" sizes="180x180" href={icon180x180} />
            <link rel="icon" type="image/png" href={icon16x16} sizes="16x16" />
            <link rel="icon" type="image/png" href={icon32x32} sizes="32x32" />
            <link rel="icon" type="image/png" href={icon96x96} sizes="96x96" />
            <link rel="icon" type="image/png" href={icon192x192} sizes="192x192" />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        keywords
      }
    }
  }
`;
