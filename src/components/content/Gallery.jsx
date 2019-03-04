import React from 'react';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query GalleryImages {
    allImageSharp(filter: { original: { src: { regex: "/^((?!portfolio).)*$/" } } }) {
      edges {
        node {
          fluid(maxWidth: 1680) {
            base64
            aspectRatio
            src
            srcSet
            sizes
            presentationWidth
            presentationHeight
            originalImg
          }
          resize(width: 800, height: 500, quality: 70) {
            src
          }
        }
      }
    }
  }
`;

const Gallery = ({
  sources, containerClass, itemClass, displayCaption, useThumb,
}) => (
  <StaticQuery
    query={query}
    render={(data) => {
      // Create photoswipe container
      const cleanSources = typeof sources === 'string' ? JSON.parse(sources) : sources;
      const container = cleanSources.map((item) => {
        const images = data.allImageSharp.edges;
        const image = images.find(edge => edge.node.fluid.src.includes(item.src));
        return {
          ...image,
          src: image.node.fluid.originalImg,
          title: item.caption,
          w: image.node.fluid.presentationWidth,
          h: image.node.fluid.presentationHeight,
        };
      });

      // Photoswipe trigger method
      const openGallery = (event, index) => {
        event.preventDefault();
        const pswp = document.querySelectorAll('.pswp')[0];
        const options = {
          index,
          bgOpacity: 1,
          showHideOpacity: true,
          history: false,
        };

        const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, container, options);
        gallery.init();
      };

      return (
        <div className={containerClass}>
          {container
            && container.map((item, i) => (
              <figure
                key={i}
                className={`gallery-item ${itemClass}`}
                itemProp="associatedMedia"
                itemScope
                itemType="http://schema.org/ImageObject"
              >
                <a href={item.src} onClick={e => openGallery(e, i)} itemProp="contentUrl">
                  {useThumb ? (
                    <img src={item.node.resize.src} className="img-fluid" alt={item.title} />
                  ) : (
                    <Img fluid={item.node.fluid} />
                  )}
                  {displayCaption && <figcaption>{item.title}</figcaption>}
                </a>
              </figure>
            ))}
        </div>
      );
    }}
  />
);

Gallery.propTypes = {
  sources: PropTypes.oneOfType([PropTypes.array, PropTypes.string.isRequired]).isRequired,
  containerClass: PropTypes.string,
  itemClass: PropTypes.string,
  displayCaption: PropTypes.bool,
  useThumb: PropTypes.bool,
};

Gallery.defaultProps = {
  containerClass: '',
  itemClass: '',
  displayCaption: true,
  useThumb: false,
};

export default Gallery;
