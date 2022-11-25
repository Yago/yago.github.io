import React from 'react';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { PostProps } from 'components/Post/Post';

import styles from './PostTeaser.module.css';

type Props = {
  post: PostProps['meta'];
  href: string;
};

const PostTeaser = ({ post, href }: Props): JSX.Element => (
  <Link href={href} className={clsx('link-wrapper', styles.default)}>
    <div className="flex items-baseline">
      <h3 className="text-xl font-medium md:text-3xl link-inner">
        {post.title}
      </h3>
      <span className="pl-2 opacity-50 md:text-lg duration-200 transition-opacity">
        — {format(parseISO(post.date), 'PPP')}
      </span>
    </div>
    <p className="mt-2 font-serif text-lg opacity-50 md:text-2xl duration-200 transition-opacity leading-7 md:leading-9">
      {post.description}
    </p>
  </Link>
);

export default PostTeaser;
