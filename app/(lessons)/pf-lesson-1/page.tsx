"use client"
import Sidebar from "@/app/(platform)/dashboard/_components/Sidebar"
import CodeSnippet from "../_components/codesnippet"
import Note from "../_components/note"
import Quiz from "../_components/quiz"
import { MdNavigateNext } from "react-icons/md";
import { useUser } from "@clerk/nextjs"
import { createClient } from "@/supabase/client"
import { AwaitedReactNode, FormEvent, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { div } from "framer-motion/client"
import { format } from 'date-fns'
import { IoSend } from "react-icons/io5";

type MCQ = {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    explanation: string,
    correct: string
}

type comment = {
    firstname: string
    content: string
}

export default function LessonOneLayout() {

    const supabase = createClient()
    const { user } = useUser()
    const [completed, setcompleted] = useState<boolean>(false)
    const [comments, setComments] = useState<any>([]);
    const [value, setValue] = useState<string>("")

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

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase
                .from('comments')
                .select()
                .eq('course', 1)
                .eq('lesson', 1);
    
            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                const commentsWithUsernames = await Promise.all(data.map(async (comment) => {
                    const { data: userData, error: userError } = await supabase
                        .from('Users')
                        .select('fullname')
                        .eq('id', comment.user_id)
                        .single()
    
                    if (userError) {
                        console.error('Error fetching user data:', userError);
                    }
    
                    return { ...comment, name: userData?.fullname || 'Student' };
                }));
    
                setComments(commentsWithUsernames);
            }
        })();
    }, []);

    async function addcomment(e: any) {
        e.preventDefault()
        console.log("addedcomment")
        const newComment = [
            {
              course: 1,
              lesson: 1,
              user_id: user?.id,
              comment: value
            }
          ];
          
        const { error } = await supabase
            .from('comments')
            .insert(newComment)
        if(error) {
            console.log(error)
        }
        setValue("")
    }
    
    const cmntmarkup = comments.map((cmnt: any) => {
        return (
            <div key={cmnt.id} className="my-2 bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{cmnt.name}</h3>
                    <span className="text-sm text-gray-500">
                        {format(new Date(cmnt.created_at), 'MMM d, yyyy h:mm a')}
                    </span>
                </div>
                <p className="text-gray-700">{cmnt.comment}</p>
            </div>
        )   
    })

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
            <Quiz mcqs={mcqs} setC={setcompleted}/>
            <button onClick={nextlesson} disabled={!completed}><div className={`flex items-center border-[1px] ml-auto mt-5 rounded border-black hover:bg-neutral-200 w-fit p-2 ${!completed? "cursor-not-allowed hover:bg-transparent border-gray-500 text-gray-500":""}`}><MdNavigateNext/>Next Lesson </div></button>
            <div className="mt-5">
                <h1 className="font-extrabold text-center text-xl">Questions:</h1>
                <form onSubmit={addcomment} className=" my-2 flex gap-2 items-center bg-white shadow-md rounded-lg p-4 mb-4">
                    <label className="whitespace-nowrap">Enter a Comment: </label>
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" className="rounded p-2 w-full" />
                    <button type="submit"><IoSend className="size-5"/></button>
                </form>
                {cmntmarkup}
            </div>
        </div>
    )
} 