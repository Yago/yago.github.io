/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { jsx } from '@emotion/react';
import PSWP from 'photoswipe/dist/photoswipe';
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import { AppContext } from 'contexts/AppProvider';

import PhotoSwipeWrapper from '../PhotoSwipeWrapper';

import styles from './PhotoSwipe.styles';

type Props = {
  children?: React.ReactNode;
  options?: any;
};

const PhotoSwipe = ({ children, options = {} }: Props): JSX.Element => {
  const {
    photoswipeOpen,
    setPhotoswipeOpen,
    photoswipeIndex,
    setPhotoswipeIndex,
    photoswipeContainer,
  } = useContext(AppContext);
  const pswp = useRef<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(photoswipeIndex);

  const settings = {
    bgOpacity: 1,
    showHideOpacity: true,
    history: false,
    preload: [1, 1],
    ...options,
  };

  // PhotoSwipe trigger method
  const openGallery = (i?: string | number): void => {
    console.log('open gal');
    pswp.current = new PSWP(
      wrapper.current,
      photoSwipeUIDefault,
      photoswipeContainer,
      {
        ...settings,
        index: i,
      }
    );

    if (!isNil(pswp.current)) {
      pswp.current.init();

      pswp.current.listen('close', () => setPhotoswipeOpen(false));
      pswp.current.listen('beforeChange', () =>
        setCurrentIndex(pswp.current ? pswp.current.getCurrentIndex() : 0)
      );
      pswp.current.listen('destroy', () => {
        pswp.current = null;
      });
    }
  };

  // Go to slide #
  const goTo = (i: number | string): void => {
    if (!isNil(pswp.current)) pswp.current.goTo(i);
  };

  useEffect(() => {
    if (photoswipeOpen) openGallery();

    return () => {
      pswp.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isNil(photoswipeIndex)) {
      if (photoswipeOpen && isNil(pswp.current)) openGallery(photoswipeIndex);
      if (
        !isNil(pswp.current) &&
        photoswipeIndex !== pswp.current.getCurrentIndex()
      ) {
        goTo(photoswipeIndex);
      }
    }
  }, [photoswipeIndex, photoswipeOpen]);

  useEffect(() => {
    if (!isNil(currentIndex)) setPhotoswipeIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div css={styles()}>
      <PhotoSwipeWrapper setRef={wrapper}>{children}</PhotoSwipeWrapper>
    </div>
  );
};

export default PhotoSwipe;
