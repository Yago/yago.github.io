import React from 'react';
import { jsx } from '@emotion/react';
import Image from 'next/image';
import tw, { TwStyle } from 'twin.macro';

export type Container = {
  uid: string | number;
  src: string;
  msrc: string;
  w: number;
  h: number;
  title?: string;
}[];

type Props = {
  container: Container;
  onClick: (uid: string | number) => void;
  wrapperTw?: TwStyle;
  itemTw?: TwStyle;
  imgTw?: TwStyle;
};

const Gallery = ({
  container,
  onClick,
  wrapperTw,
  itemTw,
  imgTw,
}: Props): JSX.Element => {
  const handleClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    i: string | number
  ): void => {
    e.preventDefault();
    onClick(i);
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
            data-size={`${item.w}x${item.h}`}
            css={imgTw}
          >
            <Image
              src={item.msrc}
              alt={item.title}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </figure>
      ))}
    </div>
  );
};

export default Gallery;
