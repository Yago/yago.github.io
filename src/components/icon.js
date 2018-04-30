import React, { Component } from 'react';

const Icon = ({ slug }) => (
  <span className={`icon icon-${slug || 'drakar'}`} aria-hidden="true">
    <svg dangerouslySetInnerHTML={{ __html: `<use xlink:href="${`#icon-${slug || 'drakar'}`}" />` }} />
  </span>
)

export default Icon;
