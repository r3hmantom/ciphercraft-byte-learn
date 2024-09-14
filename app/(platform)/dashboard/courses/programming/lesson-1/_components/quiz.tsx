import { useState } from 'react';

const Quiz = () => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    if (answer === '15') setIsCorrect(true);
    else setIsCorrect(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Quiz Time</h2>
      <p>If x = 10 and y = x + 5, what is the value of y?</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 mt-2"
      />
      <button
        onClick={checkAnswer}
        className="bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Submit
      </button>
      {isCorrect && <p className="text-green-500 mt-4">Correct!</p>}
      {!isCorrect && answer && <p className="text-red-500 mt-4">Try again.</p>}
    </div>
  );
};

export default Quiz;
