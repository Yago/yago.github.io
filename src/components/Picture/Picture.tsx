import React from 'react';
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

const Picture = ({ filename, alt, className }: Props): JSX.Element => {
  const img = pictures[filename];
  const { observe, width } = useDimensions<HTMLDivElement | null>();

  return (
    <div ref={observe} className={className}>
      <Image
        src={img.msrc}
        alt={alt}
        width={img.w}
        height={img.h}
        layout="responsive"
        quality={65}
        sizes={!isNil(width) ? `${Math.round(width)}px` : '100vw'}
      />
    </div>
  );
};

export default Picture;
