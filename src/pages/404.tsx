import React from 'react';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import SEO from 'components/SEO';

const Page404 = (): JSX.Element => (
  <Layout>
    <SEO title="Error 404" />
    <Breadcrumb crumbs={[{ label: '404' }]} />
    <div className="mb-24 md:pl-20">
      <FadeIn move={false}>
        <h1 className="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
          404 — Cat not found
        </h1>
        <img
          src="/images/404-cat-dall-e.jpg"
          alt="cat hiding his eyes with it paws in front of a white background"
          className="mt-6 md:w-1/2"
        />
      </FadeIn>
    </div>
  </Layout>
);

export default Page404;
