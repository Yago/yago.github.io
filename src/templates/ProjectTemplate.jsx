import React from 'react';
import RehypeReact from 'rehype-react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import 'prismjs/themes/prism.css';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Gallery from '../components/content/Gallery';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';
import Picture from '../components/content/Picture';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    gallery: Gallery,
    cimg: Picture,
  },
}).Compiler;

const ProjectTemplate = ({ data: { markdownRemark }, location }) => (
  <Layout location={location}>
    <Seo />
    <div className="blog-post-container ml-4">
      <Link to="/">Home</Link>
      <div className="blog-post">
        <h1>{markdownRemark.frontmatter.title}</h1>
        {renderAst(markdownRemark.htmlAst)}
        {markdownRemark.frontmatter.gallery && (
          <>
            <Gallery
              sources={markdownRemark.frontmatter.gallery}
              containerClass="row"
              itemClass="col-md-4 img-fluid"
            />
            <PhotoswipeWrapper />
          </>
        )}
      </div>
    </div>
  </Layout>
);

ProjectTemplate.prototype = {
  data: PropTypes.object.required,
};

export default ProjectTemplate;

export const query = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
        gallery {
          src
          caption
          w
          h
        }
      }
    }
  }
`;
