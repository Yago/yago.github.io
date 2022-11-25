import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { range } from 'ramda';

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
      className={clsx(
        'block h-5 cursor-pointer w-7 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none',
        menuOpen && 'rotate-135'
      )}
    >
      <span className="sr-only">Toggle navigation</span>
      {range(0, 3).map(i => (
        <span
          key={`menu-toggle-span-${i}`}
          className={clsx(
            'block mx-auto bg-black w-7 transform duration-300 transition-transform',
            menuOpen && i === 0 && 'translate-y-3',
            hover && !menuOpen && i === 0 && '-translate-y-1',
            menuOpen && i === 1 && 'translate-y-1',
            i === 2 && 'mb-0',
            hover && i === 2 && 'translate-y-1',
            menuOpen && i === 2 && '-translate-y-1 rotate-90',
            { height: '3px', marginBottom: '5px' }
          )}
        />
      ))}
    </button>
  );
};

export default MenuToggle;
