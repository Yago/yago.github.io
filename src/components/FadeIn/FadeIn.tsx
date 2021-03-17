import React, { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { jsx } from '@emotion/react';
import { motion, useAnimation } from 'framer-motion';
import tw from 'twin.macro';

import { AppContext } from 'contexts/AppProvider';

type Props = {
  move?: boolean;
  delay?: number;
  children: React.ReactNode | React.ReactNodeArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
};

const FadeIn = ({
  move = true,
  delay = 0,
  children,
  ...props
}: Props): JSX.Element => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { closing } = useContext(AppContext);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  if (typeof window === 'undefined') return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: move ? 20 : 0 },
      }}
      transition={{
        delay: closing ? 0.7 + delay : 0 + delay,
        duration: 0.4,
        staggerChildren: closing ? 1 : 0.2,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
