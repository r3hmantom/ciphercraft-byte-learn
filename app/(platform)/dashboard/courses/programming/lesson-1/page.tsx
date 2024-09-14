// "use client"
// import { useState } from 'react';
// import IntroSlide from './_components/introSlide';
// import Playground from './_components/playGround';
// import Quiz from '@/app/(lessons)/_components/quiz';
// import { MdNavigateNext } from 'react-icons/md';
// import { useUser } from '@clerk/nextjs';
// import { createClient } from '@/supabase/client';

// export default function Lessson1Page() {

//   const {user} = useUser()
//   const supabase = createClient()

//   async function nextlesson() {
//     console.log("nextlesson")
//     const updatedProgress = [
//         {
//           id: "1",
//           progress: "25%"
//         }
//       ];
      
//     const { error } = await supabase
//         .from('Users')
//         .update({progress: updatedProgress})
//         .eq('id', user?.id)
//     if(error) {
//         console.log(error)
//     }
// }

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
//       {question: "If x = 10 and y = x + 5, what is the value of y?",
//         A: "20",
//         B: "105",
//         C: "15",
//         D: "5",
//         explanation: "x has 10, y has x + 5. Meaning 10 + 5(after putting x's value)",
//         correct: "C"
//       }
//     ]

//     const [completed, setcompleted] = useState<boolean>(false)

//   return (
//     <div>
//       {slide === 1 && <IntroSlide />}
//       {slide === 2 && <Playground />}
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
//       {slide === 3 && <button onClick={nextlesson} disabled={!completed}><div className={`flex items-center border-[1px] ml-auto mt-5 rounded border-black hover:bg-neutral-200 w-fit p-2 ${!completed? "cursor-not-allowed hover:bg-transparent border-gray-500 text-gray-500":""}`}><MdNavigateNext/>Next Lesson </div></button>
//     }
//     </div>
//   );
// }


"use client"
import { useState } from 'react';
import IntroSlide from './_components/introSlide';
import Playground from './_components/playGround';
import Quiz from '@/app/(lessons)/_components/quiz';
import { MdNavigateNext } from 'react-icons/md';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/supabase/client';
import { Navigation } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Lesson1Page() {
  const { user } = useUser()
  const supabase = createClient()

  async function nextlesson() {
    console.log("nextlesson")
    const updatedProgress = [
      {
        id: "1",
        progress: "25%"
      },
    ];
    
    const { error } = await supabase
      .from('Users')
      .update({ progress: updatedProgress })
      .eq('id', user?.id)
    if (error) {
      console.log(error)
    }
    // router.push("/dashboard/courses/programming/lesson-2")
    window.location.href = "/dashboard/courses/programming/lesson-2"
  }

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
    {
      question: "If x = 10 and y = x + 5, what is the value of y?",
      A: "20",
      B: "105",
      C: "15",
      D: "5",
      explanation: "x has 10, y has x + 5. Meaning 10 + 5(after putting x's value)",
      correct: "C"
    }
  ]

  const [completed, setCompleted] = useState<boolean>(false)

  return (
    <div>
      {slide === 1 && <IntroSlide />}
      {slide === 2 && <Playground />}
      {slide === 3 && <Quiz mcqs={mcqs} setC={setCompleted} />}

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

      {slide === 3 && (
        <div className="flex justify-end mt-5">
          <button 
            onClick={nextlesson} 
            disabled={!completed}
            className={`relative bottom-16 left-1 flex items-center border-[1px] rounded border-black hover:bg-neutral-200 w-fit p-2 ${
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
  );
}