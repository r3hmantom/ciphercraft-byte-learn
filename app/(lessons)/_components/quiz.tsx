"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoIosRadioButtonOff } from "react-icons/io";
import { IoRadioButtonOn } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

type MCQ = {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  explanation: string;
  correct: string;
};


const _mcqs: MCQ[] = [
  {
    question: "What is the main purpose of a variable in programming?",
    A: "To store data",
    B: "To perform calculations",
    C: "To display information",
    D: "To write comments",
    explanation: "Variables are used to store data that can be used and manipulated throughout the program.",
    correct: "A"
  },
  {
    question: "Which of the following is a correct way to declare a variable in JavaScript?",
    A: "let x = 10;",
    B: "var x: 10;",
    C: "int x = 10;",
    D: "declare x 10;",
    explanation: "`let` and `var` are both valid ways to declare a variable in JavaScript. The correct syntax is `let x = 10;`.",
    correct: "A"
  },
  {
    question: "Which of the following is a valid variable name in JavaScript?",
    A: "1variable",
    B: "var_name",
    C: "let",
    D: "function",
    explanation: "Variable names in JavaScript can't start with a number, and reserved keywords like `let` and `function` can't be used as variable names.",
    correct: "B"
  },
  {
    question: "What type of value does the following JavaScript variable hold? `let isActive = true;`",
    A: "Number",
    B: "String",
    C: "Boolean",
    D: "Array",
    explanation: "`true` is a Boolean value, which represents either `true` or `false`.",
    correct: "C"
  },
  {
    question: "What keyword is used to define a constant variable in JavaScript?",
    A: "let",
    B: "var",
    C: "const",
    D: "constant",
    explanation: "`const` is used to declare variables that cannot be reassigned after their initial assignment.",
    correct: "C"
  }
];


export default function Quiz({ mcqs = _mcqs, setC }: { mcqs: MCQ[], setC: any }) {
  const [currmcq, setCurrmcq] = useState<number>(0);
  const [curroption, setCurroption] = useState<string | null>(null);
  const [correct, setCorrect] = useState<number>(0);
  const [msg, setmsg] = useState<string>("");
  const [submitted, setsubmitted] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(mcqs.length).fill(null));
  const [completed, setcompleted] = useState<boolean>(false);

  function handlesub() {
    if (!curroption) {
      setmsg("You must select an option to submit.");
      return;
    }
    const isCorrect = curroption === mcqs[currmcq].correct;
    if (isCorrect) {
      setCorrect(correct + 1);
    }
    setsubmitted(true);
    setIncorrect(!isCorrect);
    setmsg(isCorrect ? "Correct !" : "Incorrect !");
    if (currmcq >= mcqs.length - 1) {
      setcompleted(true);
      setC(true)
    }
    const newAnswers = [...answers];
    newAnswers[currmcq] = curroption;
    setAnswers(newAnswers);
  }

  function nextmcq() {
    if (!submitted) {
      setmsg("You must submit an option before proceeding.");
    } else if (submitted && currmcq < mcqs.length - 1) {
      setmsg("");
      setCurrmcq(currmcq + 1);
      setCurroption(answers[currmcq + 1]);
      setsubmitted(answers[currmcq + 1] !== null);
      setIncorrect(false);
    }
  }

  function prevmcq() {
    if (currmcq > 0) {
      setmsg("");
      setCurrmcq(currmcq - 1);
      setCurroption(answers[currmcq - 1]);
      setsubmitted(answers[currmcq - 1] !== null);
      setIncorrect(
        answers[currmcq - 1] !== null && answers[currmcq - 1] !== mcqs[currmcq - 1].correct
      );
    }
  }

  function getOptionClass(option: string) {
    let baseClass = "px-2 rounded flex items-center ";

    if (curroption === option && !submitted) {
      baseClass += "bg-black/30 ";
    }

    if (submitted && option === mcqs[currmcq].correct) {
      baseClass += "text-green-400 ";
    }

    baseClass += submitted ? "cursor-not-allowed" : "hover:bg-black/50 cursor-pointer";

    return baseClass;
  }

  function handleOptionClick(option: string) {
    if (!submitted) {
      setCurroption(option);
      setmsg("");
    }
  }

  return (
    <div className="flex flex-col p-5 text-white shadow-lg rounded overflow-hidden bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <p className="text-sm text-white/70 font-mono">
        question {currmcq + 1} of {mcqs.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currmcq}
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -150, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-lg my-2">Q. {mcqs[currmcq].question}</p>
          <p
            className={`text-center ${
              submitted && curroption === mcqs[currmcq].correct
                ? "text-green-400"
                : "text-red-700"
            }`}
          >
            {msg}
          </p>
          {["A", "B", "C", "D"].map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={getOptionClass(option)}
            >
              {curroption === option ? <IoRadioButtonOn /> : <IoIosRadioButtonOff />}
              <p className="p-2">
                {option}. {mcqs[currmcq][option as keyof Pick<MCQ, "A" | "B" | "C" | "D">]}
              </p>
            </div>
          ))}
          {incorrect && submitted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/30 w-fit p-5 rounded-2xl mt-4"
            >
              Explanation: {mcqs[currmcq].explanation}
            </motion.p>
          )}
          {completed && (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center text-lg mt-4"
            >
              You have completed the Quiz
            </motion.h1>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex w-fit gap-2 mx-auto mt-4">
        <button
          onClick={prevmcq}
          disabled={currmcq === 0}
          className={`px-2 mt-2 bg-white font-gradient-to-r text-purple-600 w-fit p-1.5 rounded mx-auto ${
            currmcq === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-200"
          }`}
        >
          <div className="flex items-center">
            <IoIosArrowBack className="size-4 mr-2" />
            Previous
          </div>
        </button>
        <button
          onClick={handlesub}
          disabled={submitted}
          className={`px-2 mt-2 bg-white font-gradient-to-r text-purple-600 w-fit p-1.5 rounded mx-auto ${
            submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-200"
          }`}
        >
          <div className="flex items-center">
            <FaRegCheckCircle className="size-4 mr-2" />
            Submit
          </div>
        </button>
        <button
          onClick={nextmcq}
          disabled={currmcq === mcqs.length - 1 && submitted}
          className={`px-2 mt-2 bg-white font-gradient-to-r text-purple-600 w-fit p-1.5 rounded mx-auto ${
            currmcq === mcqs.length - 1 && submitted ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-200"
          }`}
        >
          <div className="flex items-center">
            <MdNavigateNext className="size-6" />
            Next
          </div>
        </button>
      </div>
    </div>
  );
}
