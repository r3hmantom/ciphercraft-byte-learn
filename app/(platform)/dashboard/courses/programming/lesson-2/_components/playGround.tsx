import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components required for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PlaygroundProps {
  title: string;
  description: string;
}

type FunctionType = 'square' | 'cube' | 'sqrt';

export default function Playground({ title, description }: PlaygroundProps) {
  const [input, setInput] = useState<number>(0);
  const [result, setResult] = useState<number>(0);
  const [funcType, setFuncType] = useState<FunctionType>('square');

  const calculate = (value: number, func: FunctionType) => {
    let computedResult: number;
    switch (func) {
      case 'square':
        computedResult = value * value;
        break;
      case 'cube':
        computedResult = value * value * value;
        break;
      case 'sqrt':
        computedResult = Math.sqrt(value);
        break;
      default:
        computedResult = 0;
    }
    setResult(computedResult);
  };

  const data = {
    labels: ['Input', 'Result'],
    datasets: [
      {
        label: 'Values',
        data: [input, result],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white  rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
      <p className="text-center mb-4">{description}</p>
      <div className="mb-4">
        <label className="block text-lg mb-2">Enter a number:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={input}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setInput(newValue);
            calculate(newValue, funcType);
          }}
          className="w-full"
        />
        <div className="text-center mt-2">
          <span className="text-xl font-semibold">{input}</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Select a function:</label>
        <select
          value={funcType}
          onChange={(e) => {
            const newFuncType = e.target.value as FunctionType;
            setFuncType(newFuncType);
            calculate(input, newFuncType);
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="square">Square</option>
          <option value="cube">Cube</option>
          <option value="sqrt">Square Root</option>
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Result:</h2>
        <p className="text-xl">{result}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Graph:</h2>
        <div className="h-64">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}
