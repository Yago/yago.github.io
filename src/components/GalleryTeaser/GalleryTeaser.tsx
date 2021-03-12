/* eslint-disable prefer-destructuring */
import React, { useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import { isNil } from 'ramda';
import tw from 'twin.macro';
import { PhotoSwipeContainer } from 'types';

import Icon from 'components/Icon';
import Picture from 'components/Picture';
import pictures from 'config/pictures';
import { AppContext } from 'contexts/AppProvider';

import { imageWraper } from './GalleryTeaser.styles';

type Props = {
  title: string;
  sources: (string | string[])[];
  cover: string;
};

const GalleryTeaser = ({ title, sources, cover }: Props): JSX.Element => {
  const [container, setContainer] = useState<PhotoSwipeContainer | null>();
  const { setPhotoswipeIndex, setPhotoswipeContainer } = useContext(AppContext);

  useEffect(() => {
    setContainer(
      sources.map((src, i) => {
        let filename;
        let pictureTitle;

        if (typeof src === 'string') {
          filename = src;
        } else {
          filename = src[0];
          pictureTitle = src[1];
        }

        const picture = pictures[filename];

        return {
          uid: i,
          w: picture.w,
          h: picture.h,
          src: picture.src,
          title: pictureTitle,
          meta: picture,
        };
      })
    );
  }, [sources]);

  const handleClick = (): void => {
    setPhotoswipeIndex(0);
    if (!isNil(container)) setPhotoswipeContainer(container);
  };

  return (
    <button
      css={imageWraper}
      type="button"
      tw="relative block w-full overflow-hidden text-white bg-gray-950"
      onClick={handleClick}
    >
      <Picture
        filename={cover}
        alt={title}
        tw="transform transition-transform duration-1000"
      />
      <div tw="absolute inset-0 p-5 text-left pointer-events-none">
        <h3 tw="font-medium md:text-2xl">
          <Icon name="film" tw="mr-3 text-lg" />
          {title}
        </h3>
      </div>
    </button>
  );
};

export default GalleryTeaser;
