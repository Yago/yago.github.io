import React from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Button from 'components/Button';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Layout from 'components/Layout';

const Home = (): JSX.Element => (
  <Layout>
    <h1 tw="mt-20 font-sans text-4xl font-medium text-gray-900">
      Last projects
    </h1>
    <Divider>
      <span tw="font-sans text-lg font-medium text-gray-500">
        Yann Gouffon — June 25, 2019
      </span>
    </Divider>
    <Divider icon="drakar" />
    <p tw="mt-5 font-serif text-2xl text-gray-900">
      Ahoy there ! I'm Yann, Frontend and JavaScript developer by day and
      photographer when the night comes (or my days off).
    </p>
    <p tw="mt-4 text-lg font-normal text-gray-600">
      — <Icon name="igloo" tw="text-lg" /> Based in Lausanne, Switzerland
    </p>

    <div tw="mt-10">
      <Button href="/">See all</Button>
    </div>
  </Layout>
);

export default Home;
