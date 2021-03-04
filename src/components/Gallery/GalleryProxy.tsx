import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import pictures from 'config/pictures';

import Gallery from './Gallery';

type Props = {
  sources: string[];
};

const GalleryProxy = ({ sources }: Props): JSX.Element => {
  const container = sources.map((src, i) => ({
    uid: i,
    ...pictures[src],
  }));

  return <Gallery container={container} wrapperTw={tw`-mx-10`} />;
};

GalleryProxy.defaultProps = {};

export default GalleryProxy;
