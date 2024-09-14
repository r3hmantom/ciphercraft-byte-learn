"use client"
import { useState } from 'react';
import IntroSlide from './_components/introSlide';
import Playground from './_components/playGround';
import Quiz from './_components/quiz';

export default function Lessson1Page() {
  const [slide, setSlide] = useState(1);

  return (
    <div>
      {slide === 1 && <IntroSlide />}
      {slide === 2 && <Playground />}
      {slide === 3 && <Quiz />}

      <div className="flex justify-center mt-4">
        {slide > 1 && (
          <button
            onClick={() => setSlide(slide - 1)}
            className="bg-gray-500 text-white p-2 m-2 rounded"
          >
            Back
          </button>
        )}
        {slide < 3 && (
          <button
            onClick={() => setSlide(slide + 1)}
            className="bg-blue-500 text-white p-2 m-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
