"use client"
import Sidebar from "@/app/(platform)/dashboard/_components/Sidebar"
import CodeSnippet from "../_components/codesnippet"
import Note from "../_components/note"
import Quiz from "../_components/quiz"
import { MdNavigateNext } from "react-icons/md";
import { useUser } from "@clerk/nextjs"
import { createClient } from "@/supabase/client"

type MCQ = {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    explanation: string,
    correct: string
}

export default function LessonOneLayout() {

    const supabase = createClient()
    const { user } = useUser()

    const mcqs = [
        {question: "what is a mcq", A: "a",B: "b",C: "c",D: "d",correct: "B", explanation: "this is right hehe"},
        {question: "what is a mcq2", A: "a2",B: "b2",C: "c2",D: "d2",correct: "B", explanation: "this is right hehe"},
        {question: "what is a mcq3", A: "a3",B: "b3",C: "c3",D: "d3",correct: "B", explanation: "this is right hehe"}
    ]

    async function nextlesson() {
        console.log("nextlesson")
        const updatedProgress = [
            {
              id: "1",
              progress: "45%"
            }
          ];
          
        const { error } = await supabase
            .from('Users')
            .update({progress: updatedProgress})
            .eq('id', user?.id)
        if(error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-center text-xl">Thinking in Code Lesson 1: Variables</h1>
            <h3 className="font-bold text-lg">What Are Variables?</h3>
            <p>Variables are fundamental elements in programming used to store data values. They act as containers that hold information which can be referenced and manipulated throughout your code.</p>
            <div className="flex">
                <CodeSnippet>let x = 5;</CodeSnippet>
                <Note>now program stored a variable named "x" and it has 5 inside it.</Note>
            </div>
            <h3 className="font-bold text-lg">What types of data can I store?</h3>
            <p className="font-semibold">Numbers: </p>
            <p>int represents integer values without decimal points, while float represents numbers with decimal points for more precision.</p>
            <h1 className="font-extrabold text-center text-xl">Quiz: </h1>
            <Quiz mcqs={mcqs}/>
            <button onClick={nextlesson}><div className="flex items-center border-[1px] ml-auto mt-5 rounded border-black hover:bg-neutral-200 w-fit p-2"><MdNavigateNext/>Next Lesson </div></button>
        </div>
    )
} 