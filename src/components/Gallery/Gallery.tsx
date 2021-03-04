import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { last } from 'ramda';
import tw, { TwStyle } from 'twin.macro';
import { PhotoSwipeContainer } from 'types';

import Picture from 'components/Picture';
import { AppContext } from 'contexts/AppProvider';

type Props = {
  container: PhotoSwipeContainer;
  wrapperTw?: TwStyle;
  itemTw?: TwStyle;
  imgTw?: TwStyle;
};

const Gallery = ({
  container,
  wrapperTw,
  itemTw,
  imgTw,
}: Props): JSX.Element => {
  const { setPhotoswipeIndex, setPhotoswipeContainer } = useContext(AppContext);

  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    i: string | number
  ): void => {
    e.preventDefault();
    setPhotoswipeIndex(i);
    setPhotoswipeContainer(container);
  };

  return (
    <div itemScope itemType="http://schema.org/ImageGallery" css={wrapperTw}>
      {container.map((item, i) => (
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
