import React from 'react';
import { jsx } from '@emotion/react';
import Image from 'next/image';
import tw from 'twin.macro';

import pictures from 'config/pictures';

type Props = {
  filename: string;
  alt: string;
  className?: string;
};

const Picture = ({ filename, alt, className }: Props): JSX.Element => {
  const img = pictures[filename];

  return (
    <div className={className}>
      <Image
        src={img.msrc}
        alt={alt}
        width={img.w}
        height={img.h}
        layout="responsive"
        quality={65}
      />
    </div>
  );
};

export default Picture;
