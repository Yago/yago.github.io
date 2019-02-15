import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import ProjectTeaser from '../components/ProjectTeaser';
import PostTeaser from '../components/PostTeaser';
import DeveloperStats from '../components/DeveloperStats';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

const intro = `
Ahoy there ! I'm Yann, Frontend and JavaScript <span className="text-mono">developer</span> by day and <i>photographer</i> when the night comes (or my days off).
`;

const IndexPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'project')
    .map(item => item.node)
    .slice(0, 5);

  const posts = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'post')
    .map(item => item.node)
    .slice(0, 5);

  return (
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

        <div className="d-flex align-items-center justify-content-between">
          <h2>Last projects</h2>
          <Link to="/projects" className="btn btn-outline-dark">
            See all
          </Link>
        </div>

        <div className="row mt-3">
          {projects.map(project => (
            <div className="col-md-4 mb-2">
              <ProjectTeaser project={project} />
            </div>
          ))}
        </div>
      </div>

      <DeveloperStats />

      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mt-4">
          <h2>Last blog posts</h2>
          <Link to="/blog" className="btn btn-outline-dark">
            See all
          </Link>
        </div>

        <div className="row mt-2">
          {posts.map(post => (
            <div className="col-md-6">
              <PostTeaser post={post} />
            </div>
          ))}
        </div>

        <div className="mt-4 mb-2">
          <div className="separator">
            <Icon icon="drakar" />
          </div>
        </div>

        {/* {% include "@organisms/footer/footer.twig" %} */}
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default IndexPage;

export const query = graphql`
  query AllContent {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 300)
          frontmatter {
            path
            title
            subtitle
            type
            cover
            date
          }
        }
      }
    }
  }
`;
