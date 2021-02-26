import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

type Props = {
  open?: boolean;
  onClick: () => void;
};

const TerminalToggle = ({ open, onClick }: Props): JSX.Element => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tw="block h-5 cursor-pointer w-9 transform scale-75 md:scale-100 duration-300 transition-transform focus:outline-none"
    >
      <span tw="sr-only">Toggle navigation</span>
      <span
        tw="block w-3 h-3 border-black mt-0.5 -ml-0.5 border-r-3 border-b-3 transform -rotate-45 duration-300 transition-transform"
        css={[
          hover && tw`-translate-x-2`,
          open && tw`rotate-135 translate-x-7`,
        ]}
      />
      <span
        tw="block w-4 mx-auto bg-black mt-0.5 duration-300 transition-transform transform"
        css={[{ height: '3px' }, hover && tw`translate-y-1`]}
      />
    </button>
  );
};

TerminalToggle.defaultProps = {
  open: false,
};

export default TerminalToggle;
