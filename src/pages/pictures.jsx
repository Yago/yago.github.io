import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PhotoGallery from 'react-photo-gallery';
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import Loader from 'react-loader-spinner';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Layout from '../components/layout';
import Icon from '../components/Icon';
import SEO from '../components/seo';
import PhotoswipeWrapper from '../components/content/PhotoswipeWrapper';
import { formatTitle } from '../helpers/pictures';
import pictures from '../config/pictures.json';

const PicturesPage = ({ data, location }) => {
  const [length, setLength] = useState(0);
  const [collection, setCollection] = useState([]);
  const photoswipeContainer = useRef([]);
  const photoGalleryContainer = useRef([]);

  const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;

  const addPictures = qty => {
    console.log('more!', length, length + qty);

    setCollection([
      ...collection,
      ...photoGalleryContainer.current.slice(length, length + qty),
    ]);

    setLength(length + qty);
  };

  // On mount
  useEffect(() => {
    // Create container for photoswipe
    photoswipeContainer.current = pictures
      .sort((a, b) => b.id - a.id)
      .map(pic => {
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
    photoGalleryContainer.current = photoswipeContainer.current.map(pic => ({
      src: pic.node.fluid.src,
      srcSet: pic.node.fluid.srcSet,
      sizes: pic.node.fluid.sizes,
      width: pic.w,
      height: pic.h,
      alt: pic.title,
    }));

    addPictures(10);
  }, []);

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

    const gallery = new PhotoSwipe(
      pswp,
      PhotoSwipeUIDefault,
      photoswipeContainer.current,
      options
    );
    gallery.init();
  };

  return (
    <Layout location={location}>
      <SEO title="Pictures" />

      <div className="container-fluid">
        <div className="ml-md-4">
          <Fade>
            <h1>Pictures</h1>
          </Fade>

          <Fade bottom distance="30px" cascade>
            <div className="mt-2">
              <div
                style={{ margin: currentWidth > 990 ? '0 -45px' : '0 -5px' }}
              >
                {photoGalleryContainer.current.length > 0 && (
                  <InfiniteScroll
                    dataLength={collection.length}
                    next={() => addPictures(10)}
                    hasMore={
                      photoGalleryContainer.current.length !== collection.length
                    }
                    loader={
                      <div className="text-center">
                        <Loader
                          type="TailSpin"
                          color="#000"
                          height={40}
                          width={40}
                        />
                      </div>
                    }
                  >
                    {console.log(collection.length, length)}
                    <PhotoGallery
                      photos={collection}
                      onClick={openGallery}
                      margin={currentWidth > 990 ? 50 : 10}
                      columns={3}
                      targetRowHeight={currentWidth > 990 ? 220 : 150}
                      direction="row"
                    />
                  </InfiniteScroll>
                )}
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
