/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import PSWP from 'photoswipe/dist/photoswipe';
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import { isNil } from 'ramda';

import { AppContext } from 'contexts/AppProvider';
import { useWindowDimensions } from 'hooks';

import PhotoSwipeWrapper from '../PhotoSwipeWrapper';

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
  const [displayInfo, setDisplayInfo] = useState(true);
  const pswp = useRef<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const current = photoswipeContainer?.[photoswipeIndex ?? 0];
  const rich = photoswipeContainer?.map(i => !isNil(i.title))?.includes(true);
  const { smallerThan } = useWindowDimensions();

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
    <div
      className={clsx(
        'transition-opacity bg-white fixed inset-0',
        !photoswipeOpen && 'pointer-events-none opacity-0'
      )}
    >
      {/* {photoswipeOpen && ( */}
      <PhotoSwipeWrapper
        setRef={wrapper}
        transition
        rich={rich}
        currentIndex={photoswipeIndex}
        total={photoswipeContainer?.length ?? 0}
        onContainerClick={() => smallerThan.sm && setDisplayInfo(i => !i)}
      >
        <AnimatePresence>
          {photoswipeContainer?.map(
            (item, i) =>
              !isNil(current) &&
              i === current.uid &&
              displayInfo && (
                <motion.div
                  key={`info-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 w-full"
                >
                  {!isNil(item?.title) && (
                    <h3 className="text-lg font-medium md:text-2xl">
                      {item.title}
                    </h3>
                  )}
                  {!isNil(item?.meta?.Headline) && (
                    <h3 className="text-lg font-medium md:text-2xl">
                      {item.meta.Headline}
                    </h3>
                  )}
                  {!isNil(item?.meta?.DateTimeOriginal) && (
                    <p className="mt-1 text-sm text-gray-500">
                      — {item.meta.DateTimeOriginal.split(':')[0]}
                    </p>
                  )}
                  <p className="mt-2 text-gray-600 md:mt-4">
                    {!isNil(item?.meta?.Model) &&
                      item.meta.Model !== 'Tiff File' && (
                        <span className="pr-3 lowercase md:text-lg md:block md:pr-0">
                          {item.meta?.Model}
                          <span className="pl-2 text-gray-400 md:hidden">
                            |
                          </span>
                        </span>
                      )}
                    {!isNil(item?.meta?.FocalLength) && (
                      <span className="pr-3 md:text-lg md:block md:pr-0">
                        {item.meta?.FocalLength}
                        <span className="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ApertureValue) && (
                      <span className="pr-3 md:text-lg md:block md:pr-0">
                        ƒ/
                        {Math.round(+(item.meta?.ApertureValue ?? 0) * 10) / 10}
                        <span className="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ExposureTime) && (
                      <span className="pr-3 md:text-lg md:block md:pr-0">
                        {item.meta?.ExposureTime}s
                        <span className="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    {!isNil(item?.meta?.ISOSpeedRatings) && (
                      <span className="pr-3 md:text-lg md:block md:pr-0">
                        {item.meta?.ISOSpeedRatings} ISO
                        <span className="pl-2 text-gray-400 md:hidden">|</span>
                      </span>
                    )}
                    <span className="block pt-2 text-sm md:pt-4 md:text-base">
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

export default PhotoSwipe;
