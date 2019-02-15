import React from 'react';
import RehypeReact from 'rehype-react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import 'prismjs/themes/prism.css';

import Layout from '../components/Layout';
import GalleryItem from '../components/content/GalleryItem';
import Picture from '../components/content/Picture';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    'gallery-item': GalleryItem,
    cimg: Picture,
  },
}).Compiler;

const Post = ({ data: { markdownRemark }, location }) => (
  <Layout location={location}>
    <div className="blog-post-container">
      <Link to="/">Home</Link>
      <div className="blog-post">
        <h1>{markdownRemark.frontmatter.title}</h1>
        {renderAst(markdownRemark.htmlAst)}
      </div>
    </div>
  </Layout>
);

Post.prototype = {
  data: PropTypes.object.required,
};

export default Post;

export const query = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
