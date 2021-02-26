import React from 'react';
import { jsx } from '@emotion/react';
import { isNil } from 'ramda';
import tw from 'twin.macro';

import Icon from 'components/Icon';
import { IconNames } from 'components/Icons/Icons';

type Props = {
  icon?: IconNames;
  children?: React.ReactNode;
};

const Divider = ({ icon, children }: Props): JSX.Element => (
  <div tw="relative my-8">
    <div tw="absolute inset-0 flex items-center" aria-hidden="true">
      <div tw="w-full border-t border-gray-300" />
    </div>
    {!isNil(icon) && (
      <div tw="relative flex justify-center">
        <span tw="px-2 text-5xl text-gray-400 bg-white">
          <Icon name={icon} />
        </span>
      </div>
    )}
    {!isNil(children) && (
      <div tw="relative flex justify-start">
        <span tw="pr-2 text-sm text-gray-500 bg-white">{children}</span>
      </div>
    )}
  </div>
);

Divider.defaultProps = {};

export default Divider;
