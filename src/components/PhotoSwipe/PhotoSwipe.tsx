/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef } from 'react';
import { jsx } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import PSWP from 'photoswipe/dist/photoswipe';
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import { AppContext } from 'contexts/AppProvider';

import PhotoSwipeWrapper from '../PhotoSwipeWrapper';

import styles from './PhotoSwipe.styles';

type Props = {
  options?: any;
};

const PhotoSwipe = ({ options = {} }: Props): JSX.Element => {
  const {
    photoswipeOpen,
    setPhotoswipeOpen,
    photoswipeIndex,
    setPhotoswipeIndex,
    photoswipeContainer,
  } = useContext(AppContext);
  const pswp = useRef<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const current = photoswipeContainer?.[photoswipeIndex ?? 0];
  const rich = photoswipeContainer?.map(i => !isNil(i.title))?.includes(true);

  const settings = {
    bgOpacity: 1,
    showHideOpacity: true,
    history: false,
    preload: [1, 1],
    indexIndicatorSep: '/',
    barsSize: rich ? { top: 0, bottom: 0 } : { top: 80, bottom: 80 },

    ...options,
  };

  // PhotoSwipe trigger method
  const openGallery = (i?: number): void => {
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
        setPhotoswipeIndex(pswp.current ? pswp.current.getCurrentIndex() : 0)
      );
      pswp.current.listen('destroy', () => {
        pswp.current = null;
      });
    }
  };

  // Go to slide #
  const goTo = (i: number): void => {
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

  return (
    <div css={styles()}>
      {/* {photoswipeOpen && ( */}
      <PhotoSwipeWrapper
        setRef={wrapper}
        transition
        rich={rich}
        currentIndex={photoswipeIndex}
        total={photoswipeContainer?.length ?? 0}
      >
        <AnimatePresence>
          {photoswipeContainer?.map(
            (item, i) =>
              !isNil(current) &&
              i === current.uid && (
                <motion.div
                  key={`info-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  tw="absolute bottom-0 left-0 w-full"
                >
                  {!isNil(item?.title) && (
                    <h3 tw="text-lg font-medium md:text-2xl">{item.title}</h3>
                  )}
                  <p tw="mt-2 text-gray-600 md:mt-4">
                    {!isNil(item?.meta?.Model) && (
                      <span tw="pr-3 lowercase md:text-lg md:block md:pr-0">
                        {item.meta?.Model}
                        <span tw="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.FocalLength) && (
                      <span tw="pr-3 md:text-lg md:block md:pr-0">
                        {Math.round(item.meta?.FocalLength)}mm
                        <span tw="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ApertureValue) && (
                      <span tw="pr-3 md:text-lg md:block md:pr-0">
                        ƒ/{Math.round(item.meta?.ApertureValue * 10) / 10}
                        <span tw="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ExposureTime) && (
                      <span tw="pr-3 md:text-lg md:block md:pr-0">
                        1/{Math.round(1 / item.meta?.ExposureTime)}s
                        <span tw="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ISO) && (
                      <span tw="pr-3 md:text-lg md:block md:pr-0">
                        {item.meta?.ISO} ISO
                        <span tw="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    <span tw="block pt-2 text-sm md:pt-4 md:text-base">
                      © Yann Gouffon
                    </span>
                  </p>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </PhotoSwipeWrapper>
      {/* )} */}
    </div>
  );
};

PhotoSwipe.defaultProps = {};

export default PhotoSwipe;
