import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Icon from './Icon';

const Breadcrumb = ({ location }) => {
  const steps = location.pathname.split('/');
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {steps.map((step, i) => {
          if (i === steps.length - 1) {
            return (
              <li key={i} className="breadcrumb-item active" aria-current="page">
                {step.replace(/-/g, ' ')}
              </li>
            );
          }
          const url = steps.slice(0, i + 1).join('/');
          return (
            <li key={i} className="breadcrumb-item">
              <Link to={`${url}`}>{step === '' ? <Icon icon="tipi" /> : step}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = { location: PropTypes.object.isRequired };

export default Breadcrumb;
