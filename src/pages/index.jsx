import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import DeveloperStats from '../components/DeveloperStats';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

const intro = `
Ahoy there ! I'm Yann, Frontend and JavaScript <span class="text-mono">developer</span> by day and <i>photographer</i> when the night comes (or my days off).
`;

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <SEO />

    <div className="container-fluid">
      <div className="row mt-6 mb-6">
        <div className="col-sm-10 col-md-8 col-lg-5">
          <p className="lead" dangerouslySetInnerHTML={{ __html: intro }} />

          <small className="text-sans text-muted">
            <span>- </span>
            <Icon icon="igloo" />
            <span> Based in Lausanne, Switzerland</span>
          </small>
        </div>
      </div>
    </div>

    <DeveloperStats />
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
