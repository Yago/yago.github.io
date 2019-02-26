import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Icon from '../components/Icon';
import Gallery from '../components/content/Gallery';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';
import SEO from '../components/Seo';

import pictures from '../config/pictures.json';

const PicturesPage = ({ location }) => {
  const formatTitle = (pic) => {
    let title = `${pic.title} (`;
    // if (pic.taken_with.camera) title = `${title}${pic.taken_with.camera} `;
    if (pic.taken_with.lens && pic.taken_with.lens !== 'unknown') {
      title = `${title}${pic.taken_with.lens} `;
    }
    if (pic.taken_with.iso && pic.taken_with.iso !== 'unknown') {
      title = `${title}ISO ${pic.taken_with.iso}`;
    }
    title = `${title})`;
    return title;
  };

  const galleryPictures = pictures
    .sort((a, b) => b.id - a.id)
    .map(pic => ({
      id: `${pic.public_id}.jpg`,
      title: formatTitle(pic),
      w: pic.width,
      h: pic.height,
    }));

  return (
    <Layout location={location}>
      <SEO />

      <div className="container-fluid">
        <div className="ml-md-4">
          <h1>Pictures</h1>

          <Gallery
            sources={galleryPictures.slice(0, 20)}
            containerClass="row mt-4"
            itemClass="col-sm-3 mb-2 img-fluid"
            displayCaption={false}
          />
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
  location: PropTypes.object.isRequired,
};

export default PicturesPage;

// export const query = graphql`
//   query AllProjects {
//
//   }
// `;
