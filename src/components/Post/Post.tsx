/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { jsx } from '@emotion/react';
import { format, parseISO } from 'date-fns';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import Divider from 'components/Divider';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import SEO from 'components/SEO';

export type PostProps = {
  children: React.ReactNode;
  meta: {
    path: string;
    date: string;
    title: string;
    type: string;
    description: string;
  };
};

const Post = ({ children, meta }: PostProps): JSX.Element => (
  <Layout outsideChildren={<PhotoSwipe />}>
    <SEO title={meta.title} description={meta.description} />
    <Breadcrumb
      crumbs={[{ href: '/blog', label: 'Blog' }, { label: meta.title }]}
    />
    <article tw="w-full mx-auto mt-20 sm:w-10/12 xl:w-7/12 md:px-8">
      <FadeIn move={false}>
        <h1 tw="text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
          {meta.title}
        </h1>
        <Divider>
          <h2 tw="font-medium md:text-lg">
            <span>Yann Gouffon — </span>
            {format(parseISO(meta.date), 'PPP')}
          </h2>
        </Divider>
      </FadeIn>
      <FadeIn tw="mt-16 font-serif text-gray-900 md:mt-14 prose prose-lg md:prose-xl xl:prose-2xl">
        {children}
      </FadeIn>
    </article>
  </Layout>
);

export default Post;
