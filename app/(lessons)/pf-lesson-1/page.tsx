import Sidebar from "@/app/(platform)/dashboard/_components/Sidebar"
import CodeSnippet from "../_components/codesnippet"
import Note from "../_components/note"

type MCQ = {
    question: string,
    A: string,
    B: string,
    C: string,
    D: string,
    correct: string
}

export default function LessonOneLayout() {


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

        </div>
    )
} 