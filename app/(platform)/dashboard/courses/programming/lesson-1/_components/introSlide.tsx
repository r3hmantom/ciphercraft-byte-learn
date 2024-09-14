import { motion } from 'framer-motion';
import React from 'react';

const IntroSlide = () => {
  return (
    <div className="flex flex-col items-center justify-center"  >
      <h1 className="text-4xl font-bold mb-4">What are Variables?</h1>
      <div className="bg-yellow-400 p-4 rounded-xl" >
        <p>Variables are containers for storing data values.</p>
      </div>
    </div>
  );
};

export default IntroSlide;
