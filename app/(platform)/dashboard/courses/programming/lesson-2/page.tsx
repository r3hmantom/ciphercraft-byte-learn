// "use client";
// import { useState } from 'react';
// import IntroSlide from './_components/introSlide';
// import Playground from './_components/playGround';
// // import Quiz from './_components/quiz';
// import Quiz from '../lesson-1/_components/quiz';

// export default function Lesson1Page() {
//   const [slide, setSlide] = useState(1);

//   type MCQ = {
//     question: string,
//     A: string,
//     B: string,
//     C: string,
//     D: string,
//     explanation: string,
//     correct: string
//   }
  
//     const mcqs: MCQ[] = [
//       {question: "What does a function in programming typically do?",
//         A: "Store Data",
//         B: "Perform a specific task",
//         C: "Manage memory",
//         D: "None of the above",
//         explanation: "Main purpose of a function is to perform a single task",
//         correct: "B"
//       },
//       {question: "What are the inputs to a function called?",
//         A: "Arguements",
//         B: "Parameters",
//         C: "Variables",
//         D: "Both A and B",
//         explanation: "arguements/parameters are variables you pass to a function",
//         correct: "D"
//       },
//     ]

//     const [completed, setcompleted] = useState<boolean>(false)

//   return (
//     <div>
//       {slide === 1 && (
//         <IntroSlide
//           title="Understanding Functions"
//           content="In programming, a function is a block of code designed to perform a specific task. Functions can take inputs, called parameters, and return an output. They help in organizing code, making it reusable and easier to manage."
//         />
//       )}
//       {slide === 2 && (
//         <Playground
//           title="Interactive Function Playground"
//           description="Experiment with the following interactive function examples. Adjust the inputs and see how the outputs change to better understand how functions work."
//         />
//       )}
//       {slide === 3 && <Quiz mcqs={mcqs} setC={setcompleted} />}


//       <div className="flex justify-center mt-4">
//         {slide > 1 && (
//           <button
//             onClick={() => setSlide(slide - 1)}
//             className="bg-gray-500 text-white p-2 m-2 rounded"
//           >
//             Back
//           </button>
//         )}
//         {slide < 3 && (
//           <button
//             onClick={() => setSlide(slide + 1)}
//             className="bg-blue-500 text-white p-2 m-2 rounded"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from 'react';
import IntroSlide from './_components/introSlide';
import Playground from './_components/playGround';
import Quiz from '@/app/(lessons)/_components/quiz';
import { MdNavigateNext } from 'react-icons/md';
import { createClient } from '@/supabase/client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';


export default function Lesson1Page() {

  const {user} = useUser()
  const supabase = createClient()

  async function nextlesson() {
    console.log("nextlesson")
    const updatedProgress = [
        {
          id: "1",
          progress: "50%"
        }
      ];
      
    const { error } = await supabase
        .from('Users')
        .update({progress: updatedProgress})
        .eq('id', user?.id)
    if(error) {
        console.log(error)
    }
    // router.push("/dashboard/courses")
    window.location.href = "/dashboard/courses"
}



  const [slide, setSlide] = useState(1);
  const [completed, setCompleted] = useState<boolean>(false);

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
    {
      question: "What does a function in programming typically do?",
      A: "Store Data",
      B: "Perform a specific task",
      C: "Manage memory",
      D: "None of the above",
      explanation: "Main purpose of a function is to perform a single task",
      correct: "B"
    },
    {
      question: "What are the inputs to a function called?",
      A: "Arguments",
      B: "Parameters",
      C: "Variables",
      D: "Both A and B",
      explanation: "arguments/parameters are variables you pass to a function",
      correct: "D"
    }
  ];

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
      {slide === 3 && (<Quiz mcqs={mcqs} setC={setCompleted} />)}

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

        {slide === 3 && (
        <div className="flex justify-end mt-5">
          <button 
            onClick={nextlesson} 
            disabled={!completed}
            className={`relative bottom-2 left-12 flex items-center border-[1px] rounded border-black hover:bg-neutral-200 w-fit p-2 ${
              !completed 
                ? "cursor-not-allowed hover:bg-transparent border-gray-500 text-gray-500"
                : ""
            }`}
          >
            <MdNavigateNext />
            Complete Lesson
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
