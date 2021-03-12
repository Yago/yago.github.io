/* eslint-disable prefer-destructuring */
import React, { useContext, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import { isNil, last } from 'ramda';
import tw, { TwStyle } from 'twin.macro';
import { PhotoSwipeContainer } from 'types';

import Picture from 'components/Picture';
import pictures from 'config/pictures';
import { AppContext } from 'contexts/AppProvider';

type Props = {
  sources: (string | string[])[];
  wrapperTw?: TwStyle;
  itemTw?: TwStyle;
  imgTw?: TwStyle;
};

const Gallery = ({ sources, wrapperTw, itemTw, imgTw }: Props): JSX.Element => {
  const [container, setContainer] = useState<PhotoSwipeContainer | null>();
  const { setPhotoswipeIndex, setPhotoswipeContainer } = useContext(AppContext);

  useEffect(() => {
    setContainer(
      sources.map((src, i) => {
        let filename;
        let title;

        if (typeof src === 'string') {
          filename = src;
        } else {
          filename = src[0];
          title = src[1];
        }

        const picture = pictures[filename];

        return {
          uid: i,
          w: picture.w,
          h: picture.h,
          src: picture.src,
          title,
          meta: picture,
        };
      })
    );
  }, [sources]);

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    i: number
  ): void => {
    e.preventDefault();
    setPhotoswipeIndex(i);
    if (!isNil(container)) setPhotoswipeContainer(container);
  };

  return (
    <div itemScope itemType="http://schema.org/ImageGallery" css={wrapperTw}>
      {container?.map((item, i) => (
        <figure
          key={`thumb-${item.uid || i}`}
          itemProp="associatedMedia"
          itemScope
          itemType="http://schema.org/ImageObject"
          css={itemTw}
        >
          <a
            href={item.src}
            onClick={e => handleClick(e, item.uid || i)}
            itemProp="contentUrl"
            css={imgTw}
          >
            <Picture
              filename={last(item.src.split('/')) as string}
              alt={item.title ?? ''}
            />
          </a>
        </figure>
      ))}
    </div>
  );
};

export default Gallery;
