import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ src }) => <img src={src} alt="sup ?" className="img-fluid" />;

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
};

export default GalleryItem;
