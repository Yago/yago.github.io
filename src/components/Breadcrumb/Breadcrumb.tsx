import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { isNil } from 'ramda';

import Icon from 'components/Icon';

type Props = {
  crumbs: {
    href?: string;
    label: string;
  }[];
};

const Breadcrumb = ({ crumbs }: Props): JSX.Element => (
  <nav
    aria-label="breadcrumb"
    className="mb-6 transform md:translate-x-1 md:mb-0"
  >
    <ol className="inline-flex text-sm text-gray-600 lowercase md:text-lg opacity-60 hover:opacity-100 duration-500 transition-opacity transform md:-translate-x-full md:translate-y-2 md:-rotate-90 md:origin-right">
      <li>
        <Link href="/" className="link">
          <span className="sr-only">Homepage</span>
          <Icon name="tipi" className="text-base md:text-lg" />
        </Link>
      </li>
      {crumbs.map(({ href, label }, i) =>
        !isNil(href) ? (
          <li key={`crumb-${i}`}>
            <span className="px-3" aria-hidden>
              ·
            </span>
            <Link href={href} className="link">
              {label}
            </Link>
          </li>
        ) : (
          <li key={`crumb-${i}`} aria-current="page">
            <span className="px-3" aria-hidden>
              ·
            </span>
            <span className={clsx('inline-block truncate', { maxWidth: 250 })}>
              {label}
            </span>
          </li>
        )
      )}
    </ol>
  </nav>
);

export default Breadcrumb;
