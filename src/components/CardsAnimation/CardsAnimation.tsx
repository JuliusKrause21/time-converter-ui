import { AnimationControls, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface CardsAnimationProps {
  children: ReactNode;
  controls: AnimationControls;
}

const CardsAnimation: FC<CardsAnimationProps> = ({ children, controls }) => {
  return (
    <motion.div
      style={{ width: '100%', display: 'flex' }}
      animate={controls}
      transition={{ times: [0, 0.5, 1], duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export default CardsAnimation;
