import React from 'react';
import { jsx } from '@emotion/react';
import { motion } from 'framer-motion';
import tw from 'twin.macro';

type Props = {
  move?: boolean;
  delay?: number;
  children: React.ReactNode | React.ReactNodeArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
};

const isServer = () => typeof window === 'undefined';

const FadeInChildren = ({
  move = true,
  delay = 0,
  children,
  ...props
}: Props): JSX.Element => (
  <motion.div
    initial="hidden"
    variants={{
      visible: { opacity: 1, y: 0 },
      hidden: {
        opacity: isServer() ? 1 : 0,
        // eslint-disable-next-line no-nested-ternary
        y: move ? (isServer() ? 0 : 20) : 0,
      },
    }}
    transition={{ delay, duration: 0.4 }}
    {...props}
  >
    {children}
  </motion.div>
);

export default FadeInChildren;
