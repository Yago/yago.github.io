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
        tw="bg-blue-500 text-white rounded py-2 px-4"
      >
        -
      </button>
      <span tw="px-4 font-bold text-2xl">{count}</span>
      <button
        type="button"
        onClick={() => setCount(add(count, 1))}
        tw="bg-blue-500 text-white rounded py-2 px-4"
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
