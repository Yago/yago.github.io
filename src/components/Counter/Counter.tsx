import React, { useState } from 'react';
import { jsx } from '@emotion/react';
import tw from 'twin.macro';

import { add, subtract } from 'utils';

export type CounterProps = {
  count: number;
};

const Counter = ({ count: defaultCount }: CounterProps): JSX.Element => {
  const [count, setCount] = useState(defaultCount);

  return (
    <div id="counter" tw="flex items-center justify-center w-full h-screen">
      <button
        type="button"
        onClick={() => setCount(subtract(count, 1))}
        tw="px-4 py-2 text-white rounded bg-blue"
      >
        -
      </button>
      <span tw="px-4 text-2xl font-bold">{count}</span>
      <button
        type="button"
        onClick={() => setCount(add(count, 1))}
        tw="px-4 py-2 text-white rounded bg-blue"
      >
        +
      </button>
    </div>
  );
};

Counter.defaultProps = {
  count: 0,
};

export default Counter;
