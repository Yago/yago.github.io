import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query Images {
    allImageSharp(filter: { original: { src: { regex: "/^((?!portfolio).)*$/" } } }) {
      edges {
        node {
          fluid(maxWidth: 1680) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`;

const Image = ({ src, alt }) => (
  <StaticQuery
    query={query}
    render={(data) => {
      const images = data.allImageSharp.edges;
      const image = images.find(edge => edge.node.fluid.src.includes(src));
      if (image === undefined) return '';
      return <Img fluid={image.node.fluid} />;
    }}
  />
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  src: 'test.jpg',
  alt: '',
};

export default Image;
