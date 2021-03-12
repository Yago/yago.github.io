import React from 'react';
import Tilt from 'react-parallax-tilt';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import tw from 'twin.macro';

import Picture from 'components/Picture';
import { ProjectProps } from 'components/Project/Project';

type Props = {
  project: ProjectProps['meta'];
  href: string;
};

const ProjectTeaser = ({ project, href }: Props): JSX.Element => (
  <Link href={href} passHref>
    <a className="link-wrapper">
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        perspective={500}
        css={{ transformStyle: 'preserve-3d' }}
      >
        <div tw="mb-4">
          <Picture filename={project.thumbnail} alt="Picture of the author" />
        </div>
        <div css={{ transform: 'translateZ(20px) translateX(5px)' }}>
          <h3 tw="text-lg font-medium md:text-2xl" className="link-inner">
            {project.title}
          </h3>
          <p tw="md:mt-2 md:text-xl">{project.subtitle}</p>
        </div>
      </Tilt>
    </a>
  </Link>
);

export default ProjectTeaser;
