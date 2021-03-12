import React, { useContext, useState } from 'react';
import { jsx } from '@emotion/react';
import { range } from 'ramda';
import tw from 'twin.macro';

import { AppContext } from 'contexts/AppProvider';

const MenuToggle = (): JSX.Element => {
  const [hover, setHover] = useState(false);
  const { menuOpen, setMenuOpen } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tw="block h-5 cursor-pointer w-7 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none"
      css={menuOpen && tw`rotate-135`}
    >
      <span tw="sr-only">Toggle navigation</span>
      {range(0, 3).map(i => (
        <span
          key={`menu-toggle-span-${i}`}
          tw="block mx-auto bg-black w-7 transform duration-300 transition-transform"
          css={[
            menuOpen && i === 0 && tw`translate-y-3`,
            hover && !menuOpen && i === 0 && tw`-translate-y-1`,
            menuOpen && i === 1 && tw`translate-y-1`,
            i === 2 && tw`mb-0`,
            hover && i === 2 && tw`translate-y-1`,
            menuOpen && i === 2 && tw`-translate-y-1 rotate-90`,
            { height: '3px', marginBottom: '5px' },
          ]}
        />
      ))}
    </button>
  );
};

export default MenuToggle;
