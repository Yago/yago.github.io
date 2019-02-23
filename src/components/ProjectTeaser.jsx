import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Tilt from 'react-tilt';

import Picture from './content/Picture';

const ProjectTeaser = ({ project }) => (
  <Tilt
    className="Tilt"
    options={{ max: 15, scale: 1.02 }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <Link to={project.frontmatter.path} className="project-teaser card">
      <div className="card-img-wrapper img-fluid">
        <Picture id={project.frontmatter.cover} ratio="1.6" />
      </div>
      <div className="card-body text-sans">
        <h3 className="h6">{project.frontmatter.title}</h3>
        <small className="card-text">{project.frontmatter.subtitle}</small>
      </div>
    </Link>
  </Tilt>
);

ProjectTeaser.propTypes = { project: PropTypes.object.isRequired };

export default ProjectTeaser;
