import React, { useEffect, useRef } from 'react';
import { SandpackConsole, useActiveCode } from '@codesandbox/sandpack-react';

const Console = (): JSX.Element => {
  const ref = useRef(null);
  const { code } = useActiveCode();

  useEffect(() => {
    if (ref.current !== null) {
      const resetButton = (ref.current as HTMLElement).querySelector(
        '.sp-button'
      ) as HTMLElement;
      if (resetButton !== null) resetButton.click();
    }
  }, [code]);

  return (
    <div ref={ref}>
      <SandpackConsole />
    </div>
  );
};

export default Console;
