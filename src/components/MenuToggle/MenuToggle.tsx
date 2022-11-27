import React, { useContext } from 'react';
import clsx from 'clsx';
import { range } from 'ramda';

import { AppContext } from 'contexts/AppProvider';

const MenuToggle = (): JSX.Element => {
  const { menuOpen, setMenuOpen } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      className={clsx(
        'block h-5 cursor-pointer w-7 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none group',
        menuOpen && 'rotate-135'
      )}
    >
      <span className="sr-only">Toggle navigation</span>
      {range(0, 3).map(i => (
        <span
          key={`menu-toggle-span-${i}`}
          className={clsx(
            'block mx-auto bg-black w-7 transform duration-300 transition-transform h-[3px] mb-[5px]',
            menuOpen && i === 0 && 'translate-y-3',
            !menuOpen && i === 0 && 'group-hover:-translate-y-1',
            menuOpen && i === 1 && 'translate-y-1',
            i === 2 && 'mb-0',
            !menuOpen && i === 2 && 'group-hover:translate-y-1',
            menuOpen && i === 2 && '-translate-y-1 rotate-90'
          )}
        />
      ))}
    </button>
  );
};

export default MenuToggle;
