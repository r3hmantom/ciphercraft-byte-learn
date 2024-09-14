import { motion } from 'framer-motion';
import React from 'react';

const IntroSlide = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">What are Variables?</h1>
      <motion.div
        className="bg-yellow-400 p-4 rounded-xl"
        animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <p>Variables are containers for storing data values.</p>
      </motion.div>
    </motion.div>
  );
};

export default IntroSlide;
