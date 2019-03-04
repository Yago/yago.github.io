import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Tilt from 'react-tilt';

import Image from './content/Image';

const ProjectTeaser = ({ project }) => (
  <Tilt className="Tilt" options={{ max: 6, scale: 1 }} style={{ transformStyle: 'preserve-3d' }}>
    <Link to={project.frontmatter.path} className="project-teaser card">
      <div className="card-img-wrapper img-fluid">
        <Image src={project.frontmatter.cover} />
      </div>
      <div className="card-body text-sans">
        <h3 className="h6 link-grad-inner">{project.frontmatter.title}</h3>
        <br />
        <small className="card-text">{project.frontmatter.subtitle}</small>
      </div>
    </Link>
  </Tilt>
);

ProjectTeaser.propTypes = { project: PropTypes.object.isRequired };

export default ProjectTeaser;
