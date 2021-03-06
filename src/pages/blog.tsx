import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import PostTeaser from 'components/PostTeaser';
import { AppContext } from 'contexts/AppProvider';

const Projects = (): JSX.Element => {
  const { tree } = useContext(AppContext);
  const posts = tree.filter(i => i.path.includes('/blog/'));

  return (
    <Layout>
      <Breadcrumb crumbs={[{ label: 'Blog' }]} />
      <div tw="w-full mx-auto mt-12 sm:w-10/12 xl:w-7/12 md:px-8">
        <FadeIn move={false}>
          <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            Blog
          </h1>
        </FadeIn>
        <div tw="mt-16">
          {posts
            .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
            .map((post, i) => (
              <FadeIn
                key={`post-${i}`}
                css={i === posts.length - 1 && tw`mb-20`}
              >
                <PostTeaser post={post.meta} href={post.path} />
                {i !== posts.length - 1 && (
                  <hr tw="w-1/2 my-10 border-t border-gray-300 md:my-16" />
                )}
              </FadeIn>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
