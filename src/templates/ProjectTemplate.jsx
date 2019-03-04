import React from 'react';
import RehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import 'prismjs/themes/prism.css';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Seo from '../components/Seo';
import Gallery from '../components/content/Gallery';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';
import Image from '../components/content/Image';

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    gallery: Gallery,
    gimg: Image,
  },
}).Compiler;

const ProjectTemplate = ({ data: { markdownRemark }, location }) => (
  <Layout location={location}>
    <Seo />

    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-sm-6 offset-sm-1 d-flex align-items-start flex-column justify-content-between mb-2">
          <div>
            <h1>{markdownRemark.frontmatter.title}</h1>
            <h2 className="h3 text-muted mb-2">{markdownRemark.frontmatter.subtitle}</h2>
          </div>

          <table className="text-sans text-sm table table-borderless table-sm">
            <tbody>
              {markdownRemark.frontmatter.agency && (
                <tr>
                  <td>Agency</td>
                  <td>
                    <a
                      href={markdownRemark.frontmatter.agency.url}
                      className="link-grad"
                      target="_blank"
                    >
                      {markdownRemark.frontmatter.agency.name}
                    </a>
                  </td>
                </tr>
              )}
              {markdownRemark.frontmatter.roles && (
                <tr>
                  <td>
                    <span>Role</span>
                    {markdownRemark.frontmatter.roles.length > 1 && 's'}
                  </td>
                  <td>
                    {markdownRemark.frontmatter.roles.map((role, i) => (
                      <span key={i}>
                        {role}
                        <br />
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {markdownRemark.frontmatter.year && (
                <tr>
                  <td>year</td>
                  <td>{markdownRemark.frontmatter.year}</td>
                </tr>
              )}
            </tbody>
          </table>

          <p className="mt-auto mb-0">{renderAst(markdownRemark.htmlAst)}</p>
        </div>

        <div className="col-sm-4 offset-sm-1 order-first order-md-2 mb-2 mb-md-0">
          <Image src={markdownRemark.frontmatter.cover} />
        </div>
      </div>

      {markdownRemark.frontmatter.gallery && (
        <>
          <Gallery
            sources={markdownRemark.frontmatter.gallery}
            containerClass="row mt-4"
            itemClass="col-sm-3 mb-2 img-fluid"
            displayCaption={false}
            useThumb
          />
          <PhotoswipeWrapper />
        </>
      )}

      <div className="mt-4 mb-2">
        <div className="separator">
          <Icon icon="drakar" />
        </div>
      </div>
    </div>
  </Layout>
);

ProjectTemplate.prototype = {
  data: PropTypes.object.required,
  location: PropTypes.object.required,
};

export default ProjectTemplate;

export const query = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
        subtitle
        cover
        agency {
          name
          url
        }
        year
        roles
        gallery {
          src
          caption
        }
      }
    }
  }
`;
