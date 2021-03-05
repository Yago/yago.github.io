import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';

const Projects = (): JSX.Element => (
  <Layout>
    <Breadcrumb crumbs={[{ label: 'Photographs' }]} />
    <div tw="w-full md:pl-20 lg:pl-32">
      <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
        Photographs
      </h1>
      <div tw="mt-16">yo</div>
    </div>
  </Layout>
);

export default Projects;
