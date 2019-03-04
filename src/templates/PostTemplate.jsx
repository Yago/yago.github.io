import React from 'react';
import RehypeReact from 'rehype-react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import moment from 'moment';

import 'prismjs/themes/prism.css';
// import 'prism-themes/themes/prism-atom-dark.css';
import 'prism-themes/themes/prism-a11y-dark.css';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import SEO from '../components/Seo';
import Gallery from '../components/content/Gallery';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';
import Image from '../components/content/Image';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    gallery: Gallery,
    gimg: Image,
    Link,
  },
}).Compiler;

const PostTemplate = ({ data: { markdownRemark }, location }) => (
  <Layout location={location}>
    <>
      <SEO title={markdownRemark.frontmatter.title} description={markdownRemark.excerpt} />
      <div className="container">
        <article>
          <h1 className="mt-2">{markdownRemark.frontmatter.title}</h1>
          <h2 className="text-muted mb-4">
            <span>Yann Gouffon — </span>
            {moment(markdownRemark.frontmatter.date).format('LL')}
          </h2>

          {renderAst(markdownRemark.htmlAst)}
        </article>

        <div className="mt-4 mb-2">
          <div className="separator">
            <Icon icon="drakar" />
          </div>
        </div>
      </div>
      <PhotoswipeWrapper />
    </>
  </Layout>
);

PostTemplate.prototype = {
  data: PropTypes.object.required,
};

export default PostTemplate;

export const query = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      excerpt(pruneLength: 300)
      frontmatter {
        date
        path
        title
      }
    }
  }
`;
