/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { jsx } from '@emotion/react';
import PSWP from 'photoswipe/dist/photoswipe';
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import { Container } from '../Gallery/Gallery';
import PhotoSwipeWrapper from '../PhotoSwipeWrapper';

import styles from './PhotoSwipe.styles';

type Props = {
  children?: React.ReactNode;
  container: Container;
  index: string | number | null;
  onIndexChange: (uid: string | number) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  options?: any;
};

const PhotoSwipe = ({
  children,
  container,
  index,
  open,
  onIndexChange,
  onOpenChange,
  options = {},
}: Props): JSX.Element => {
  const pswp = useRef<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(index);

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
    pswp.current = new PSWP(wrapper.current, photoSwipeUIDefault, container, {
      ...settings,
      index: i,
    });

    if (!isNil(pswp.current)) {
      pswp.current.init();

      pswp.current.listen('close', () => onOpenChange(false));
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
    if (open) openGallery();

    return () => {
      pswp.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isNil(index)) {
      if (open && isNil(pswp.current)) openGallery(index);
      if (!isNil(pswp.current) && index !== pswp.current.getCurrentIndex()) {
        goTo(index);
      }
    }
  }, [index, open]);

  useEffect(() => {
    if (!isNil(currentIndex)) onIndexChange(currentIndex);
  }, [currentIndex]);

  return (
    <div css={styles()}>
      <PhotoSwipeWrapper setRef={wrapper}>{children}</PhotoSwipeWrapper>
    </div>
  );
};

export default PhotoSwipe;
