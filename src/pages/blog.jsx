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
    .map(item => item.node)
    .slice(0, 5);

  return (
    <Layout location={location}>
      <SEO title="Blog" />

      <div className="container-fluid">
        <div className="ml-md-4">
          <h1>Blog</h1>

          <div className="row mt-2">
            {posts.map((post, i) => (
              <div className="col-md-6" key={i}>
                <PostTeaser post={post} />
              </div>
            ))}
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
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 300)
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
