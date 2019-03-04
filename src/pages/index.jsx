import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import ProjectTeaser from '../components/ProjectTeaser';
import PostTeaser from '../components/PostTeaser';
import DeveloperStats from '../components/DeveloperStats';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

import { formatTitle } from '../helpers/pictures';
import pictures from '../config/pictures.json';

const intro = `
Ahoy there ! I'm Yann, Frontend and JavaScript <span class="text-mono">developer</span> by day and <em>photographer</em> when the night comes (or my days off).
`;

const IndexPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'project')
    .map(item => item.node)
    .slice(0, 6);

  const posts = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'post')
    .map(item => item.node)
    .slice(0, 4);

  const picture = pictures.sort((a, b) => b.id - a.id)[0];
  const staticPic = data.allImageSharp.edges.find(i => i.node.original.src.includes(picture.id));
  picture.src = staticPic.node.original.src;

  return (
    <Layout location={location}>
      <SEO title="Welcome" />

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
          <Link to="/projects" className="btn btn-outline">
            See all
          </Link>
        </div>

        <div className="row mt-3">
          {projects.map((project, i) => (
            <div className="col-6 col-md-4 mb-2" key={i}>
              <ProjectTeaser project={project} />
            </div>
          ))}
        </div>
      </div>

      <DeveloperStats />

      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between mt-4">
          <h2>Last blog posts</h2>
          <Link to="/blog" className="btn btn-outline">
            See all
          </Link>
        </div>

        <div className="row mt-2">
          {posts.map((post, i) => (
            <div className="col-md-6" key={i}>
              <PostTeaser post={post} />
            </div>
          ))}
        </div>

        <div className="d-flex align-items-center justify-content-between mt-4">
          <h2>Last photograph</h2>
          <Link to="/pictures" className="btn btn-outline">
            See all
          </Link>
        </div>

        <div className="row mt-4">
          <div className="col-md-8 mb-2 mb-md-0">
            <img src={picture.src} alt={formatTitle(picture)} className="img-fluid" />
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <div className="text-sans" dangerouslySetInnerHTML={{ __html: formatTitle(picture) }} />
          </div>
        </div>

        <div className="mt-4 mb-2">
          <div className="separator">
            <Icon icon="drakar" />
          </div>
        </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
    allImageSharp {
      edges {
        node {
          original {
            src
          }
        }
      }
    }
  }
`;
