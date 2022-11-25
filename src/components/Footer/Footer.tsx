import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Divider from 'components/Divider';
import Icon from 'components/Icon';
import { IconNames } from 'components/Icons/Icons';

const socials = [
  {
    label: 'Github',
    icon: 'github',
    url: 'https://github.com/yago/',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/yago_0/',
  },
  {
    label: '500px',
    icon: 'px500',
    url: 'https://500px.com/YannGouffon',
  },
  {
    label: 'Twitter',
    icon: 'twitter',
    url: 'https://twitter.com/Yago_0',
  },
  {
    label: 'Email',
    icon: 'email',
    url: 'mailto:hello@yago.io',
  },
];

const Footer = (): JSX.Element => {
  const { asPath } = useRouter();

  return (
    <>
      <div
        className={clsx(
          asPath.includes('/blog/') &&
            'w-full mx-auto mt-20 sm:w-10/12 xl:w-7/12 md:px-8'
        )}
      >
        <Divider icon="drakar" />
      </div>
      <footer className="mb-20 text-center ">
        <p className="mt-20 font-serif text-xl md:text-2xl">
          Let's keep in touch !
        </p>

        <div className="flex flex-wrap items-center justify-center mt-8 space-x-12">
          {socials.map(social => (
            <a
              key={social.icon}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 md:text-lg text-blue whitespace-nowrap link"
            >
              <Icon
                name={social.icon as IconNames}
                className="mr-1 text-lg text-gray-900"
              />
              <span> {social.label}</span>
            </a>
          ))}
        </div>

        <p className="mt-2 text-gray-600 md:text-lg">
          ©Yann Gouffon, All Rights Reserved
          <br />
          <small className="text-sm">
            The{' '}
            <a
              href="https://github.com/Yago/yago.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-blue"
            >
              code of this website
            </a>{' '}
            is Open Source
          </small>
        </p>
      </footer>
    </>
  );
};

export default Footer;
