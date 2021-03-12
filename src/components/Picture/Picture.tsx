import React from 'react';
import { jsx } from '@emotion/react';
import Image from 'next/image';
import tw from 'twin.macro';

import pictures from 'config/pictures';
import { getAspectRatio } from 'utils';

type Props = {
  filename: string;
  alt: string;
  className?: string;
};

const Picture = ({ filename, alt, className }: Props): JSX.Element => {
  const img = pictures[filename];
  const { styles, isExact } = getAspectRatio(img.w, img.h);

  return (
    <div css={styles} className={className}>
      <Image
        src={img.msrc}
        alt={alt}
        layout="fill"
        objectFit={isExact ? 'contain' : 'cover'}
      />
    </div>
  );
};

export default Picture;
