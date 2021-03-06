/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { jsx } from '@emotion/react';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Gallery from 'components/Gallery';
import Layout from 'components/Layout';
import PhotoSwipe from 'components/PhotoSwipe';
import Picture from 'components/Picture';

export type ProjectProps = {
  children: React.ReactNode;
  meta: {
    path: string;
    date: string;
    title: string;
    subtitle: string;
    type: string;
    cover: string;
    thumbnail: string;
    agency?: {
      name: string;
      url: string;
    };
    roles?: string[];
    open_source?: {
      name: string;
      url: string;
    };
    year?: string;
    gallery: (string | string[])[];
  };
};

const Project = ({ children, meta }: ProjectProps): JSX.Element => (
  <Layout outsideChildren={<PhotoSwipe />}>
    <Breadcrumb
      crumbs={[{ href: '/projects', label: 'Projects' }, { label: meta.title }]}
    />
    <div tw="flex flex-col-reverse mt-20 md:flex-row md:pl-20 lg:pl-32">
      <article tw="w-full md:w-3/5 lg:w-1/2">
        <FadeIn move={false}>
          <h1 tw="text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <h2 tw="mt-3 text-xl font-medium text-gray-500 md:text-2xl lg:text-3xl">
            {meta.subtitle}
          </h2>
        </FadeIn>

        <FadeIn>
          <table tw="table w-full mt-12 md:mt-20 md:text-lg">
            <tbody>
              {!isNil(meta.agency) && (
                <tr>
                  <td tw="py-1 pr-3">Agency</td>
                  <td tw="py-1">
                    <a
                      href={meta.agency.url}
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                      tw="text-blue"
                    >
                      {meta.agency.name}
                    </a>
                  </td>
                </tr>
              )}
              {!isNil(meta.open_source) && (
                <tr>
                  <td tw="py-1 pr-3">Open Source</td>
                  <td tw="py-1">
                    <a
                      href={meta.open_source.url}
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                      tw="text-blue"
                    >
                      {meta.open_source.name}
                    </a>
                  </td>
                </tr>
              )}
              {!isNil(meta.roles) && (
                <tr>
                  <td tw="py-1 pr-3">
                    <span>Role</span>
                    {meta.roles.length > 1 && 's'}
                  </td>
                  <td tw="py-1">
                    {meta.roles.map((role, i) => (
                      <span key={i}>
                        {role}
                        <br />
                      </span>
                    ))}
                  </td>
                </tr>
              )}
              {!isNil(meta.year) && (
                <tr>
                  <td tw="py-1 pr-3">year</td>
                  <td tw="py-1">{meta.year}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div tw="mt-12 font-serif prose prose-lg md:prose-xl lg:prose-2xl">
            {children}
          </div>
        </FadeIn>
      </article>
      <FadeIn
        delay={0.4}
        tw="relative w-full mb-6 mr-auto md:mr-0 md:w-1/3 md:ml-auto md:mb-0"
      >
        <Picture filename={meta.cover} alt={meta.title} />
      </FadeIn>
    </div>
    <FadeIn>
      <Gallery
        sources={meta.gallery}
        wrapperTw={tw`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 my-20`}
      />
    </FadeIn>
  </Layout>
);

Project.defaultProps = {};

export default Project;
