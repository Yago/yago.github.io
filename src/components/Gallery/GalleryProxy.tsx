import React from 'react';

import Gallery from './Gallery';

type Props = {
  sources: string[];
};

const GalleryProxy = ({ sources }: Props): JSX.Element => (
  <Gallery sources={sources} wrapperTw="md:-mx-10" />
);

export default GalleryProxy;
