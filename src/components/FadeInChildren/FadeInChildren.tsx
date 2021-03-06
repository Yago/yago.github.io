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

const FadeInChildren = ({
  move,
  delay,
  children,
  ...props
}: Props): JSX.Element => (
  <motion.div
    initial="hidden"
    variants={{
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: move ? 20 : 0 },
    }}
    transition={{ delay, duration: 0.4 }}
    {...props}
  >
    {children}
  </motion.div>
);

FadeInChildren.defaultProps = {
  move: true,
  delay: 0,
};

export default FadeInChildren;
