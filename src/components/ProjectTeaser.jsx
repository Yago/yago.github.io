import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Picture from './content/Picture';

const ProjectTeaser = ({ project }) => (
  <Link to={project.frontmatter.path} className="project-teaser card">
    <div className="card-img-wrapper img-fluid">
      <Picture id={project.frontmatter.cover} />
    </div>
    <div className="card-body text-sans">
      <h3 className="h6">{project.frontmatter.title}</h3>
      <small className="card-text">{project.frontmatter.subtitle}</small>
    </div>
  </Link>
);

ProjectTeaser.propTypes = { project: PropTypes.object.isRequired };

export default ProjectTeaser;
