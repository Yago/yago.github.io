import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import PostTeaser from '../components/PostTeaser';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

const BlogPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'post')
    .map(item => item.node);

  return (
    <Layout location={location}>
      <SEO title="Blog" />

      <div className="container-fluid">
        <div className="ml-md-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className="mb-2">Blog</h1>

              {posts.map((post, i) => (
                <PostTeaser post={post} key={i} />
              ))}
            </div>
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

BlogPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPage;

export const query = graphql`
  query AllPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          frontmatter {
            path
            title
            type
            date
          }
        }
      }
    }
  }
`;
