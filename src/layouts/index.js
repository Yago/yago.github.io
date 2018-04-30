import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Head from '../components/head';
import 'prismjs/themes/prism-solarizedlight.css';

const Layout = ({ children, data }) => (
  <div>
    <Head data={data} />
    <Header siteTitle={data.site.siteMetadata.title} />
    <div>
      {children()}
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
