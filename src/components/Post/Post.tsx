/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { format, parseISO } from 'date-fns';

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
    <article className="w-full mx-auto mt-20 sm:w-10/12 xl:w-7/12 md:px-8">
      <FadeIn move={false}>
        <h1 className="text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
          {meta.title}
        </h1>
        <Divider>
          <h2 className="font-medium md:text-lg">
            <span>Yann Gouffon — </span>
            {format(parseISO(meta.date), 'PPP')}
          </h2>
        </Divider>
      </FadeIn>
      <FadeIn className="mt-16 font-serif text-lg text-gray-900 space-y-6 md:mt-14 prose-headings:pt-4 prose-p:leading-[1.618em] lg:text-xl xl:text-2xl xl:prose-p:leading-[1.618em] prose-a:text-blue prose-headings:font-sans prose-headings:font-medium prose-h2:text-[26px] xl:prose-h2:text-[28px] prose-h3:text-[19px] lg:prose-h3:text-[24px] xl:prose-h3:text-[27px] prose-h4:text-[18px] lg:prose-h4:text-[21px] xl:prose-h4:text-[25px] prose-strong:text-medium xl:prose-pre:w-[106%] xl:prose-pre:-translate-x-[3%] prose-ul:list-disc prose-ul:pl-3 prose-ul:space-y-3 prose-ul:leading-[1.618em] xl:prose-figure:w-[106%] xl:prose-figure:-translate-x-[3%] prose-figure:rounded-lg prose-figure:overflow-hidden prose-figure:my-8 lg:prose-code:text-lg prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
        {children}
      </FadeIn>
    </article>
  </Layout>
);

export default Post;
