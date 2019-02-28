import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query Images {
    allImageSharp {
      edges {
        node {
          fluid(maxWidth: 2800) {
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

const Image = ({ src }) => (
  <StaticQuery
    query={query}
    render={(data) => {
      const images = data.allImageSharp.edges;
      const image = images.find(edge => edge.node.fluid.src.includes(src));
      return <Img fluid={image.node.fluid} />;
    }}
  />
);

Image.propTypes = {
  src: PropTypes.string,
};

Image.defaultProps = {
  src: 'test.jpg',
};

export default Image;
