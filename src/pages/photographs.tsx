import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import GalleryTeaser from 'components/GalleryTeaser';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';

const Photographs = (): JSX.Element => (
  <Layout outsideChildren={<PhotoSwipe />}>
    <Breadcrumb crumbs={[{ label: 'Photographs' }]} />
    <div tw="w-full mb-20 md:pl-20 lg:pl-32">
      <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
        Photographs
      </h1>
      <div tw="w-11/12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-12">
        <GalleryTeaser
          sources={[['lisboa-3.jpg', 'Nice view'], 'lisboa-7.jpg']}
          cover="lisboa.jpg"
          title="Urban"
        />
        <GalleryTeaser
          sources={[['lisboa-2.jpg', 'Nice view'], 'lisboa-7.jpg']}
          cover="lisboa.jpg"
          title="Urban"
        />
        <GalleryTeaser
          sources={[['lisboa-1.jpg', 'Nice view'], 'lisboa-7.jpg']}
          cover="lisboa.jpg"
          title="Urban"
        />
      </div>
    </div>
  </Layout>
);

export default Photographs;
