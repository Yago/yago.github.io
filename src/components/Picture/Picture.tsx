import React, { useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import { jsx } from '@emotion/react';
import Image from 'next/image';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import pictures from 'config/pictures';

type Props = {
  filename: string;
  alt: string;
  className?: string;
};

const loader = ({ src, width }: { src: string; width: number }) =>
  // const filename = last(src.split('/')).replace(/\..+$/, '');
  // return `/images/responsive/${filename}-${width}.jpg`;
  `https://aznggzkrtq.cloudimg.io/v7/yago.io${src}?w=${width}`;

const Picture = ({ filename, alt, className }: Props): JSX.Element => {
  const img = pictures[filename];
  const [loaded, setLoaded] = useState(false);
  const { observe, width } = useDimensions<HTMLDivElement | null>();

  // eslint-disable-next-line
  const handleLoad = (e: any) => {
    if (e.target.srcset) setLoaded(true);
  };

  return (
    <div ref={observe} className={`picture ${className}`} tw="bg-gray-100">
      <div
        tw="opacity-0 transition-opacity duration-200"
        css={loaded && tw`opacity-100`}
      >
        <Image
          src={img.msrc}
          loader={loader}
          alt={alt}
          width={img.w}
          height={img.h}
          layout="responsive"
          quality={65}
          sizes={!isNil(width) ? `${Math.round(width)}px` : '100vw'}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
};

export default Picture;
