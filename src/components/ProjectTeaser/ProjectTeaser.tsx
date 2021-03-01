import React from 'react';
import Tilt from 'react-parallax-tilt';
import { jsx } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import tw from 'twin.macro';

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
        <div tw="w-full mb-4 aspect-w-8 aspect-h-5">
          <Image
            src={`/images/projects/${project.thumbnail}`}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div css={{ transform: 'translateZ(20px) translateX(5px)' }}>
          <h3 tw="text-2xl font-medium" className="link-inner">
            {project.title}
          </h3>
          <p tw="mt-2 text-xl">{project.subtitle}</p>
        </div>
      </Tilt>
    </a>
  </Link>
);

ProjectTeaser.defaultProps = {};

export default ProjectTeaser;
