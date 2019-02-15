import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <div className="row mt-6 mb-6">
      <div className="col-sm-10 col-md-8 col-lg-5">
        <p className="lead">
          Ahoy there ! I'm Yann, Frontend and JavaScript
          {' '}
          <span className="text-mono">developer</span>
          {' '}
by day and
          <em> photographer</em>
          {' '}
when the night comes (or my days off).
        </p>

        <small className="text-sans text-muted">
          —
          {' '}
          <Icon icon="igloo" />
          {' '}
Based in Lausanne, Switzerland
        </small>
      </div>
    </div>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
