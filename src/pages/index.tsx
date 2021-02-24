import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Icon from 'components/Icon';
import Layout from 'components/Layout';

const Home = (): JSX.Element => (
  <Layout>
    <h1 tw="font-sans text-4xl font-medium text-gray-900">Last projects</h1>
    <p tw="mt-5 font-serif text-2xl text-gray-900">
      Ahoy there ! I'm Yann, Frontend and JavaScript developer by day and
      photographer when the night comes (or my days off).
    </p>
    <p tw="mt-4 text-lg font-normal text-gray-600">
      — <Icon name="igloo" tw="text-lg" /> Based in Lausanne, Switzerland
    </p>
  </Layout>
);

export default Home;
