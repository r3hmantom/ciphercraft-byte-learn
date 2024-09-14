import { useState } from 'react';

export default function Quiz({ title, questions }) {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (questionIndex, option) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score += 1;
      }
    });
    setScore(score);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{q.question}</p>
            {q.options.map((option, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  id={`q${index}o${idx}`}
                  name={`q${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleChange(index, option)}
                />
                <label htmlFor={`q${index}o${idx}`} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
        {score !== null && (
          <div className="mt-4">
            <p>Your score: {score}/{questions.length}</p>
          </div>
        )}
      </form>
    </div>
  );
}
