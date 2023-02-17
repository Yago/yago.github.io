import React from 'react';
import clsx from 'clsx';
import { isNil } from 'ramda';

import Button from 'components/Button';
import DevFacts from 'components/DevFacts';
import FadeIn from 'components/FadeIn';
import GalleryTeaser from 'components/GalleryTeaser';
import Icon from 'components/Icon';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import { PostProps } from 'components/Post/Post';
import PostTeaser from 'components/PostTeaser';
import { ProjectProps } from 'components/Project/Project';
import ProjectTeaser from 'components/ProjectTeaser';
import SEO from 'components/SEO';
import galleries from 'config/galleries.json';
import jsonTree from 'config/tree.json';
import { Tree } from 'types';

const tree: Tree = jsonTree;

const Home = (): JSX.Element => {
  const projects = tree.filter(
    i => i.path.includes('/projects/') && !isNil(i?.meta)
  );
  const posts = tree.filter(i => i.path.includes('/blog/') && !isNil(i?.meta));

  return (
    <Layout outsideChildren={<PhotoSwipe />} noContainer>
      <SEO title="Welcome" />
      <div className="px-4 mx-auto max-w-screen-2xl md:px-14">
        <FadeIn move={false}>
          <h1 className="sr-only">Yann Gouffon, developer and photographer</h1>
          <blockquote className="w-10/12 my-44 md:w-8/12 lg:w-1/2 xl:w-5/12">
            <p className="font-serif text-lg font-light text-gray-900 md:text-2xl lg:text-2.5xl leading-7 md:leading-9 lg:leading-10">
              Ahoy there ! I'm Yann, Frontend and JavaScript{' '}
              <code className="text-sm font-normal md:text-xl lg:text-2xl">
                developer
              </code>{' '}
              by day and <em>photographer</em> when the night comes (or during
              my days off).
            </p>
            <footer className="mt-6 text-gray-600 md:text-lg lg:text-xl">
              — <Icon name="igloo" /> Based in Lausanne, Switzerland
            </footer>
          </blockquote>
        </FadeIn>

        <FadeIn className="flex items-baseline justify-between">
          <h2 className="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last projects
          </h2>
          <Button href="/projects">See all</Button>
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
          {projects
            .filter(i => !isNil(i.meta))
            .filter(i => isNil(i?.meta?.published) || i?.meta?.published)
            .sort((a, b) => +new Date(b?.meta?.date) - +new Date(a?.meta?.date))
            .slice(0, 6)
            .map((project, i) => (
              <FadeIn key={`project-${i}`}>
                <ProjectTeaser
                  project={project.meta as ProjectProps['meta']}
                  href={project.path}
                />
              </FadeIn>
            ))}
        </div>

        <FadeIn className="flex items-baseline justify-between mt-32">
          <h2 className="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last photographs
          </h2>
          <Button href="/photographs">See all</Button>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
          <FadeIn>
            <GalleryTeaser
              sources={galleries.sverige}
              cover="sverige.jpg"
              title="Sverige"
            />
          </FadeIn>
          <FadeIn>
            <GalleryTeaser
              sources={galleries.alps}
              cover="alps.jpg"
              title="Alps"
            />
          </FadeIn>
          <div className="hidden lg:block">
            <FadeIn>
              <GalleryTeaser
                sources={galleries.italia}
                cover="italia.jpg"
                title="Italia"
              />
            </FadeIn>
          </div>
        </div>
      </div>

      <FadeIn className="mt-32">
        <DevFacts />
      </FadeIn>

      <div className="px-4 mx-auto max-w-screen-2xl md:px-14">
        <FadeIn className="flex items-baseline justify-between mt-16">
          <h2 className="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last blog posts
          </h2>
          <Button href="/blog">See all</Button>
        </FadeIn>

        <div className="mt-16 grid lg:grid-cols-2 lg:gap-x-20 gap-y-16">
          {posts
            .sort((a, b) => +new Date(b?.meta?.date) - +new Date(a?.meta?.date))
            .slice(0, 4)
            .map((post, i) => (
              <FadeIn
                key={`post-${i}`}
                className={clsx(i === posts.length - 1 && 'mb-20')}
              >
                <PostTeaser
                  post={post.meta as PostProps['meta']}
                  href={post.path}
                />
              </FadeIn>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
