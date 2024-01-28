"use client"
import React, { useState, useEffect } from 'react';

function Calculator() {
  // @ts-ignore
  const storedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || []; 
  const [history, setHistory] = useState(storedHistory);
  const [result, setResult] = useState('');
  const [expression, setExpression] = useState('');


  // useEffect(() => {
  //   // Load history from localStorage on component mount
  //   const storedHistory = localStorage.getItem('calculatorHistory');
  //   if (storedHistory) {
  //     setHistory(JSON.parse(storedHistory));
  //   }
  // }, []);

  useEffect(() => {
    // Update localStorage whenever history changes
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleKeyDown = (event:any) => {
    const { key } = event;
    if (key === 'Backspace') {
      setExpression((prevExp) => prevExp.slice(0, -1)); 
    } else if (key === 'Enter') {
      handleSubmit('=');
    } else if (key.match(/[0-9+\-*/.=]/)) {
      event.preventDefault();
      handleSubmit(key);
    }
  };

  // const handleSubmit = (value:any) => {
  //   if (value === '=') {
  //     try {
  //       const evalResult = eval(expression).toString();
  //       setHistory([...history, `${expression} = ${evalResult}`]);
  //       setResult(evalResult);
  //       setExpression(evalResult);
  //     } catch (error) {
  //       setResult('Error');
  //     }
  //   } else if (value === 'C') {
  //     setHistory([]);
  //     setExpression('');
  //     setResult('');
  //   } else if (value === 'DEL') {
  //     setExpression((prevExp) => prevExp.slice(0, -1)); // Remove the last character
  //   } else {
  //     setExpression((prevExp) => prevExp + value);
  //   }
  // };
  const handleSubmit = (value:any) => {
    const maxLength = 10; 
  
    if (
      (expression.length >= maxLength || result.length >= maxLength) &&
      value !== 'C' &&
      value !== 'DEL' &&
      value !== '='
    ) {
     
      return;
    }
  
    if (value === '=') {
      try {
        const evalResult = eval(expression).toString();
        setHistory([...history, `${expression} = ${evalResult}`]);
        setResult(evalResult.slice(0, maxLength)); // Limit result length to 10 digits
        // setExpression(evalResult.slice(0, maxLength)); 
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === 'DEL') {
      setExpression((prevExp) => prevExp.slice(0, -1)); // Remove the last character
    } else {
      setExpression((prevExp) => {
        if (prevExp.length < maxLength) {
          return prevExp + value;
        }
        return prevExp; // Do not add more digits if max length is reached
      });
    }
  };
  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression, history]);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', 'DEL' 
  ];

  return (
    <main className="flex min-h-screen dark:bg-dark bg-gray-200 justify-center items-center py-8">
      <div className="flex flex-col md:flex-row w-full md:w-auto md:max-w-4xl">
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4 md:w-3/5">
          <input
            type="text"
            className="w-full bg-gray-100 border-b-2 border-gray-400 focus:outline-none mt-2"
            value={expression}
            readOnly
          />
          <input
            type="text"
            className="w-full font-bold bg-gray-100 focus:outline-none mb-2"
            value={result}
            readOnly
          />
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleSubmit(btn)}
                className={`text-xl bg-gray-300 hover:bg-gray-400 p-2 rounded-lg ${btn === '=' && 'col-span-2'}`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg md:w-2/5">
          <h3 className="text-gray-300 mb-2 flex justify-between items-center">
            History
            <button
              onClick={clearHistory}
              className="text-sm bg-gray-600 hover:bg-gray-700 text-gray-100 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          </h3>
          <ul className="text-gray-200">
            {history.map((calculation:any, index:any) => (
              <li key={index}>{calculation}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Calculator;
