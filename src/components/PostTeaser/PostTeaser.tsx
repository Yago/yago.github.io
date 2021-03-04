import React from 'react';
import { jsx } from '@emotion/react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import tw from 'twin.macro';

import { PostProps } from 'components/Post/Post';

import styles from './PostTeaser.styles';

type Props = {
  post: PostProps['meta'];
  href: string;
};

const PostTeaser = ({ post, href }: Props): JSX.Element => (
  <Link href={href} passHref>
    <a className="link-wrapper" css={styles}>
      <div tw="flex items-baseline">
        <h3 tw="text-xl font-medium md:text-3xl" className="link-inner">
          {post.title}
        </h3>
        <span tw="pl-2 opacity-50 md:text-lg duration-200 transition-opacity">
          — {format(parseISO(post.date), 'PPP')}
        </span>
      </div>
      <p tw="mt-2 font-serif text-lg opacity-50 md:text-2xl duration-200 transition-opacity leading-7 md:leading-9">
        {post.description}
      </p>
    </a>
  </Link>
);

PostTeaser.defaultProps = {};

export default PostTeaser;
