import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import styles from './modal.module.scss';

interface IProps {
  handleClose: () => void;
  children: React.ReactNode;
}

const modalAnimation = {
  hidden: {
    opacity: 0,
    scale: 1.5,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

function Modal({ handleClose, children }: IProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      onClick={handleClose}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
