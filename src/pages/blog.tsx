import React from 'react';
import clsx from 'clsx';
import { isNil } from 'ramda';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import { PostProps } from 'components/Post/Post';
import PostTeaser from 'components/PostTeaser';
import SEO from 'components/SEO';
import jsonTree from 'config/tree.json';
import { Tree } from 'types';

const tree: Tree = jsonTree;

const Projects = (): JSX.Element => {
  const posts = tree.filter(i => i.path.includes('/blog/') && !isNil(i?.meta));

  return (
    <Layout>
      <SEO title="Blog" />
      <Breadcrumb crumbs={[{ label: 'Blog' }]} />
      <div className="w-full mx-auto mt-12 sm:w-10/12 md:w-2/3 xl:w-7/12 md:px-8">
        <FadeIn move={false}>
          <h1 className="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            Blog
          </h1>
        </FadeIn>
        <div className="mt-16">
          {posts
            .sort((a, b) => +new Date(b?.meta?.date) - +new Date(a?.meta?.date))
            .map((post, i) => (
              <FadeIn
                key={`post-${i}`}
                className={clsx(i === posts.length - 1 && 'mb-20')}
              >
                <PostTeaser
                  post={post.meta as PostProps['meta']}
                  href={post.path}
                />
                {i !== posts.length - 1 && (
                  <hr className="w-1/2 my-10 border-t border-gray-300 md:my-16" />
                )}
              </FadeIn>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
