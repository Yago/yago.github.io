import React from 'react';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import PropTypes from 'prop-types';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import Picture from './Picture';

const Gallery = ({ sources, containerClass, itemClass }) => {
  const cleanSources = typeof sources === 'string' ? JSON.parse(sources) : sources;
  const container = cleanSources.map((src) => {
    return {
      ...src,
      src: `https://res.cloudinary.com/dwzk6imzg/image/upload/c_scale,q_65,w_2880/v1550240899/${
        src.src
      }`,
    };
  });

  const openGallery = (event, index) => {
    event.preventDefault();
    const pswp = document.querySelectorAll('.pswp')[0];
    const options = {
      index,
      bgOpacity: 0.85,
      showHideOpacity: true,
      history: false,
    };

    const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, container, options);

    gallery.init();
  };

  return (
    <div className={containerClass}>
      {container
        && container.map((src, i) => (
          <figure
            key={i}
            className={`gallery-item ${itemClass}`}
            itemProp="associatedMedia"
            itemScope
            itemType="http://schema.org/ImageObject"
            data-index={i}
          >
            <a href={src.src} onClick={e => openGallery(e, i)} itemProp="contentUrl">
              <Picture id={src.src} />
              <figcaption>{src.caption}</figcaption>
            </a>
          </figure>
        ))}
    </div>
  );
};

Gallery.propTypes = {
  sources: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  itemClass: PropTypes.string,
};

Gallery.defaultProps = {
  containerClass: '',
  itemClass: '',
};

export default Gallery;
