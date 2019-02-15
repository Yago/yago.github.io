import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (
  <span className={`icon icon-${icon}`} aria-hidden="true">
    <svg dangerouslySetInnerHTML={{ __html: `<use xlink:href="${`#icon-${icon}`}" />` }} />
  </span>
);

Icon.defaultProps = { icon: 'react' };
Icon.propTypes = { icon: PropTypes.string };
export default Icon;
