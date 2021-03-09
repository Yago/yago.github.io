import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import GalleryTeaser from 'components/GalleryTeaser';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import galleries from 'config/galleries.json';

const Photographs = (): JSX.Element => (
  <Layout outsideChildren={<PhotoSwipe />}>
    <Breadcrumb crumbs={[{ label: 'Photographs' }]} />
    <div tw="w-full mb-20 md:pl-20 lg:pl-32">
      <FadeIn move={false}>
        <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
          Photographs
        </h1>
      </FadeIn>
      <div tw="w-11/12 mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-12">
        <FadeIn>
          <GalleryTeaser
            sources={galleries.bali}
            cover="bali.jpg"
            title="Bali"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.mountain}
            cover="mountain.jpg"
            title="Mountain"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.italy}
            cover="italy.jpg"
            title="Italy"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries['reunion-maurice']}
            cover="reunion-maurice.jpg"
            title="Réunion/Mauritius"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.north}
            cover="north.jpg"
            title="North"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.mexico}
            cover="mexico.jpg"
            title="Yucatan"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries['sri-lanka']}
            cover="sri-lanka.jpg"
            title="Sri-Lanka"
          />
        </FadeIn>
      </div>
    </div>
  </Layout>
);

export default Photographs;
