import React from 'react';

import Icon from './Icon';
import socials from '../config/socials.json';

const Footer = () => (
  <footer className="footer pt-2 mb-2">
    <p className="lead">Let's keep in touch !</p>

    <p className="socials">
      {socials.map(social => (
        <a
          key={social.icon}
          href={social.url}
          className="link-grad text-sans text-sm mx-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={social.icon} />
          <span>
            {' '}
            {social.label}
          </span>
        </a>
      ))}
    </p>

    <p className="text-sans text-sm text-muted">
      ©Yann Gouffon, All Rights Reserved
      <br />
      <small className="text-xs">
        The
        {' '}
        <a
          href="https://github.com/Yago/yago.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="link-grad"
        >
          code of this website
        </a>
        {' '}
        is Open Source
      </small>
    </p>
  </footer>
);

export default Footer;
