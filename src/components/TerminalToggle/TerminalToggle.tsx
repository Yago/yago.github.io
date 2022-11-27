import React, { useContext, useState } from 'react';
import clsx from 'clsx';

import { AppContext } from 'contexts/AppProvider';

const TerminalToggle = (): JSX.Element => {
  const [hover, setHover] = useState(false);
  const { terminalOpen, setTerminalOpen } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={() => setTerminalOpen(!terminalOpen)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block h-5 cursor-pointer w-9 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none"
    >
      <span className="sr-only">Toggle terminal</span>
      <span
        className={clsx(
          'block w-3 h-3 border-black mt-0.5 -ml-0.5 border-r-3 border-b-3 transform -rotate-45 duration-300 transition-transform',
          hover && '-translate-x-2',
          terminalOpen && 'rotate-135 translate-x-7'
        )}
      />
      <span
        className={clsx(
          'block w-4 mx-auto bg-black mt-0.5 duration-300 transition-transform transform h-[3px]',
          hover && 'translate-y-1'
        )}
      />
    </button>
  );
};

export default TerminalToggle;
