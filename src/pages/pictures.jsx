import React from 'react';
import PropTypes from 'prop-types';
import PhotoGallery from 'react-photo-gallery';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';

import Layout from '../components/layout';
import Icon from '../components/Icon';
import SEO from '../components/seo';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';

import { formatTitle } from '../helpers/pictures';
import pictures from '../config/pictures.json';

const PicturesPage = ({ data, location }) => {
  const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

  // Create container for photoswipe
  const photoswipeContainer = pictures
    .sort((a, b) => b.id - a.id)
    .map((pic) => {
      const images = data.allImageSharp.edges;
      const image = images.find(edge => edge.node.fluid.src.includes(pic.id));
      return {
        ...image,
        src: image.node.fluid.originalImg,
        title: formatTitle(pic),
        w: pic.w,
        h: pic.h,
      };
    });

  // Create container for react-photo-gallery
  const photoGalleryContainer = photoswipeContainer.map(pic => ({
    src: pic.node.fluid.src,
    srcSet: pic.node.fluid.srcSet,
    sizes: pic.node.fluid.sizes,
    width: pic.w,
    height: pic.h,
    alt: pic.title,
  }));

  // Photoswipe trigger method
  const openGallery = (event, current) => {
    event.preventDefault();
    const pswp = document.querySelectorAll('.pswp')[0];
    const options = {
      index: current.index,
      bgOpacity: 1,
      showHideOpacity: true,
      history: false,
    };

    const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, photoswipeContainer, options);
    gallery.init();
  };

  return (
    <Layout location={location}>
      <SEO title="Pictures" />

      <div className="container-fluid">
        <div className="ml-md-4">
          <Fade><h1>Pictures</h1></Fade>

          <Fade bottom distance="30px" cascade>
            <div className="mt-2">
              <div style={{ margin: currentWidth > 990 ? '0 -45px' : '0 -5px' }}>
                <PhotoGallery
                  photos={photoGalleryContainer}
                  onClick={openGallery}
                  margin={currentWidth > 990 ? 50 : 10}
                  columns={3}
                  targetRowHeight={currentWidth > 990 ? 220 : 150}
                  direction="row"
                />
              </div>
            </div>
          </Fade>
          <PhotoswipeWrapper />
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

PicturesPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default PicturesPage;

export const query = graphql`
  query AllPictures {
    allImageSharp(filter: { original: { src: { regex: "/portfolio/" } } }) {
      edges {
        node {
          fluid(maxWidth: 800) {
            base64
            aspectRatio
            src
            srcSet
            sizes
            originalImg
          }
        }
      }
    }
  }
`;
