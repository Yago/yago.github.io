import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import ProjectTeaser from 'components/ProjectTeaser';
import { AppContext } from 'contexts/AppProvider';

const Projects = (): JSX.Element => {
  const { tree } = useContext(AppContext);
  const projects = tree.filter(i => i.path.includes('/projects/'));

  return (
    <Layout>
      <Breadcrumb crumbs={[{ label: 'Projects' }]} />
      <div tw="mb-24 md:pl-20">
        <FadeIn move={false}>
          <h1 tw="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            Projects
          </h1>
        </FadeIn>
        <div tw="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
          {projects
            .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
            .map((project, i) => (
              <FadeIn key={`project-${i}`}>
                <ProjectTeaser project={project.meta} href={project.path} />
              </FadeIn>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
