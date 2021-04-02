import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import GalleryTeaser from 'components/GalleryTeaser';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import SEO from 'components/SEO';
import galleries from 'config/galleries.json';

const Photographs = (): JSX.Element => (
  <Layout outsideChildren={<PhotoSwipe />}>
    <SEO title="Photographs" />
    <Breadcrumb crumbs={[{ label: 'Photographs' }]} />
    <div tw="w-full mb-20 md:pl-20 lg:pl-32">
      <FadeIn move={false}>
        <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
          Photographs
        </h1>
      </FadeIn>
      <div tw="mt-14 md:w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
        <FadeIn>
          <GalleryTeaser
            sources={galleries.alps}
            cover="alps.jpg"
            title="Alps"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.italia}
            cover="italia.jpg"
            title="Italia"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries['reunion-mauritius']}
            cover="reunion-mauritius.jpg"
            title="Réunion & Mauritius"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.sverige}
            cover="sverige.jpg"
            title="Sverige"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.film}
            cover="film.jpg"
            title="Film"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.island}
            cover="island.jpg"
            title="Ísland"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.countryside}
            cover="countryside.jpg"
            title="Countryside"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.scotland}
            cover="scotland.jpg"
            title="Scotland"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.yucatan}
            cover="yucatan.jpg"
            title="Yucatan"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.lisboa}
            cover="lisboa.jpg"
            title="Lisboa"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries['sri-lanka']}
            cover="sri-lanka.jpg"
            title="Sri-Lanka"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.ticino}
            cover="ticino.jpg"
            title="Ticino"
          />
        </FadeIn>
        <FadeIn>
          <GalleryTeaser
            sources={galleries.bali}
            cover="bali.jpg"
            title="Bali"
          />
        </FadeIn>
      </div>
    </div>
  </Layout>
);

export default Photographs;
