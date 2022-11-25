import React from 'react';
import Tilt from 'react-parallax-tilt';
import clsx from 'clsx';
import Link from 'next/link';

import Picture from 'components/Picture';
import { ProjectProps } from 'components/Project/Project';

type Props = {
  project: ProjectProps['meta'];
  href: string;
};

const ProjectTeaser = ({ project, href }: Props): JSX.Element => (
  <Link href={href} className="link-wrapper">
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={500}
      className={clsx({ transformStyle: 'preserve-3d' })}
    >
      <div className="mb-4">
        <Picture filename={project.thumbnail} alt="Picture of the author" />
      </div>
      <div className={clsx({ transform: 'translateZ(20px) translateX(5px)' })}>
        <h3 className="text-lg font-medium md:text-2xl link-inner">
          {project.title}
        </h3>
        <p className="md:mt-2 md:text-xl">{project.subtitle}</p>
      </div>
    </Tilt>
  </Link>
);

export default ProjectTeaser;
