import React from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import Icon from 'components/Icon';

type Props = {
  crumbs: {
    href?: string;
    label: string;
  }[];
};

const Breadcrumb = ({ crumbs }: Props): JSX.Element => (
  <nav aria-label="breadcrumb" tw="mb-6 transform md:translate-x-1 md:mb-0">
    <ol tw="inline-flex text-sm text-gray-900 lowercase md:text-lg opacity-60 hover:opacity-100 duration-500 transition-opacity transform md:-translate-x-full md:translate-y-2 md:-rotate-90 md:origin-right">
      <li>
        <Link href="/" passHref>
          <a className="link">
            <span tw="sr-only">Homepage</span>
            <Icon name="tipi" tw="text-base md:text-lg" />
          </a>
        </Link>
      </li>
      {crumbs.map(({ href, label }, i) =>
        !isNil(href) ? (
          <li key={`crumb-${i}`}>
            <span tw="px-3" aria-hidden>
              ·
            </span>
            <Link href={href} passHref>
              <a className="link">{label}</a>
            </Link>
          </li>
        ) : (
          <li key={`crumb-${i}`} aria-current="page">
            <span tw="px-3" aria-hidden>
              ·
            </span>
            {label}
          </li>
        )
      )}
    </ol>
  </nav>
);

Breadcrumb.defaultProps = {};

export default Breadcrumb;
