import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import Button from 'components/Button';
import DevFacts from 'components/DevFacts';
import FadeIn from 'components/FadeIn';
import GalleryTeaser from 'components/GalleryTeaser';
import Icon from 'components/Icon';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import PostTeaser from 'components/PostTeaser';
import ProjectTeaser from 'components/ProjectTeaser';
import SEO from 'components/SEO';
import galleries from 'config/galleries.json';
import { AppContext } from 'contexts/AppProvider';

const Home = (): JSX.Element => {
  const { tree } = useContext(AppContext);
  const projects = tree.filter(i => i.path.includes('/projects/'));
  const posts = tree.filter(i => i.path.includes('/blog/'));

  return (
    <Layout outsideChildren={<PhotoSwipe />} noContainer>
      <SEO title="Welcome" />
      <div tw="px-4 mx-auto max-w-screen-2xl md:px-14">
        <FadeIn move={false}>
          <h1 tw="sr-only">Yann Gouffon, developer and photographer</h1>
          <blockquote tw="w-10/12 my-44 md:w-8/12 lg:w-1/2 xl:w-5/12">
            <p tw="font-serif text-lg font-light text-gray-900 md:text-2xl lg:text-2.5xl leading-7 md:leading-9 lg:leading-10">
              Ahoy there ! I'm Yann, Frontend and JavaScript{' '}
              <code tw="text-sm font-normal md:text-xl lg:text-2xl">
                developer
              </code>{' '}
              by day and <em>photographer</em> when the night comes (or during
              my days off).
            </p>
            <footer tw="mt-6 text-gray-600 md:text-lg lg:text-xl">
              — <Icon name="igloo" /> Based in Lausanne, Switzerland
            </footer>
          </blockquote>
        </FadeIn>

        <FadeIn tw="flex items-baseline justify-between">
          <h2 tw="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last projects
          </h2>
          <Button href="/projects">See all</Button>
        </FadeIn>

        <div tw="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
          {projects
            .filter(i => isNil(i.meta.published) || i.meta.published)
            .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
            .slice(0, 6)
            .map((project, i) => (
              <FadeIn key={`project-${i}`}>
                <ProjectTeaser project={project.meta} href={project.path} />
              </FadeIn>
            ))}
        </div>

        <FadeIn tw="flex items-baseline justify-between mt-32">
          <h2 tw="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last photographs
          </h2>
          <Button href="/photographs">See all</Button>
        </FadeIn>

        <div tw="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-12">
          <FadeIn>
            <GalleryTeaser
              sources={galleries.north}
              cover="north.jpg"
              title="North"
            />
          </FadeIn>
          <FadeIn>
            <GalleryTeaser
              sources={galleries.mountain}
              cover="mountain.jpg"
              title="Mountain"
            />
          </FadeIn>
        </div>
      </div>

      <FadeIn tw="mt-32">
        <DevFacts />
      </FadeIn>

      <div tw="px-4 mx-auto max-w-screen-2xl md:px-14">
        <FadeIn tw="flex items-baseline justify-between mt-16">
          <h2 tw="text-2xl font-medium text-gray-900 md:text-3xl lg:text-4xl">
            Last blog posts
          </h2>
          <Button href="/blog">See all</Button>
        </FadeIn>

        <div tw="mt-16 grid lg:grid-cols-2 lg:gap-x-20 gap-y-16">
          {posts
            .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
            .slice(0, 4)
            .map((post, i) => (
              <FadeIn
                key={`post-${i}`}
                css={i === posts.length - 1 && tw`mb-20`}
              >
                <PostTeaser post={post.meta} href={post.path} />
              </FadeIn>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
