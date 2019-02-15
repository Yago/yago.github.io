import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Icon from './Icon';
import socials from '../config/socials.json';

const Footer = () => (
  <footer className="footer pt-2 mb-2">
    <p className="lead">Let's keep in touch !</p>

    <p>
      {socials.map(social => (
        <a href={social.url} className="link-primary text-sans text-sm mx-1" target="_blank">
          <Icon icon={social.icon} />
          {social.label}
        </a>
      ))}
    </p>

    <p className="text-sans text-sm text-muted">©Yann Gouffon, All Rights Reserved</p>
  </footer>
);

export default Footer;
