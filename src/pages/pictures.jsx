import React from 'react';
import PropTypes from 'prop-types';
import PhotoGallery from 'react-photo-gallery';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import SEO from '../components/Seo';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';

import pictures from '../config/pictures.json';

const PicturesPage = ({ data, location }) => {
  // Create nice PhotoSwipe caption with title and metadata
  const formatTitle = (pic) => {
    const meta = pic.taken_with;
    let title = `${pic.title} <br /><small>(`;
    if (meta.camera && meta.camera !== 'unknown') title = `${title}${meta.camera}`;
    if (meta.focal_length && meta.focal_length !== 'unknown') title = `${title} - ${meta.focal_length}mm `;
    if (meta.aperture && meta.aperture !== 'unknown') title = `${title} - ƒ/${meta.aperture} `;
    if (meta.shutter_speed && meta.shutter_speed !== 'unknown') title = `${title} - ${meta.shutter_speed}s. `;
    if (meta.iso && meta.iso !== 'unknown') title = `${title} - ISO ${meta.iso}`;
    title = `${title}) © Yann Gouffon</small>`;
    return title;
  };

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
      <SEO />

      <div className="container-fluid">
        <div className="ml-md-4">
          <h1>Pictures</h1>

          <div className="mt-2">
            <PhotoGallery
              photos={photoGalleryContainer}
              onClick={openGallery}
              margin={4}
              columns={4}
              direction="row"
            />
          </div>
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
    allImageSharp {
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
