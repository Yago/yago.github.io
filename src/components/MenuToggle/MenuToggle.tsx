import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import { range } from 'ramda';
import tw from 'twin.macro';

type Props = {
  open?: boolean;
  onClick: () => void;
};

const MenuToggle = ({ open, onClick }: Props): JSX.Element => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tw="block h-5 cursor-pointer w-7 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none"
      css={open && tw`rotate-135`}
    >
      <span tw="sr-only">Toggle navigation</span>
      {range(0, 3).map(i => (
        <span
          key={`menu-toggle-span-${i}`}
          tw="block mx-auto bg-black w-7 transform duration-300 transition-transform"
          css={[
            open && i === 0 && tw`translate-y-3`,
            hover && i === 0 && tw`-translate-y-1`,
            open && i === 1 && tw`translate-y-1`,
            i === 2 && tw`mb-0`,
            hover && i === 2 && tw`translate-y-1`,
            open && i === 2 && tw`-translate-y-1 rotate-90`,
            { height: '3px', marginBottom: '5px' },
          ]}
        />
      ))}
    </button>
  );
};

MenuToggle.defaultProps = {
  open: false,
};

export default MenuToggle;
