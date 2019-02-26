import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import ProjectTeaser from '../components/ProjectTeaser';
import Icon from '../components/Icon';
import SEO from '../components/Seo';

const ProjectsPage = ({ data, location }) => {
  const projects = data.allMarkdownRemark.edges
    .filter(item => item.node.frontmatter.type === 'project')
    .map(item => item.node);

  return (
    <Layout location={location}>
      <SEO />

      <div className="container-fluid">
        <div className="ml-md-4">
          <h1>Projects</h1>

          <div className="row mt-3">
            {projects.map((project, i) => (
              <div className="col-md-4 mb-2" key={i}>
                <ProjectTeaser project={project} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 mb-2">
          <div className="separator">
            <Icon icon="drakar" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default ProjectsPage;

export const query = graphql`
  query AllProjects {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            subtitle
            type
            cover
          }
        }
      }
    }
  }
`;
