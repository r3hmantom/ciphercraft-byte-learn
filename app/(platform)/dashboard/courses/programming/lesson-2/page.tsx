"use client";
import { useState } from 'react';
import IntroSlide from './_components/introSlide';
import Playground from './_components/playGround';
import Quiz from './_components/quiz';

export default function Lesson1Page() {
  const [slide, setSlide] = useState(1);

  return (
    <div>
      {slide === 1 && (
        <IntroSlide
          title="Understanding Functions"
          content="In programming, a function is a block of code designed to perform a specific task. Functions can take inputs, called parameters, and return an output. They help in organizing code, making it reusable and easier to manage."
        />
      )}
      {slide === 2 && (
        <Playground
          title="Interactive Function Playground"
          description="Experiment with the following interactive function examples. Adjust the inputs and see how the outputs change to better understand how functions work."
        />
      )}
      {slide === 3 && (
        <Quiz
          title="Function Quiz"
          questions={[
            {
              question: "What does a function in programming typically do?",
              options: [
                "Store data",
                "Perform a specific task",
                "Manage memory",
                "None of the above"
              ],
              answer: "Perform a specific task"
            },
            {
              question: "What are the inputs to a function called?",
              options: [
                "Outputs",
                "Parameters",
                "Variables",
                "Constants"
              ],
              answer: "Parameters"
            }
          ]}
        />
      )}

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
