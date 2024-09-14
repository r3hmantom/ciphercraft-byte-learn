"use client"
import { useState } from 'react';
import IntroSlide from './_components/introSlide';
import Playground from './_components/playGround';
import Quiz from '@/app/(lessons)/_components/quiz';

export default function Lessson1Page() {
  const [slide, setSlide] = useState(1);

  type MCQ = {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    explanation: string,
    correct: string
  }
  
    const mcqs: MCQ[] = [
      {question: "If x = 10 and y = x + 5, what is the value of y?",
        A: "20",
        B: "105",
        C: "15",
        D: "5",
        explanation: "x has 10, y has x + 5. Meaning 10 + 5(after putting x's value)",
        correct: "C"
      }
    ]

    const [completed, setcompleted] = useState<boolean>(false)

  return (
    <div>
      {slide === 1 && <IntroSlide />}
      {slide === 2 && <Playground />}
      {slide === 3 && <Quiz mcqs={mcqs} setC={setcompleted} />}

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
