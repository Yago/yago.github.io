import React from 'react';
import { isNil } from 'ramda';

import Icon from 'components/Icon';
import { IconNames } from 'components/Icons/Icons';

type Props = {
  icon?: IconNames;
  children?: React.ReactNode;
};

const Divider = ({ icon, children }: Props): JSX.Element => (
  <div className="relative my-8">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    {!isNil(icon) && (
      <div className="relative flex justify-center">
        <span className="px-2 text-5xl text-gray-400 bg-white">
          <Icon name={icon} />
        </span>
      </div>
    )}
    {!isNil(children) && (
      <div className="relative flex justify-start">
        <span className="pr-2 text-sm text-gray-500 bg-white">{children}</span>
      </div>
    )}
  </div>
);

export default Divider;
