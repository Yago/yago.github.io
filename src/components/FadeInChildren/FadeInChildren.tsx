import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  move?: boolean;
  delay?: number;
  children: React.ReactNode | React.ReactNodeArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
};

const FadeInChildren = ({
  move = true,
  delay = 0,
  children,
  ...props
}: Props): JSX.Element => (
  <motion.div
    initial="hidden"
    className="fade-in"
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

export default FadeInChildren;
