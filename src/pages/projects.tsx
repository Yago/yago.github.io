import React, { useContext } from 'react';
import { isNil } from 'ramda';

import Breadcrumb from 'components/Breadcrumb';
import FadeIn from 'components/FadeIn';
import Layout from 'components/Layout';
import ProjectTeaser from 'components/ProjectTeaser';
import SEO from 'components/SEO';
import { AppContext } from 'contexts/AppProvider';

const Projects = (): JSX.Element => {
  const { tree } = useContext(AppContext);
  const projects = tree.filter(i => i.path.includes('/projects/'));

  return (
    <Layout>
      <SEO title="Projects" />
      <Breadcrumb crumbs={[{ label: 'Projects' }]} />
      <div className="mb-24 md:pl-20">
        <FadeIn move={false}>
          <h1 className="mt-6 text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            Projects
          </h1>
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12">
          {projects
            .sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
            .filter(i => isNil(i.meta.published) || i.meta.published)
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
