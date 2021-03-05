import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Gallery from './Gallery';

type Props = {
  sources: string[];
};

const GalleryProxy = ({ sources }: Props): JSX.Element => (
  <Gallery sources={sources} wrapperTw={tw`md:-mx-10`} />
);

GalleryProxy.defaultProps = {};

export default GalleryProxy;
